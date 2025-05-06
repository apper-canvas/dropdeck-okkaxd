import React from 'react';
import getIcon from '../utils/iconUtils';

const FileViewOptions = ({ 
  viewMode, 
  setViewMode, 
  sortOption, 
  setSortOption,
  searchQuery,
  setSearchQuery
}) => {
  const GridIcon = getIcon('Grid');
  const ListIcon = getIcon('List');
  const SortIcon = getIcon('ArrowUpDown');
  const SearchIcon = getIcon('Search');
  const XIcon = getIcon('X');

  return (
      <div className="relative max-w-md w-full flex-1">
      <div className="relative w-full md:w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-surface-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-10 py-2 border border-surface-200 dark:border-surface-700 rounded-lg bg-white dark:bg-surface-800 focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
      <div className="flex items-center gap-2 flex-shrink-0">
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <XIcon className="h-4 w-4 text-surface-400 hover:text-surface-600" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 self-end md:self-auto">
        <div className="bg-surface-100 dark:bg-surface-700 rounded-lg p-1 flex">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-surface-600 shadow-sm'
                : 'hover:bg-surface-200 dark:hover:bg-surface-600'
            }`}
            aria-label="Grid view"
          >
            <GridIcon className="w-5 h-5 text-surface-700 dark:text-surface-300" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${
              viewMode === 'list'
                ? 'bg-white dark:bg-surface-600 shadow-sm'
                : 'hover:bg-surface-200 dark:hover:bg-surface-600'
            }`}
            aria-label="List view"
          >
            <ListIcon className="w-5 h-5 text-surface-700 dark:text-surface-300" />
          </button>
        </div>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-surface-100 dark:bg-surface-700 border-0 text-surface-700 dark:text-surface-300 rounded-lg p-2 pl-3 pr-8 focus:ring-2 focus:ring-primary"
        >
          <option value="name">Name</option>
          <option value="date">Date</option>
          <option value="size">Size</option>
          <option value="type">Type</option>
        </select>
      </div>
    </div>
  );
};

export default FileViewOptions;