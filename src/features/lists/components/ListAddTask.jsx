import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTaskContext } from '../../../context/TaskContext';

function ListAddTask({ onCancel, listFilters }) {
  const { addTask } = useTaskContext();
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  // Extract tag filters from the list's filters
  const getTagFilters = () => {
    return listFilters
      .filter(filter => filter.type === 'tag')
      .map(filter => filter.value);
  };

  useEffect(() => {
    // Auto-focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    // Pre-populate with the list's tag filters
    const tagFilters = getTagFilters();
    
    addTask({ 
      text, 
      isCompleted: false, 
      tags: tagFilters
    });
    
    setText('');
    onCancel();
  };

  return (
    <form className="list-add-form" onSubmit={handleSubmit} data-testid="list-add-task-form">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add a task to this list..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full py-2 px-4 pr-20 text-sm text-neutral-800 dark:text-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 focus:border-primary-400 focus:ring-1 focus:ring-primary-200 outline-hidden transition-all"
          autoComplete="off"
          data-testid="list-task-input"
        />
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex gap-1">
          <motion.button
            type="button"
            onClick={onCancel}
            className="p-1.5 text-neutral-500 dark:text-neutral-300 hover:text-neutral-700 dark:hover:text-neutral-100 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            whileTap={{ scale: 0.9 }}
            data-testid="list-cancel-button"
          >
            <XMarkIcon className="h-4 w-4" />
          </motion.button>
          <motion.button
            type="submit"
            disabled={!text.trim()}
            className={`p-1.5 rounded-full ${
              text.trim() 
                ? 'text-primary-600 hover:text-primary-800 hover:bg-primary-50' 
                : 'text-neutral-300 cursor-not-allowed'
            } transition-colors`}
            whileTap={text.trim() ? { scale: 0.9 } : {}}
            data-testid="list-submit-button"
          >
            <CheckIcon className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
      
      {/* Show tags that will be automatically applied */}
      {getTagFilters().length > 0 && (
        <div className="mt-2 mb-1 px-1" data-testid="auto-applied-tags">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Will be tagged with: 
            <span className="font-medium ml-1 text-primary-600">
              {getTagFilters().join(', ')}
            </span>
          </p>
        </div>
      )}
    </form>
  );
}

export default ListAddTask;
