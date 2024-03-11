import { motion } from 'framer-motion';
import Backdrop from './Backdrop';
const Modal = ({ isOpen, onClose, children }) => {
  const dropIn = {
    hidden: { y: '-100vh', opacity: 0 },
    visible: {
      y: '0',
      opacity: 1,
      transition: { duration: '0.1', type: 'spring', damp: 30, stiffness: 80 },
    },
    exit: { y: '100vh', opacity: 0 },
  };
  if (!isOpen) return null;
  return (
    <Backdrop onClose={onClose}>
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="modal py-2 mt-3 rounded-md bg-gray-900 text-white"
        onClick={(e) => e.stopPropagation()}>
        {' '}
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
