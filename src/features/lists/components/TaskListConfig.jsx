import React, { useState } from 'react';
import { XMarkIcon, TagIcon } from '@heroicons/react/24/outline';
import { useTagContext } from '../../../context/TagContext';

function TaskListConfig({ taskList, onSave, onCancel }) {
  const { tags } = useTagContext();
  const [title, setTitle] = useState(taskList.title);
  const [filters, setFilters] = useState(taskList.filters || []);

  const handleAddTagFilter = (tag) => {
    // Check if the tag is already in filters
    if (filters.some(f => f.type === 'tag' && f.value === tag)) return;
    
    // Add the tag filter
    setFilters([...filters, { type: 'tag', value: tag }]);
  };

  const handleAddCompletionFilter = (isCompleted) => {
    // Remove any existing completion filter
    const updatedFilters = filters.filter(f => f.type !== 'completed');
    
    // Add the new completion filter
    setFilters([...updatedFilters, { type: 'completed', value: isCompleted }]);
  };

  const removeFilter = (index) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
  };

  const handleSave = () => {
    onSave({ title, filters });
    // The modal should close after saving
  };

  return (
    <div className="task-list-config p-4" data-testid="task-list-config">
      <h3 className="font-medium text-lg mb-4 text-neutral-800 dark:text-neutral-100">Configure List</h3>
      
      {/* List title input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1" htmlFor="list-title">List Title</label>
        <input
          id="list-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 rounded-md focus:outline-hidden focus:ring-1 focus:ring-primary-500"
          placeholder="Enter list title"
          data-testid="list-title-input"
        />
      </div>
      
      {/* Current filters */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Current Filters</label>
        
        {filters.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400" data-testid="no-filters-message">No filters applied. This list will show all tasks.</p>
        ) : (
          <div className="flex flex-wrap gap-2" data-testid="filter-list">
            {filters.map((filter, index) => (
              <div key={index} className="inline-flex items-center bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200 px-3 py-1 rounded-full text-sm" data-testid={`filter-item-${index}`}>
                {filter.type === 'tag' && (
                  <span>Tag: {filter.value}</span>
                )}
                {filter.type === 'completed' && (
                  <span>Status: {filter.value ? 'Completed' : 'Active'}</span>
                )}
                <button 
                  type="button"
                  onClick={() => removeFilter(index)}
                  className="ml-1 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                  data-testid={`remove-filter-${index}`}
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Add tag filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Filter by Tag</label>
        {tags.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400" data-testid="no-tags-available-message">No tags available. Add tags to tasks first.</p>
        ) : (
          <div className="flex flex-wrap gap-2" data-testid="available-tags">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleAddTagFilter(tag)}
                disabled={filters.some(f => f.type === 'tag' && f.value === tag)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                  ${filters.some(f => f.type === 'tag' && f.value === tag)
                    ? 'bg-primary-200 text-primary-700 opacity-50 cursor-not-allowed'
                    : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                data-testid={`tag-filter-${tag}`}
              >
                <TagIcon className="h-3 w-3 mr-1" />
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Add completion filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Filter by Status</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleAddCompletionFilter(false)}
            disabled={filters.some(f => f.type === 'completed' && f.value === false)}
            className={`px-3 py-1 rounded-md text-sm font-medium 
              ${filters.some(f => f.type === 'completed' && f.value === false)
                ? 'bg-blue-200 text-blue-700 opacity-50 cursor-not-allowed'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            data-testid="active-tasks-filter"
          >
            Active Tasks
          </button>
          <button
            type="button"
            onClick={() => handleAddCompletionFilter(true)}
            disabled={filters.some(f => f.type === 'completed' && f.value === true)}
            className={`px-3 py-1 rounded-md text-sm font-medium 
              ${filters.some(f => f.type === 'completed' && f.value === true)
                ? 'bg-green-200 text-green-700 opacity-50 cursor-not-allowed'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            data-testid="completed-tasks-filter"
          >
            Completed Tasks
          </button>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800"
          data-testid="cancel-config"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          data-testid="save-config"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default TaskListConfig;
