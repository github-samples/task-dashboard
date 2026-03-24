import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TagIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTagContext } from '../../../context/TagContext';
import { useTaskContext } from '../../../context/TaskContext';

function TagManager({ onClose }) {
  const { tags, addTag, editTag, deleteTag } = useTagContext();
  const { updateTasksWithEditedTag, updateTasksWithDeletedTag } = useTaskContext();

  const [newTagName, setNewTagName] = useState('');
  const [editingTag, setEditingTag] = useState(null);
  const [editedTagName, setEditedTagName] = useState('');

  const handleAddTag = () => {
    if (!newTagName.trim()) return;
    addTag(newTagName.trim());
    setNewTagName('');
  };

  const startEditingTag = (tag) => {
    setEditingTag(tag);
    setEditedTagName(tag);
  };

  const saveEditedTag = (originalTag) => {
    if (!editedTagName.trim()) return;
    // Update in tag context
    editTag(originalTag, editedTagName.trim());
    // Update in task context
    updateTasksWithEditedTag(originalTag, editedTagName.trim());

    setEditingTag(null);
    setEditedTagName('');
  };

  const handleDeleteTag = (tag) => {
    // Delete from tag context
    deleteTag(tag);
    // Update tasks that have this tag
    updateTasksWithDeletedTag(tag);
  };

  return (
    <div className="tag-manager bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 rounded-xl shadow-lg p-5 transition-colors duration-300" data-testid="tag-manager">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-100">Manage Tags</h3>
        <button
          className="p-2 text-neutral-500 dark:text-neutral-300 hover:text-neutral-700 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
          onClick={onClose}
          data-testid="close-tag-manager"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Add new tag */}
      <div className="mb-5">
        <div className="flex gap-2">
          <div className="relative grow">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <TagIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Add a new tag"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              className="w-full py-2 px-4 pl-9 text-sm text-neutral-800 dark:text-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 focus:border-primary-400 focus:ring-1 focus:ring-primary-200 outline-hidden transition-all"
              data-testid="new-tag-input"
            />
          </div>
          <motion.button
            onClick={handleAddTag}
            whileTap={{ scale: 0.95 }}
            disabled={!newTagName.trim()}
            className={`px-3 py-2 rounded-lg ${
              newTagName.trim() 
              ? 'bg-primary-500 text-white hover:bg-primary-600' 
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            } transition-colors`}
            data-testid="add-tag"
          >
            <PlusIcon className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {/* Tag list */}
      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto" data-testid="tag-list">
        {tags.length === 0 ? (
          <p className="text-center text-neutral-500 dark:text-neutral-400 py-3" data-testid="no-tags-message">No tags yet</p>
        ) : (
          tags.map((tag, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-2 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
              data-testid={`tag-item-${tag}`}
            >
              {editingTag === tag ? (
                <input
                  type="text"
                  value={editedTagName}
                  onChange={(e) => setEditedTagName(e.target.value)}
                  className="w-full py-1 px-2 text-sm border border-primary-300 dark:bg-neutral-900 dark:text-neutral-100 rounded-xs focus:outline-hidden focus:ring-1 focus:ring-primary-500"
                  autoFocus
                  data-testid="edit-tag-input"
                />
              ) : (
                <div className="flex items-center">
                  <TagIcon className="h-4 w-4 text-primary-600 mr-2" />
                  <span className="text-neutral-800 dark:text-neutral-100">{tag}</span>
                </div>
              )}
              
              <div className="flex gap-1">
                {editingTag === tag ? (
                  <>
                    <motion.button
                      className="p-1.5 text-green-600 hover:bg-green-50 rounded-full"
                      onClick={() => saveEditedTag(tag)}
                      whileTap={{ scale: 0.9 }}
                      data-testid="save-tag-edit"
                    >
                      <CheckIcon className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      className="p-1.5 text-neutral-500 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-full"
                      onClick={() => setEditingTag(null)}
                      whileTap={{ scale: 0.9 }}
                      data-testid="cancel-tag-edit"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button
                      className="p-1.5 text-primary-600 hover:bg-primary-50 rounded-full"
                      onClick={() => startEditingTag(tag)}
                      whileTap={{ scale: 0.9 }}
                      data-testid={`edit-tag-${tag}`}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-full"
                      onClick={() => handleDeleteTag(tag)}
                      whileTap={{ scale: 0.9 }}
                      data-testid={`delete-tag-${tag}`}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TagManager;
