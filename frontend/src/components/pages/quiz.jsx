import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysisId } = location.state || {};

  const [quizzes, setQuizzes] = useState([]); // Array of { weakness, quiz }
  const [quizLoading, setQuizLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { quizIndex: { questionIndex: answerIndex } }
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [scores, setScores] = useState([]); // Array of scores per quiz
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (analysisId) {
      handleQuizDown();
    }
    // eslint-disable-next-line
  }, [analysisId]);

  const handleQuizDown = async () => {
    setQuizLoading(true);
    setError('');
    setShowResults(false);
    try {
      const response = await axios.post(`http://localhost:5000/api/generate-quiz/${analysisId}`);
      if (response.data.success && response.data.quizzes) {
        setQuizzes(response.data.quizzes);
        setShowQuiz(true);
        setCurrentQuizIndex(0);
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setQuizCompleted(false);
        setScores([]);
      } else {
        setError('Quizzes generated but there was an issue with the data format.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate quizzes. Please try again.');
    } finally {
      setQuizLoading(false);
    }
  };

  const handleAnswerSelect = (quizIdx, questionIdx, answerIdx) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [quizIdx]: {
        ...(prev[quizIdx] || {}),
        [questionIdx]: answerIdx
      }
    }));
  };

  const handleNextQuestion = () => {
    const quiz = quizzes[currentQuizIndex]?.quiz;
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScoreForQuiz(currentQuizIndex);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScoreForQuiz = (quizIdx) => {
    const quiz = quizzes[quizIdx]?.quiz;
    let correctAnswers = 0;
    (quiz.questions || []).forEach((question, qIdx) => {
      if (selectedAnswers[quizIdx]?.[qIdx] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScores((prev) => {
      const newScores = [...prev];
      newScores[quizIdx] = correctAnswers;
      return newScores;
    });
    // If not last quiz, go to next quiz
    if (quizIdx < quizzes.length - 1) {
      setCurrentQuizIndex(quizIdx + 1);
      setCurrentQuestion(0);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setQuizzes([]);
    setCurrentQuizIndex(0);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setScores([]);
    setShowResults(false);
    if (analysisId) handleQuizDown();
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex flex-col items-center mt-28">
      <div className="w-full max-w-3xl px-4 py-8 bg-white rounded-xl shadow-lg">
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold text-purple-700">Quiz</h1>
          <button onClick={goHome} className="px-4 py-2 rounded-full bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-white font-semibold shadow hover:opacity-90 transition">Back to Home</button>
        </header>
        {quizLoading && <div className="text-center text-lg text-gray-600">Loading quiz...</div>}
        {error && <div className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded mb-4 text-center">{error}</div>}
        {showQuiz && quizzes.length > 0 && !quizCompleted && (
          <div className="quiz-section">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quiz for Weakness: <span className="text-pink-600">{quizzes[currentQuizIndex].weakness}</span></h3>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div className="text-gray-600">Question {currentQuestion + 1} of {quizzes[currentQuizIndex].quiz.questions.length}</div>
              <div className="text-gray-500 italic">Category: {quizzes[currentQuizIndex].quiz.questions[currentQuestion].category || 'General'}</div>
            </div>
            <div className="quiz-question mb-6">
              <h4 className="text-lg font-medium mb-4">{quizzes[currentQuizIndex].quiz.questions[currentQuestion].question}</h4>
              <div className="flex flex-col gap-3 mb-6">
                {quizzes[currentQuizIndex].quiz.questions[currentQuestion].options.map((option, idx) => (
                  <label key={idx} className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-purple-50 cursor-pointer transition">
                    <input
                      type="radio"
                      name={`question-${currentQuizIndex}-${currentQuestion}`}
                      value={idx}
                      checked={selectedAnswers[currentQuizIndex]?.[currentQuestion] === idx}
                      onChange={() => handleAnswerSelect(currentQuizIndex, currentQuestion, idx)}
                      className="accent-purple-600"
                    />
                    <span className="text-gray-800">{option}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-between gap-4">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuizIndex]?.[currentQuestion] === undefined}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-white font-semibold shadow hover:opacity-90 transition disabled:opacity-50"
                >
                  {currentQuestion === quizzes[currentQuizIndex].quiz.questions.length - 1 ?
                    (currentQuizIndex === quizzes.length - 1 ? 'Finish All Quizzes' : 'Next Quiz') : 'Next'}
                </button>
              </div>
            </div>
          </div>
        )}
        {showResults && quizCompleted && quizzes.length > 0 && (
          <div className="quiz-results">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">Combined Quiz Results</h3>
            <div className="score-display mb-6">
              <h4 className="text-lg font-semibold">Total Score: {scores.reduce((a, b) => a + (b || 0), 0)}/
                {quizzes.reduce((a, q) => a + (q.quiz.questions.length || 0), 0)}
              </h4>
              <p className="text-gray-700">Percentage: {Math.round((scores.reduce((a, b) => a + (b || 0), 0) / quizzes.reduce((a, q) => a + (q.quiz.questions.length || 0), 0)) * 100)}%</p>
            </div>
            {quizzes.map((qz, quizIdx) => (
              <div key={quizIdx} className="quiz-review mb-8 p-4 rounded-lg border border-gray-200 bg-gray-50">
                <h4 className="text-lg font-semibold text-pink-600 mb-2">Quiz for Weakness: {qz.weakness}</h4>
                {qz.quiz.questions.map((question, qIndex) => (
                  <div key={qIndex} className="question-review mb-4">
                    <p className="font-medium"><strong>Q{qIndex + 1}:</strong> {question.question}</p>
                    <p className="text-gray-500 text-sm mb-1">Category: {question.category || 'General'}</p>
                    <p className={`answer ${selectedAnswers[quizIdx]?.[qIndex] === question.correctAnswer ? 'text-green-600' : 'text-red-600'} font-semibold`}>Your answer: {question.options[selectedAnswers[quizIdx]?.[qIndex]] || 'No answer selected'}{selectedAnswers[quizIdx]?.[qIndex] === question.correctAnswer ? ' ✅' : ' ❌'}</p>
                    {selectedAnswers[quizIdx]?.[qIndex] !== question.correctAnswer && (
                      <p className="correct-answer text-green-700">Correct answer: {question.options[question.correctAnswer]} ✅</p>
                    )}
                    <p className="explanation text-gray-700"><strong>Explanation:</strong> {question.explanation}</p>
                  </div>
                ))}
                <div className="score-display mt-2">
                  <h4 className="text-base font-semibold">Score: {scores[quizIdx] || 0}/{qz.quiz.questions.length}</h4>
                </div>
              </div>
            ))}
            <div className="quiz-actions flex flex-col md:flex-row gap-4 justify-center mt-6">
              <button onClick={resetQuiz} className="px-6 py-2 rounded-full bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition">Take All Quizzes Again</button>
              <button onClick={goHome} className="px-6 py-2 rounded-full bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-white font-semibold shadow hover:opacity-90 transition">Analyze New Resume</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz; 