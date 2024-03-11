import { motion } from 'framer-motion';
export const Transition = ({ children }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: '100%' }}
        exit={{
          opacity: 1,
          x: window.innerWidth,
          transition: { duration: 0.1 },
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}>
        {children}
      </motion.div>
    </>
  );
};
