const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const srcAssetsDir = path.resolve(__dirname, '../src/assets');
const uploadedUrls = {};

async function uploadImages(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await uploadImages(fullPath);
    } else if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      try {
        console.log(`Uploading ${file}...`);
        
        let result;
        // Check size
        const stats = fs.statSync(fullPath);
        if (stats.size > 10 * 1024 * 1024) { // over 10MB
           const sharp = require('sharp');
           const tempOutput = fullPath.replace(/\.[^/.]+$/, "_lossless.webp");
           console.log(`Converting ${file} to lossless WebP because it's too large...`);
           await sharp(fullPath).webp({ lossless: true }).toFile(tempOutput);
           result = await cloudinary.uploader.upload(tempOutput, {
             folder: 'portfolio_assets/src_assets',
             use_filename: true,
             unique_filename: false,
             overwrite: true
           });
           uploadedUrls[file] = result.secure_url;
           fs.unlinkSync(tempOutput);
        } else {
           result = await cloudinary.uploader.upload(fullPath, {
             folder: 'portfolio_assets/src_assets',
             use_filename: true,
             unique_filename: false,
             overwrite: true
           });
        }
        
        console.log(`✅ Uploaded ${file} -> ${result.secure_url}`);
        uploadedUrls[file] = result.secure_url;
      } catch (uploadError) {
        console.error(`❌ Failed to upload ${file}:`, uploadError.message || uploadError);
      }
    }
  }
}

(async () => {
  await uploadImages(srcAssetsDir);
  console.log('\n--- SRC ASSETS UPLOAD COMPLETE ---');
  console.log(JSON.stringify(uploadedUrls, null, 2));
})();
