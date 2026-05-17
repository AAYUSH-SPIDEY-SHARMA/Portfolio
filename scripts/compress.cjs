const sharp = require('sharp');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

async function compressAndUpload(filename) {
  const input = path.join(__dirname, '../public', filename);
  const output = path.join(__dirname, '../public', `compressed_${filename}`);
  
  console.log(`Compressing ${filename}...`);
  await sharp(input)
    .resize(2000) // resize width to 2000px, auto height
    .jpeg({ quality: 80 }) // convert to jpeg to save space
    .toFile(output);
  
  console.log(`Uploading compressed_${filename}...`);
  const result = await cloudinary.uploader.upload(output, {
    folder: 'portfolio_assets',
    public_id: filename.replace(/\.[^/.]+$/, "") // Keep original name without extension
  });
  
  console.log(`✅ Uploaded ${filename} -> ${result.secure_url}`);
}

(async () => {
  try {
    await compressAndUpload('card5.png');
    await compressAndUpload('card9.png');
    await compressAndUpload('fantasy-style-galaxy-background.jpg');
  } catch(e) {
    console.error(e);
  }
})();
