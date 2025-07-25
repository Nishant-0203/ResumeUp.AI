// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { Navbar } from './components/layout/navbar';
import { Footer } from './components/layout/footer';
import Home from './components/pages/index';
import Analysis from './components/pages/analysis';
import Quiz from './components/pages/quiz';
import Signup from './components/pages/user/signup';
import Signin from './components/pages/user/signin';
import Dashboard from './components/pages/user/dashboard';
import ProtectedRoute from './components/pages/user/ProtectedRoute';
import GoogleCallback from './components/pages/user/google-callback';


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
