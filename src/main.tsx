import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './context/AuthContext.tsx';
import ToastsProvider from './context/ToastsContext.tsx';
import LikedCardsProvider from './context/LikedCardsContext.tsx';
import SearchProvider from './context/SearchContext.tsx';
import ThemeProvider from './context/ThemeContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <AuthProvider>
      <SearchProvider>
        <ToastsProvider>
          <LikedCardsProvider>
            <Router>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </Router>
          </LikedCardsProvider>
        </ToastsProvider>
      </SearchProvider>
    </AuthProvider>
  </ThemeProvider>
)