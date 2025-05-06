import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = ({ onFileUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadHistory, setUploadHistory] = useState([]);
  const fileInputRef = useRef(null);

  // Icon components
  const UploadCloudIcon = getIcon('UploadCloud');
  const FileIcon = getIcon('File');
  const XIcon = getIcon('X');
  const TrashIcon = getIcon('Trash');
  const HistoryIcon = getIcon('History');
  const CheckCircleIcon = getIcon('CheckCircle');
  const AlertCircleIcon = getIcon('AlertCircle');
  const ChevronRightIcon = getIcon('ChevronRight');

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, []);

  const handleFileSelection = (file) => {
    setSelectedFile(file);
    setUploadProgress(0);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const simulateUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            
            // Add to upload history
            const newHistoryItem = {
              id: Date.now(),
              name: selectedFile.name,
              size: selectedFile.size,
              type: selectedFile.type,
              status: Math.random() > 0.1 ? 'success' : 'error',
              timestamp: new Date()
            };
            
            setUploadHistory(prev => [newHistoryItem, ...prev.slice(0, 4)]);
            
            if (newHistoryItem.status === 'success') {
              toast.success(`${selectedFile.name} uploaded successfully!`);
              if (onFileUploaded) onFileUploaded(selectedFile);
            } else {
              toast.error(`Failed to upload ${selectedFile.name}`);
            }
            
            clearSelectedFile();
          }, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 150);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const clearHistory = () => {
    setUploadHistory([]);
    toast.info("Upload history cleared");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-2/3">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="card overflow-hidden"
        >
          <div 
            className={`relative p-8 transition-all ${isDragging ? 'bg-primary/10 dark:bg-primary/20' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!selectedFile ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 2 
                  }}
                  className="w-20 h-20 mb-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center"
                >
                  <UploadCloudIcon className="w-10 h-10 text-primary" />
                </motion.div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-2">Drop your file here</h3>
                <p className="text-surface-500 dark:text-surface-400 mb-6 max-w-md">
                  Drag and drop your file here, or click the button below to select from your computer
                </p>
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <FileIcon className="w-5 h-5" />
                  <span>Choose File</span>
                </button>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                
                <p className="mt-4 text-sm text-surface-400">
                  Maximum file size: 100MB
                </p>
              </div>
            ) : (
              <div className="py-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="p-3 rounded-lg bg-primary/10 dark:bg-primary/20 mr-4">
                      <FileIcon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{selectedFile.name}</h3>
                      <p className="text-sm text-surface-500">{formatSize(selectedFile.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={clearSelectedFile}
                    className="p-2 text-surface-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full self-end md:self-center transition-colors"
                    disabled={isUploading}
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      {isUploading ? 'Uploading...' : 'Ready to upload'}
                    </span>
                    <span className="text-sm font-medium">
                      {Math.round(uploadProgress)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: `${uploadProgress}%` }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={simulateUpload}
                    disabled={isUploading}
                    className={`btn ${isUploading ? 'bg-surface-300 dark:bg-surface-700 cursor-not-allowed' : 'btn-primary'}`}
                  >
                    {isUploading ? 'Uploading...' : 'Upload File'}
                  </button>
                </div>
              </div>
            )}
            
            {isDragging && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 border-2 border-dashed border-primary bg-primary/5 dark:bg-primary/10 rounded-2xl flex items-center justify-center"
              >
                <div className="text-center">
                  <UploadCloudIcon className="mx-auto w-16 h-16 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-primary">Release to Upload</h3>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
      
      <div className="w-full lg:w-1/3">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <HistoryIcon className="w-5 h-5 text-primary" />
              <span>Upload History</span>
            </h3>
            {uploadHistory.length > 0 && (
              <button
                onClick={clearHistory}
                className="p-2 text-surface-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <AnimatePresence>
            {uploadHistory.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {uploadHistory.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg"
                  >
                    <div className={`p-2 rounded-full mr-3 ${
                      item.status === 'success' 
                        ? 'bg-green-100 dark:bg-green-900/20' 
                        : 'bg-red-100 dark:bg-red-900/20'
                    }`}>
                      {item.status === 'success' ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircleIcon className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-xs text-surface-500">
                        {formatSize(item.size)} • {formatTimestamp(item.timestamp)}
                      </p>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-surface-400" />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-8 text-center"
              >
                <p className="text-surface-500">No upload history</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card p-6 mt-6"
        >
          <h3 className="text-lg font-semibold mb-3">Upload Tips</h3>
          <ul className="space-y-2 text-surface-600 dark:text-surface-300">
            <li className="flex items-start gap-2">
              <span className="inline-block p-1 bg-primary/10 dark:bg-primary/20 rounded-full mt-0.5">
                <CheckCircleIcon className="w-3 h-3 text-primary" />
              </span>
              <span className="text-sm">Drag and drop files directly into the upload area</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block p-1 bg-primary/10 dark:bg-primary/20 rounded-full mt-0.5">
                <CheckCircleIcon className="w-3 h-3 text-primary" />
              </span>
              <span className="text-sm">Maximum file size is 100MB per upload</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block p-1 bg-primary/10 dark:bg-primary/20 rounded-full mt-0.5">
                <CheckCircleIcon className="w-3 h-3 text-primary" />
              </span>
              <span className="text-sm">Uploaded files can be shared via the Share tab</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default MainFeature;