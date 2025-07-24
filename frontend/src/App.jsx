// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { Navbar } from './components/layout/navbar';
import { Footer } from './components/layout/footer';
import Home from './components/pages/index';
import Quiz from './components/pages/quiz';
import './App.css';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
