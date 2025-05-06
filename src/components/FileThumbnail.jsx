import React from 'react';
import { getFileIcon, getFileColor } from '../utils/fileUtils';
import getIcon from '../utils/iconUtils';

const FileThumbnail = ({ file, size = 'md' }) => {
  const FolderIcon = getIcon('Folder');
  const StarIcon = getIcon('Star');
  
  // Size classes
  const sizeClasses = {
    'sm': 'w-8 h-8 p-1.5',
    'md': 'w-12 h-12 p-2.5',
    'lg': 'w-16 h-16 p-3',
    'xl': 'w-24 h-24 p-4'
  };
  
  if (file.type === 'folder') {
    return (
      <div className={`relative rounded-lg bg-yellow-50 dark:bg-yellow-900 flex items-center justify-center ${sizeClasses[size]}`}>
        <FolderIcon className="text-yellow-600 dark:text-yellow-300 w-full h-full" />
        {file.starred && <StarIcon className="absolute -top-1 -right-1 w-4 h-4 text-yellow-500" />}
      </div>
    );
  }
  
  const FileTypeIcon = getFileIcon(file.type);
  const colorClass = getFileColor(file.type);
  return (
    <div className={`relative rounded-lg ${colorClass} flex items-center justify-center ${sizeClasses[size]}`}>
      <FileTypeIcon className="w-full h-full" />
      {file.starred && <StarIcon className="absolute -top-1 -right-1 w-4 h-4 text-yellow-500" />}
    </div>
  );
};

export default FileThumbnail;