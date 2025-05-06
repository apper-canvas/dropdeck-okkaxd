import React from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const StorageIndicator = ({ usedStorage, totalStorage, isExpanded }) => {
  const DatabaseIcon = getIcon('Database');
  
  // Calculate percentage used
  const percentage = Math.min(Math.round((usedStorage / totalStorage) * 100), 100);
  
  // Determine color based on usage
  let colorClass = 'bg-green-500';
  if (percentage > 90) {
    colorClass = 'bg-red-500';
  } else if (percentage > 70) {
    colorClass = 'bg-yellow-500';
  }
  
  if (!isExpanded) {
    // Compact view - just show the icon with a colored ring
    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full border-4 border-surface-200 dark:border-surface-600"></div>
          <svg className="w-10 h-10" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={percentage > 90 ? '#ef4444' : percentage > 70 ? '#eab308' : '#22c55e'}
              strokeWidth="4"
              strokeDasharray={`${percentage}, 100`}
              strokeLinecap="round"
              transform="rotate(-90, 18, 18)"
            />
          </svg>
          <DatabaseIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-surface-600 dark:text-surface-300" />
        </div>
      </div>
    );
  }
  
  // Expanded view with details
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between text-sm text-surface-600 dark:text-surface-300">
        <div className="flex items-center gap-2">
          <DatabaseIcon className="w-4 h-4" />
          <span>Storage</span>
        </div>
        <span className="text-xs font-medium">{`${usedStorage} GB of ${totalStorage} GB used`}</span>
      </div>
      <div className="h-2 w-full bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
        <div className={`h-full ${colorClass} rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </motion.div>
  );
};

export default StorageIndicator;