import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import AuthProvider from './context/providers/AuthProvider.jsx';
import BlogProvider from './context/providers/BlogProvider.jsx';
import './index.css';
import { ScrollToTop } from './utils/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BlogProvider>
        <Router>
          <App />
          <ScrollToTop />
        </Router>
      </BlogProvider>
    </AuthProvider>
  </React.StrictMode>
);
