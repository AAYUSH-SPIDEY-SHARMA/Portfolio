const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

async function uploadOriginal() {
  try {
    const input = path.join(__dirname, '../public', 'card9.png');
    console.log(`Uploading original card9.png (large)...`);
    
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_large(input, {
        folder: 'portfolio_assets',
        resource_type: 'raw',
        use_filename: true,
        unique_filename: false,
        overwrite: true
      }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
    
    console.log(`✅ Uploaded card9.png -> `, result);
  } catch (error) {
    console.error("❌ Failed to upload original card9.png:", error.message || error);
  }
}

uploadOriginal();
