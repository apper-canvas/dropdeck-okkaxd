import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';
import StorageIndicator from './StorageIndicator';

const SideMenu = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  // Icons
  const FolderIcon = getIcon('Folder');
  const UsersIcon = getIcon('Users');
  const ClockIcon = getIcon('Clock');
  const StarIcon = getIcon('Star');
  const TrashIcon = getIcon('Trash2');
  const PlusIcon = getIcon('Plus');
  const ChevronsLeftIcon = getIcon('ChevronsLeft');
  const ChevronsRightIcon = getIcon('ChevronsRight');
  const CloudIcon = getIcon('Cloud');

  // Menu items
  const menuItems = [
    { name: 'My Files', path: '/', icon: FolderIcon },
    { name: 'Shared', path: '/shared', icon: UsersIcon },
    { name: 'Recent', path: '/recent', icon: ClockIcon },
    { name: 'Starred', path: '/starred', icon: StarIcon },
    { name: 'Trash', path: '/trash', icon: TrashIcon },
  ];

  // Animation variants for the sidebar
  const sidebarVariants = {
    open: { width: '260px', transition: { duration: 0.3 } },
    closed: { width: '72px', transition: { duration: 0.3 } }
  };

  // Button style for create new button
  const createNewButtonStyle = isOpen 
    ? "flex items-center justify-center gap-2 w-full px-4 py-3 mt-4 mb-6 rounded-full bg-primary hover:bg-primary-dark text-white transition-colors" 
    : "flex items-center justify-center w-10 h-10 mx-auto mt-4 mb-6 rounded-full bg-primary hover:bg-primary-dark text-white transition-colors";

  return (
    <>
      <motion.div 
        className="h-screen sticky top-0 bg-white dark:bg-surface-800 shadow-md z-20 flex flex-col"
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        initial={isOpen ? 'open' : 'closed'}
      >
        {/* Header */}
        <div className="flex items-center h-16 px-4">
          <div className="flex items-center flex-1 overflow-hidden">
            <CloudIcon className="h-8 w-8 text-primary mr-3 flex-shrink-0" />
            {isOpen && (
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-xl font-bold text-primary truncate"
              >
                DropKind
              </motion.h1>
            )}
          </div>
          <button 
            onClick={toggleSidebar}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? <ChevronsLeftIcon className="h-5 w-5" /> : <ChevronsRightIcon className="h-5 w-5" />}
          </button>
        </div>
        
        {/* Create new button */}
        <button className={createNewButtonStyle}>
          <PlusIcon className="h-5 w-5" />
          {isOpen && <span>Create New</span>}
        </button>
        
        {/* Navigation */}
        <nav className="flex-1 px-2 overflow-y-auto scrollbar-hide">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = 
                item.path === '/' 
                  ? location.pathname === '/' 
                  : location.pathname.startsWith(item.path);
                  
              const Icon = item.icon;
              
              return (
                <li key={item.path}>
                  <NavLink 
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300'
                      }
                    `}
                  >
                    <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
                    
                    {isOpen && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="truncate"
                      >
                        {item.name}
                      </motion.span>
                    )}
                    
                    {isOpen && item.name === 'Recent' && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="ml-auto bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-300 text-xs px-2 py-0.5 rounded-full"
                      >
                        12
                      </motion.span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Storage indicator */}
        <div className="p-4 mt-auto">
          {isOpen ? (
            <StorageIndicator usedStorage={15.4} totalStorage={30} isExpanded={true} />
          ) : (
            <StorageIndicator usedStorage={15.4} totalStorage={30} isExpanded={false} />
          )}
        </div>
      </motion.div>
    </>
  );
};

export default SideMenu;