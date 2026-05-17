import { motion } from 'framer-motion';

/**
 * ImageCard — Single gallery image with hover effects.
 * Blueprint: "Each image has soft shadow + rounded corners. Hover: slight scale + brightness increase"
 */
const ImageCard = ({ src, alt, caption, onClick, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid mb-4"
      style={{ boxShadow: 'var(--shadow-md)' }}
    >
      <img
        src={src}
        alt={alt || caption || ''}
        loading="lazy"
        className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
      />
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-xs text-white font-medium">{caption}</p>
        </div>
      )}
    </motion.div>
  );
};

export default ImageCard;
