import { motion } from 'motion/react';
import type { FC, ReactNode } from 'react';

const Modal: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-20 flex max-lg:items-end lg:justify-center lg:items-center"
      initial={{ backgroundColor: '#00000080' }}
      exit={{ backgroundColor: '#00000000' }}
      transition={{ duration: 0.4, ease: 'linear' }}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-neutral-rose-50 max-lg:w-full w-lg rounded-xl max-lg:rounded-b-none p-6 max-h-[85vh] overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-900"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
