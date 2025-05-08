import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, TrashIcon, TagIcon } from '@heroicons/react/24/outline';
import { useTaskContext } from '../../../context/TaskContext';

function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useTaskContext();
  
  return (
    <div 
      className={`task-transition rounded-xl border ${
        task.isCompleted 
          ? 'border-green-100 bg-green-50' 
          : 'border-neutral-100 hover:border-primary-100 bg-white hover:bg-primary-50/30'
      } p-4 shadow-xs hover:shadow-md transition-all duration-200`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="checkbox-container" onClick={() => toggleTask(task.id)}>
            <input 
              type="checkbox" 
              checked={task.isCompleted} 
              readOnly 
              className="cursor-pointer"
              data-testid={`task-checkbox-${task.id}`}
            />
            <CheckIcon className="checkmark h-3 w-3 text-white cursor-pointer" />
          </div>
          
          <p 
            className={`text-left text-base cursor-pointer ${
              task.isCompleted 
                ? 'line-through text-neutral-500' 
                : 'text-neutral-800'
            }`}
            onClick={() => toggleTask(task.id)}
            data-testid={`task-text-${task.id}`}
          >
            {task.title || task.text}
          </p>
        </div>
        
        <motion.button
          className={`delete-btn p-2 rounded-full ${
            task.isCompleted 
              ? 'bg-rose-100 text-rose-600 hover:bg-rose-200' 
              : 'bg-transparent text-neutral-400 hover:bg-neutral-100'
          } transition-colors`}
          onClick={() => deleteTask(task.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-testid={`delete-task-${task.id}`}
        >
          <TrashIcon className="h-4 w-4" />
        </motion.button>
      </div>
      
      {/* Display tags if they exist */}
      {task.tags && task.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1" data-testid={`task-tags-${task.id}`}>
          {task.tags.map((tag, index) => (
            <div 
              key={index} 
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
            >
              <TagIcon className="h-3 w-3 mr-1" />
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskItem;