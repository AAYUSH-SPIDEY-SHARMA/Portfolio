import { motion } from 'framer-motion';

/**
 * Consistent section title component
 * Props: title, subtitle, accent (emoji/icon), align ('center'|'left')
 */
const SectionHeader = ({ title, subtitle, accent, align = 'center' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {accent && (
        <span className="text-3xl mb-3 block">{accent}</span>
      )}
      <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">
        <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {subtitle && (
        <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
