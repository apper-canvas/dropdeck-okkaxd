import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import mockFiles from '../mock/fileData';
import FileThumbnail from './FileThumbnail';
import FileViewOptions from './FileViewOptions';
import { formatSize, formatDate } from '../utils/fileUtils';
import getIcon from '../utils/iconUtils';

const FileExplorer = ({ recentFiles = [] }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [currentPath, setCurrentPath] = useState('/root');
  const [sortOption, setSortOption] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFiles, setCurrentFiles] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([{ id: 'root', name: 'My Files', path: '/root' }]);

  // Icons
  const FolderIcon = getIcon('Folder');
  const ChevronRightIcon = getIcon('ChevronRight');
  const HomeIcon = getIcon('Home');
  const MoreVerticalIcon = getIcon('MoreVertical');
  const StarIcon = getIcon('Star');
  const DownloadIcon = getIcon('Download');
  const ShareIcon = getIcon('Share2');
  const TrashIcon = getIcon('Trash2');

  // Combine mock files with recent uploads
  useEffect(() => {
    const allFiles = [...mockFiles];
    
    // Add recent uploads to root if they don't exist
    recentFiles.forEach(recentFile => {
      const exists = allFiles.some(file => file.id === recentFile.id);
      if (!exists) {
        allFiles.push({
          ...recentFile,
          parent: 'root',
          path: `/root/${recentFile.name}`
        });
        
        // Add to root children
        const rootFolder = allFiles.find(file => file.id === 'root');
        if (rootFolder) {
          rootFolder.children = [...rootFolder.children, recentFile.id];
        }
      }
    });
    
    updateCurrentFiles(allFiles);
  }, [recentFiles, currentPath, sortOption, searchQuery]);

  const updateCurrentFiles = (allFiles) => {
    // Find current folder
    const currentPathId = currentPath.split('/').pop();
    const currentFolder = allFiles.find(file => file.id === currentPathId);
    
    if (currentFolder && currentFolder.children) {
      // Get children files/folders
      let files = currentFolder.children.map(childId => 
        allFiles.find(file => file.id === childId)
      ).filter(Boolean);
      
      // Apply search if needed
      if (searchQuery) {
        files = files.filter(file => 
          file.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Sort files
      files.sort((a, b) => {
        // Folders always come first
        if (a.type === 'folder' && b.type !== 'folder') return -1;
        if (a.type !== 'folder' && b.type === 'folder') return 1;
        
        // Then sort by selected option
        switch(sortOption) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'date':
            return new Date(b.uploadedAt || 0) - new Date(a.uploadedAt || 0);
          case 'size':
            return (b.size || 0) - (a.size || 0);
          case 'type':
            return (a.type || '').localeCompare(b.type || '');
          default:
            return 0;
        }
      });
      
      setCurrentFiles(files);
    }
  };

  const navigateToFolder = (folder) => {
    if (folder.type !== 'folder') return;
    
    setCurrentPath(folder.path);
    
    // Update breadcrumbs
    const parts = folder.path.split('/').filter(Boolean);
    const newBreadcrumbs = [{ id: 'root', name: 'My Files', path: '/root' }];
    
    if (parts.length > 1) {
      let currentPath = '/root';
      for (let i = 1; i < parts.length; i++) {
        const currentId = parts[i];
        const currentFolder = mockFiles.find(file => file.id === currentId);
        if (currentFolder) {
          currentPath += `/${currentId}`;
          newBreadcrumbs.push({
            id: currentId,
            name: currentFolder.name,
            path: currentPath
          });
        }
      }
    }
    
    setBreadcrumbs(newBreadcrumbs);
  };

  const handleFileAction = (file, action) => {
    switch(action) {
      case 'download':
        toast.info(`Downloading ${file.name}...`);
        break;
      case 'share':
        toast.info(`Share dialog for ${file.name}`);
        break;
      case 'delete':
        toast.success(`${file.name} moved to trash`);
        break;
      default:
        break;
    }
  };

  // Renders
  const renderBreadcrumbs = () => (
    <div className="flex items-center flex-wrap gap-1 mb-4 text-sm">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.id}>
          {index === 0 ? (
            <button 
              onClick={() => navigateToFolder({ type: 'folder', path: crumb.path })}
              className="flex items-center text-surface-600 dark:text-surface-300 hover:text-primary"
            >
              <HomeIcon className="w-4 h-4 mr-1" />
              <span>{crumb.name}</span>
            </button>
          ) : (
            <>
              <ChevronRightIcon className="w-4 h-4 text-surface-400" />
              <button 
                onClick={() => navigateToFolder({ type: 'folder', path: crumb.path })}
                className="text-surface-600 dark:text-surface-300 hover:text-primary"
              >
                {crumb.name}
              </button>
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="card p-6">
      {renderBreadcrumbs()}
      
      <FileViewOptions 
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortOption={sortOption}
        setSortOption={setSortOption}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {currentFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-surface-100 dark:bg-surface-700 rounded-full p-4 mb-4">
            <FolderIcon className="w-10 h-10 text-surface-400" />
          </div>
          <h3 className="text-xl font-medium text-surface-700 dark:text-surface-300 mb-2">
            {searchQuery ? "No files match your search" : "This folder is empty"}
          </h3>
          <p className="text-surface-500 max-w-md">
            {searchQuery ? "Try a different search term" : "Upload files or create folders to get started"}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {currentFiles.map(file => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="relative group"
            >
              <div 
                onClick={() => file.type === 'folder' ? navigateToFolder(file) : null}
                className={`p-3 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 
                  hover:border-primary hover:shadow-md transition-all flex flex-col items-center
                  ${file.type === 'folder' ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="mb-2">
                  <FileThumbnail file={file} size="lg" />
                </div>
                <div className="w-full text-center">
                  <h4 className="font-medium text-surface-800 dark:text-surface-100 truncate text-sm">
                    {file.name}
                  </h4>
                  {file.type !== 'folder' && (
                    <p className="text-xs text-surface-500 mt-1">
                      {formatSize(file.size)}
                    </p>
                  )}
                </div>
                
                <div className="absolute top-2 right-2 hidden group-hover:flex gap-1">
                  {file.type !== 'folder' && (
                    <>
                      <button 
                        onClick={() => handleFileAction(file, 'download')}
                        className="p-1 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
                      >
                        <DownloadIcon className="w-4 h-4 text-surface-600 dark:text-surface-300" />
                      </button>
                      <button 
                        onClick={() => handleFileAction(file, 'share')}
                        className="p-1 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
                      >
                        <ShareIcon className="w-4 h-4 text-surface-600 dark:text-surface-300" />
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => handleFileAction(file, 'delete')}
                    className="p-1 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
                  >
                    <TrashIcon className="w-4 h-4 text-surface-600 dark:text-surface-300" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-50 dark:bg-surface-700 border-b border-surface-200 dark:border-surface-600 text-left">
              <tr>
                <th className="py-3 px-4 font-medium text-surface-600 dark:text-surface-300">Name</th>
                <th className="py-3 px-4 font-medium text-surface-600 dark:text-surface-300 hidden md:table-cell">Type</th>
                <th className="py-3 px-4 font-medium text-surface-600 dark:text-surface-300 hidden md:table-cell">Size</th>
                <th className="py-3 px-4 font-medium text-surface-600 dark:text-surface-300 hidden sm:table-cell">Modified</th>
                <th className="py-3 px-4 font-medium text-surface-600 dark:text-surface-300 w-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentFiles.map(file => (
                <tr 
                  key={file.id}
                  className="border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800"
                >
                  <td 
                    className="py-3 px-4"
                    onClick={() => file.type === 'folder' ? navigateToFolder(file) : null}
                  >
                    <div className="flex items-center gap-3">
                      <FileThumbnail file={file} size="sm" />
                      <span className={`truncate ${file.type === 'folder' ? 'cursor-pointer hover:text-primary' : ''}`}>
                        {file.name}
                      </span>
                      {file.starred && <StarIcon className="w-4 h-4 text-yellow-500" />}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-surface-600 dark:text-surface-400 hidden md:table-cell">
                    {file.type === 'folder' ? 'Folder' : file.type.split('/')[1]}
                  </td>
                  <td className="py-3 px-4 text-surface-600 dark:text-surface-400 hidden md:table-cell">
                    {file.type === 'folder' ? '—' : formatSize(file.size)}
                  </td>
                  <td className="py-3 px-4 text-surface-600 dark:text-surface-400 hidden sm:table-cell">
                    {file.uploadedAt ? formatDate(file.uploadedAt) : '—'}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-1">
                      {file.type !== 'folder' && (
                        <>
                          <button 
                            onClick={() => handleFileAction(file, 'download')}
                            className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
                          >
                            <DownloadIcon className="w-4 h-4 text-surface-600 dark:text-surface-400" />
                          </button>
                          <button 
                            onClick={() => handleFileAction(file, 'share')}
                            className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
                          >
                            <ShareIcon className="w-4 h-4 text-surface-600 dark:text-surface-400" />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => handleFileAction(file, 'delete')}
                        className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
                      >
                        <TrashIcon className="w-4 h-4 text-surface-600 dark:text-surface-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;