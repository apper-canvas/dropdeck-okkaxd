import getIcon from './iconUtils';

// Get appropriate icon based on file type
export const getFileIcon = (fileType) => {
  // Document types
  if (fileType.includes('document') || fileType.includes('doc') || fileType.includes('pdf')) {
    return getIcon('FileText');
  }
  // Image types
  if (fileType.includes('image')) {
    return getIcon('Image');
  }
  // Video types
  if (fileType.includes('video')) {
    return getIcon('Video');
  }
  // Audio types
  if (fileType.includes('audio')) {
    return getIcon('Music');
  }
  // Spreadsheet types
  if (fileType.includes('spreadsheet') || fileType.includes('excel') || fileType.includes('csv')) {
    return getIcon('Table');
  }
  // Presentation types
  if (fileType.includes('presentation') || fileType.includes('powerpoint')) {
    return getIcon('LineChart');
  }
  // Archive types
  if (fileType.includes('zip') || fileType.includes('archive') || fileType.includes('compress')) {
    return getIcon('Archive');
  }
  // Default file icon
  return getIcon('File');
};

// Format file size
export const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
  else return (bytes / 1073741824).toFixed(2) + ' GB';
};

// Format date for display
export const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

// Get color based on file type for visual cues
export const getFileColor = (fileType) => {
  // Document types - blue
  if (fileType.includes('document') || fileType.includes('doc') || fileType.includes('pdf')) {
    return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300';
  }
  // Image types - purple
  if (fileType.includes('image')) {
    return 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300';
  }
  // Video types - red
  if (fileType.includes('video')) {
    return 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300';
  }
  // Spreadsheet types - green
  if (fileType.includes('spreadsheet') || fileType.includes('excel') || fileType.includes('csv')) {
    return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300';
  }
  // Default - gray
  return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';
};