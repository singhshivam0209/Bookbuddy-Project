import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider, StoreContext } from './context/StoreContext';
import { Role } from './types/index';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import Wishlist from './pages/Wishlist';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const ProtectedRoute: React.FC<{ children: React.ReactElement; allowedRole?: Role }> = ({ children, allowedRole }) => {
  const { state } = useContext(StoreContext);
  if (!state.user) return <Navigate to="/login" />;
  if (allowedRole && state.user.role !== allowedRole) return <Navigate to="/catalog" />;
  return children;
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/catalog" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/catalog" element={<ProtectedRoute><Catalog /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute allowedRole="student"><Wishlist /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute allowedRole="staff"><AdminDashboard /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;