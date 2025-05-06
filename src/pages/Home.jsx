import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import FileExplorer from '../components/FileExplorer';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

const Home = () => {
  const [activeTab, setActiveTab] = useState('explorer'); // Changed default to explorer

  const UploadCloudIcon = getIcon('UploadCloud');
  const FolderIcon = getIcon('Folder');
  const ShareIcon = getIcon('Share2');
  const FileIcon = getIcon('File');
  const Clock = getIcon('Clock');

  const handleFileUploaded = (file) => {
    // Add the new file to recent files
    const newFile = {
      id: Date.now(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date()
    };
    
    setRecentFiles(prev => [newFile, ...prev.slice(0, 4)]);
    toast.success(`${file.name} uploaded successfully!`);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 md:py-12 lg:py-16"
    >
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-primary rounded-2xl p-3 mb-4"
        >
          <UploadCloudIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </motion.div>
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"
        >
          DropKind
        </motion.h1>
        <motion.p 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 text-lg md:text-xl text-surface-600 dark:text-surface-300 max-w-2xl"
        >
          Upload, organize, and share your files with ease
        </motion.p>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all ${
              activeTab === 'upload'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700'
            }`}
          >
            <UploadCloudIcon className="w-5 h-5" />
            <span className="font-medium">Upload</span>
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all ${
              activeTab === 'files'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700'
            }`}
          >
            <FolderIcon className="w-5 h-5" />
            <span className="font-medium">Recent Files</span>
          </button>
          <button
            onClick={() => setActiveTab('share')}
            className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all ${
              activeTab === 'share'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700'
            }`}
          >
            <ShareIcon className="w-5 h-5" />
            <span className="font-medium">Share</span>
          </button>
        </div>

        {activeTab === 'upload' && (
          <MainFeature onFileUploaded={handleFileUploaded} />
        )}

        {activeTab === 'files' && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Recent Files
            </h2>
            
            {recentFiles.length > 0 ? (
              <div className="space-y-3">
                {recentFiles.map(file => (
                  <div 
                    key={file.id} 
                    className="flex items-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors"
                  >
                    <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg mr-3">
                      <FileIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-surface-800 dark:text-surface-100 truncate">{file.name}</p>
                      <p className="text-sm text-surface-500">{formatSize(file.size)} • {formatDate(file.uploadedAt)}</p>
                    </div>
                    <button className="ml-2 p-2 text-surface-500 hover:text-primary rounded-full hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors">
                      <ShareIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-surface-100 dark:bg-surface-700 rounded-full p-4 mb-4">
                  <FolderIcon className="w-10 h-10 text-surface-400" />
                </div>
                <h3 className="text-xl font-medium text-surface-700 dark:text-surface-300 mb-2">No files yet</h3>
                <p className="text-surface-500 max-w-md">Upload files to see them appear here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'share' && (
          <div className="card p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-surface-100 dark:bg-surface-700 rounded-full p-4 mb-4">
                <ShareIcon className="w-10 h-10 text-surface-400" />
              </div>
              <h3 className="text-xl font-medium text-surface-700 dark:text-surface-300 mb-2">Share your files</h3>
              <p className="text-surface-500 max-w-md mb-6">Upload and select files to generate shareable links</p>
              <button 
                onClick={() => setActiveTab('upload')}
                className="btn btn-primary flex items-center gap-2"
              >
                <UploadCloudIcon className="w-5 h-5" />
                <span>Upload Files</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-auto py-6 text-center text-surface-500">
        <p>© {new Date().getFullYear()} DropKind. All rights reserved.</p>
      </footer>
    </motion.div>
  );
};

export default Home;