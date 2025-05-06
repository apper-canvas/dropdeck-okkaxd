import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Layout from './components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import getIcon from './utils/iconUtils';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true' || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <Layout>
      <button
        onClick={toggleDarkMode}
        className="fixed z-50 bottom-5 right-5 p-3 rounded-full bg-white dark:bg-surface-800 shadow-md dark:shadow-neu-dark"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <SunIcon className="text-yellow-300 h-6 w-6" /> : <MoonIcon className="text-primary h-6 w-6" />}
      </button>

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home view="my-files" />} />
          <Route path="/shared" element={<Home view="shared" />} />
          <Route path="/recent" element={<Home view="recent" />} />
          <Route path="/starred" element={<Home view="starred" />} />
          <Route path="/trash" element={<Home view="trash" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={darkMode ? "dark" : "light"}
        toastClassName="text-sm font-medium"
      />
    </Layout>
  );
}

export default App;