import { motion } from 'framer-motion';
const Backdrop = ({ children, onClose }) => {
  const handleClick = (e) => {
    e.stopPropagation(); // Stop event propagation
    onClose();
  };
  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 h-full w-full bg-[#000000e1] flex justify-center items-center z-10 backdrop-blur-sm">
      {children}
    </motion.div>
  );
};

export default Backdrop;
