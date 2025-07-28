import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/user/signin" replace />;
  }
  
  return children;
};

export default ProtectedRoute; 