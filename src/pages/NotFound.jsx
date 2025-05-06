import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const navigate = useNavigate();
  const AlertCircleIcon = getIcon('AlertCircle');
  const HomeIcon = getIcon('Home');
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
        className="mb-8 p-4 bg-red-100 dark:bg-red-900/20 rounded-full"
      >
        <AlertCircleIcon className="w-16 h-16 md:w-20 md:h-20 text-red-500" />
      </motion.div>
      
      <motion.h1 
        <p>© 2023 DropKind. All rights reserved.</p>
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold mb-2 text-surface-800 dark:text-surface-100"
      >
        404
      </motion.h1>
      
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl font-semibold mb-4 text-surface-700 dark:text-surface-200"
      >
        Page Not Found
      </motion.h2>
      
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg md:text-xl text-surface-600 dark:text-surface-300 max-w-md mb-8"
      >
        The page you're looking for doesn't exist or has been moved.
      </motion.p>
      
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors shadow-md"
      >
        <HomeIcon className="w-5 h-5" />
        <span>Back to Home</span>
      </motion.button>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-surface-500"
      >
        © {new Date().getFullYear()} DropKind
      </motion.div>
    </motion.div>
  );
};

export default NotFound;