const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Ensure the variables exist
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("Missing Cloudinary environment variables. Please check your .env file.");
  process.exit(1);
}

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const publicDir = path.resolve(__dirname, '../public');

async function uploadImages() {
  try {
    const files = fs.readdirSync(publicDir);
    const imageFiles = files.filter(f => f.match(/\.(jpg|jpeg|png|gif|webp)$/i));

    console.log(`Found ${imageFiles.length} images to upload...`);

    const uploadedUrls = {};

    for (const file of imageFiles) {
      try {
        console.log(`Uploading ${file}...`);
        const filePath = path.join(publicDir, file);
        
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'portfolio_assets', // Optional: groups them in a folder in Cloudinary
          use_filename: true,
          unique_filename: false,
          overwrite: true
        });
        
        console.log(`✅ Uploaded ${file} -> ${result.secure_url}`);
        uploadedUrls[file] = result.secure_url;
      } catch (uploadError) {
        console.error(`❌ Failed to upload ${file}:`, uploadError.message || uploadError);
      }
    }

    console.log('\n--- UPLOAD COMPLETE ---');
    console.log('Here are your Cloudinary URLs. You can copy/paste these into your data files:\n');
    console.log(JSON.stringify(uploadedUrls, null, 2));

  } catch (error) {
    console.error("Error uploading images:", error);
  }
}

uploadImages();
