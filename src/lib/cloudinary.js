/**
 * Cloudinary Configuration Placeholder
 * 
 * Replace with your Cloudinary cloud name.
 * Used for optimized image loading across:
 * - Gallery (BeyondCode memories)
 * - Hackathon screenshots
 * - Blog post images
 * - Project screenshots
 */

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your-cloud-name';

/**
 * Generate an optimized Cloudinary URL for an image
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @param {object} options - Transformation options
 * @returns {string} Optimized image URL
 */
export const getCloudinaryUrl = (publicId, options = {}) => {
  const {
    width = 'auto',
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
  } = options;

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_${format},q_${quality},w_${width},c_${crop}/${publicId}`;
};

/**
 * Folder structure in Cloudinary:
 * portfolio/
 * ├── gallery/       → Pinterest memories
 * ├── hackathons/    → Screenshots, certificates
 * ├── blog/          → Blog post images
 * ├── sports/        → Basketball, Kabaddi photos
 * ├── gaming/        → Valorant, BGMI screenshots
 * ├── journey/       → Timeline milestone photos
 * ├── projects/      → Project screenshots
 * └── stickers/      → Custom anime stickers
 */

export default CLOUDINARY_CLOUD_NAME;
