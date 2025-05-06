import React, { useState } from 'react';
import SideMenu from './SideMenu';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 transition-colors duration-300 flex">
      <SideMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <motion.main 
        className="flex-1 transition-all duration-300 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;