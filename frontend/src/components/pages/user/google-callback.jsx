import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      // Optionally fetch user info here
      navigate('/user/dashboard');
    } else {
      navigate('/user/signin');
    }
  }, [navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
      <div className="text-lg text-gray-700 font-semibold">Signing you in with Google...</div>
    </div>
  );
};

export default GoogleCallback; 