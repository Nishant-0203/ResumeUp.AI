// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/home';
import Quiz from './components/pages/quiz';
import './App.css';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </>
  );
};

export default App;
