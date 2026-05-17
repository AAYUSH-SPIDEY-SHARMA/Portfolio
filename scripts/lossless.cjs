const sharp = require('sharp');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

async function losslessUpload(filename) {
  const input = path.join(__dirname, '../public', filename);
  const outputName = filename.replace(/\.[^/.]+$/, "_lossless.webp");
  const output = path.join(__dirname, '../public', outputName);
  
  console.log(`Converting ${filename} to LOSSLESS WebP...`);
  await sharp(input)
    .webp({ lossless: true })
    .toFile(output);
    
  console.log(`Uploading original-quality ${outputName}...`);
  const result = await cloudinary.uploader.upload(output, {
    folder: 'portfolio_assets',
    public_id: outputName.replace(/\.[^/.]+$/, ""),
    overwrite: true
  });
  
  console.log(`✅ Uploaded ${filename} (Original Quality) -> ${result.secure_url}`);
}

(async () => {
  try {
    await losslessUpload('card9.png');
    await losslessUpload('card5.png');
    await losslessUpload('fantasy-style-galaxy-background.jpg');
  } catch(e) {
    console.error(e);
  }
})();
