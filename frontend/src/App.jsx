// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { Navbar } from './components/layout/navbar';
import { Footer } from './components/layout/footer';
import Home from './pages';
import Analysis from './pages/analysis';
import Quiz from './pages/quiz';
import Signup from './pages/user/signup';
import Signin from './pages/user/signin';
import Dashboard from './pages/user/dashboard';
import ProtectedRoute from './pages/user/ProtectedRoute';
import GoogleCallback from './pages/user/google-callback';


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/signin" element={<Signin />} />
        <Route path="/user/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/user/google-callback" element={<GoogleCallback />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
