import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } 
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    transition: { duration: 0.3 } 
  },
};

const PageWrapper = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`page-wrapper ${className}`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
