import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';

import { TaskProvider } from './context/TaskContext';
import { TagProvider } from './context/TagContext';
import { ListProvider } from './context/ListContext';

import GlobalTaskForm from './features/tasks/components/GlobalTaskForm';
import TaskBoard from './features/lists/components/TaskBoard';

function App() {
  const [showInput, setShowInput] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const storedTheme = window.localStorage.getItem('task-dashboard.theme');
    if (storedTheme) {
      return storedTheme === 'dark';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDarkMode);
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('task-dashboard.theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  return (
    <TaskProvider>
      <TagProvider>
        <ListProvider>
          <div className="App min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-neutral-950 dark:via-slate-950 dark:to-neutral-900 flex flex-col items-center py-12 px-4 transition-colors duration-300" data-testid="app">
            <div className="w-full max-w-6xl">
              <motion.div 
                className="mb-6 bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 rounded-2xl shadow-soft p-6 transition-colors duration-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                data-testid="app-header"
              >
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 tracking-tight">Task Dashboard</h1>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800 px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    onClick={() => setIsDarkMode(prev => !prev)}
                    data-testid="theme-toggle-button"
                    aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {isDarkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
                    {isDarkMode ? 'Light' : 'Dark'}
                  </button>
                </div>
                
                <AnimatePresence>
                  {showInput ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                      data-testid="task-form-container"
                    >
                      <GlobalTaskForm onCancel={() => setShowInput(false)} />
                    </motion.div>
                  ) : (
                    <motion.button
                      className="flex items-center justify-center w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors"
                      onClick={() => setShowInput(true)}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      data-testid="show-task-form-button"
                    >
                      <PlusIcon className="h-5 w-5 mr-2" />
                      Add New Task
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* The TaskBoard component now manages all task lists */}
              <TaskBoard />
            </div>
          </div>
        </ListProvider>
      </TagProvider>
    </TaskProvider>
  );
}

export default App;
