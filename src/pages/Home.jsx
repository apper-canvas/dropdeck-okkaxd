import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import FileExplorer from '../components/FileExplorer';
import mockFiles from '../mock/fileData';
const Home = ({ view = 'my-files' }) => {
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [viewTitle, setViewTitle] = useState('My Files');
  
  // Icons
  const FolderIcon = getIcon('Folder');
  const UsersIcon = getIcon('Users');
  const ClockIcon = getIcon('Clock');
  const StarIcon = getIcon('Star');
  const TrashIcon = getIcon('Trash2');
  
  useEffect(() => {
    // Filter files based on view
    let title = '';
    let filtered = [];
    
    switch(view) {
      case 'shared':
        title = 'Shared with me';
        // In a real app, you'd fetch shared files from API
        filtered = mockFiles.filter(file => file.id.includes('5') || file.id.includes('7'));
        break;
      case 'recent':
        title = 'Recent files';
        // Sort by date and take the first 10
        filtered = [...mockFiles]
          .filter(file => file.uploadedAt)
          .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
          .slice(0, 10);
        break;
      case 'starred':
        title = 'Starred';
        filtered = mockFiles.filter(file => file.starred);
        break;
      case 'trash':
        title = 'Trash';
        // In a real app, you'd fetch deleted files
        filtered = [];
        break;
      default: // my-files
        title = 'My Files';
        filtered = mockFiles.filter(file => file.id === 'root')[0]?.children.map(id => 
          mockFiles.find(file => file.id === id)
        ) || [];
    }
    
    setViewTitle(title);
    setFilteredFiles(filtered);
  }, [view]);

  return (
    <div className="p-6 md:p-10">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          {view === 'my-files' && <FolderIcon className="w-6 h-6 text-primary" />}
          {view === 'shared' && <UsersIcon className="w-6 h-6 text-blue-500" />}
          {view === 'recent' && <ClockIcon className="w-6 h-6 text-green-500" />}
          {view === 'starred' && <StarIcon className="w-6 h-6 text-yellow-500" />}
          {view === 'trash' && <TrashIcon className="w-6 h-6 text-red-500" />}
          <h1 className="text-2xl font-bold">{viewTitle}</h1>
        </div>
        <p className="text-surface-500 dark:text-surface-400">
          {view === 'trash' ? 'Files in trash will be automatically deleted after 30 days' : 'Manage your files and folders'}
        </p>
      </div>
      
      <FileExplorer recentFiles={filteredFiles} />
      
    </div>
  );
};
export default Home;