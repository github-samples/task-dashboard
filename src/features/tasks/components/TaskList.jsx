import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';

function TaskList({ tasks }) {
  return (
    <div className="task-list flex flex-col gap-2" data-testid="task-list">
      <AnimatePresence>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              data-testid={`task-item-container-${task.id}`}
            >
              <TaskItem task={task} />
            </motion.div>
          ))
        ) : (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-neutral-500 dark:text-neutral-400 py-4 font-medium"
            data-testid="empty-task-message"
          >
            All tasks are complete!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TaskList;
