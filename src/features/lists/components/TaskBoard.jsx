import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, CheckCircleIcon, TrashIcon, TagIcon } from '@heroicons/react/24/outline';
import TaskList from '../../tasks/components/TaskList';
import TaskListConfig from './TaskListConfig';
import TagManager from '../../tags/components/TagManager';
import ListAddTask from './ListAddTask';
import { useTaskContext } from '../../../context/TaskContext';
import { useTagContext } from '../../../context/TagContext';
import { useListContext } from '../../../context/ListContext';

function TaskBoard() {
  const { tasks, completeAllTasks, deleteCompletedTasks } = useTaskContext();
  const { tags } = useTagContext();
  const { taskLists, addTaskList, updateTaskList, deleteTaskList, getFilteredTasks } = useListContext();
  
  const [editingListId, setEditingListId] = useState(null);
  const [showTagManager, setShowTagManager] = useState(false);
  const [addingTaskToListId, setAddingTaskToListId] = useState(null);

  // Start editing a task list's configuration
  const handleEditTaskList = (id) => {
    setEditingListId(id);
  };

  // Handle tag management
  const handleManageTags = () => {
    setShowTagManager(true);
  };
  
  // Handle adding a task to a specific list
  const handleAddTaskToList = (listId) => {
    setAddingTaskToListId(listId);
  };

  // Complete all tasks in a specific list
  const handleCompleteListTasks = (listId) => {
    const list = taskLists.find(l => l.id === listId);
    if (!list) return;
    
    // Get the tasks that are visible in this list based on its filters
    const filteredTasks = getFilteredTasks(list.filters, tasks);
    
    // Extract just the IDs of these filtered tasks to complete
    const filteredTaskIds = filteredTasks.map(task => task.id);
    
    // Pass these IDs to the completeAllTasks function
    completeAllTasks(filteredTaskIds);
  };

  // Delete completed tasks in a specific list
  const handleDeleteListCompletedTasks = (listId) => {
    const list = taskLists.find(l => l.id === listId);
    if (!list) return;
    
    // Get the tasks that are visible in this list based on its filters
    const filteredTasks = getFilteredTasks(list.filters, tasks);
    
    // Extract just the IDs of the completed tasks in this filtered list
    const completedFilteredTaskIds = filteredTasks
      .filter(task => task.isCompleted)
      .map(task => task.id);
    
    // Pass these IDs to the deleteCompletedTasks function
    deleteCompletedTasks(completedFilteredTaskIds);
  };

  // Handle saving list configuration and closing the editor
  const handleSaveListConfig = (listId, updates) => {
    updateTaskList(listId, updates);
    setEditingListId(null); // Close the editor after saving
  };

  return (
    <div className="task-board" data-testid="task-board">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="font-semibold text-lg text-neutral-700 dark:text-neutral-200">Task Lists</h2>
        <button 
          type="button"
          className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200 transition-colors px-3 py-1.5 hover:bg-primary-50 dark:hover:bg-neutral-800 rounded-lg"
          onClick={handleManageTags}
          data-testid="manage-tags-button"
        >
          <TagIcon className="h-4 w-4 mr-2" />
          Manage Tags
        </button>
      </div>
      
      {/* Tag Manager Modal */}
      <AnimatePresence>
        {showTagManager && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTagManager(false)}
            data-testid="tag-manager-modal"
          >
            <motion.div 
              className="p-1 rounded-xl max-w-md w-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <TagManager onClose={() => setShowTagManager(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4" data-testid="task-lists-container">
        {taskLists.map(list => {
          const filteredTasks = getFilteredTasks(list.filters, tasks);
          const completedTasksCount = filteredTasks.filter(task => task.isCompleted).length;
          const hasCompletedTasks = completedTasksCount > 0;
          const allTasksCompleted = filteredTasks.length > 0 && filteredTasks.every(task => task.isCompleted);
          
          return (
            <div 
              key={list.id} 
              className="task-list-container bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 rounded-xl shadow-soft w-full flex flex-col transition-colors duration-300"
              data-testid={`task-list-${list.id}`}
            >
              {editingListId === list.id ? (
                <TaskListConfig 
                  taskList={list}
                  onSave={(updates) => handleSaveListConfig(list.id, updates)}
                  onCancel={() => setEditingListId(null)}
                />
              ) : (
                <>
                  <div className="list-header p-4 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                    <h2 className="font-medium text-lg text-neutral-800 dark:text-neutral-100" data-testid={`list-title-${list.id}`}>{list.title}</h2>
                    <div className="flex items-center gap-2">
                      <span 
                        className="text-xs font-medium text-neutral-500 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-xs"
                        data-testid={`task-count-${list.id}`}
                      >
                        {completedTasksCount}/{filteredTasks.length}
                      </span>
                      <button 
                        type="button"
                          className="text-sm text-neutral-500 dark:text-neutral-300 hover:text-neutral-700 dark:hover:text-neutral-100 px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xs"
                        onClick={() => handleEditTaskList(list.id)}
                        data-testid={`edit-list-${list.id}`}
                      >
                        Edit
                      </button>
                      {list.id !== 'default' && (
                        <button 
                          type="button"
                          className="text-sm text-rose-500 hover:text-rose-700 px-2 py-1 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xs"
                          onClick={() => deleteTaskList(list.id)}
                          data-testid={`delete-list-${list.id}`}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="list-body p-4 grow overflow-y-auto max-h-[50vh]">
                    {/* Show add task form when adding to this list */}
                    {addingTaskToListId === list.id ? (
                      <div className="mb-3">
                        <ListAddTask 
                          onCancel={() => setAddingTaskToListId(null)}
                          listFilters={list.filters}
                        />
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAddTaskToList(list.id)}
                        className="mb-3 w-full py-2 px-3 flex items-center justify-center text-sm text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-300 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-primary-300 transition-colors"
                        data-testid={`add-task-to-list-${list.id}`}
                      >
                        <PlusIcon className="h-4 w-4 mr-1.5" />
                        Add task to this list
                      </button>
                    )}
                    
                    <TaskList tasks={filteredTasks} />
                  </div>
                  
                  {/* List action buttons */}
                  {filteredTasks.length > 0 && (
                    <div className="list-actions p-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-between">
                      <motion.button 
                        type="button"
                        onClick={() => handleCompleteListTasks(list.id)} 
                        className="flex items-center text-xs font-medium text-primary-600 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200 transition-colors px-2 py-1 hover:bg-primary-50 dark:hover:bg-neutral-800 rounded-lg"
                        disabled={allTasksCompleted}
                        whileHover={{ scale: allTasksCompleted ? 1 : 1.02 }}
                        whileTap={{ scale: allTasksCompleted ? 1 : 0.98 }}
                        data-testid={`complete-all-${list.id}`}
                      >
                        <CheckCircleIcon className="h-3 w-3 mr-1" />
                        Complete All
                      </motion.button>
                      
                      <motion.button 
                        type="button"
                        onClick={() => handleDeleteListCompletedTasks(list.id)} 
                        className="flex items-center text-xs font-medium text-rose-500 hover:text-rose-700 transition-colors px-2 py-1 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg"
                        disabled={!hasCompletedTasks}
                        whileHover={{ scale: !hasCompletedTasks ? 1 : 1.02 }}
                        whileTap={{ scale: !hasCompletedTasks ? 1 : 0.98 }}
                        data-testid={`clear-completed-${list.id}`}
                      >
                        <TrashIcon className="h-3 w-3 mr-1" />
                        Clear Completed
                      </motion.button>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}

        {/* Add new task list button */}
        <motion.button
          type="button"
          className="add-list-button h-48 rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-700 flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-500 hover:text-primary-600 dark:hover:text-primary-300 hover:border-primary-300 transition-colors"
          onClick={addTaskList}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-testid="add-list-button"
        >
          <PlusIcon className="h-10 w-10" />
          <span className="mt-2 font-medium">Add New List</span>
        </motion.button>
      </div>
    </div>
  );
}

export default TaskBoard;
