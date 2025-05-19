import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout components
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import BrowseBooksPage from './pages/BrowseBooksPage';
import BookDetailsPage from './pages/BookDetailsPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import BarterRequestsPage from './pages/BarterRequestsPage';
import NotFoundPage from './pages/NotFoundPage';

// Auth
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="browse" element={<BrowseBooksPage />} />
              <Route path="book/:id" element={<BookDetailsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="barter-requests" element={<BarterRequestsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </AuthProvider>
  );
}

export default App;