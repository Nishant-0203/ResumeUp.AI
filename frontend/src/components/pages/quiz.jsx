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
    <div className="quiz-page">
      <div className="container">
        <header className="header">
          <h1>Quiz</h1>
          <button onClick={goHome} className="back-home">Back to Home</button>
        </header>
        {quizLoading && <div>Loading quiz...</div>}
        {error && <div className="error-message">{error}</div>}
        {showQuiz && quizzes.length > 0 && !quizCompleted && (
          <div className="quiz-section">
            <h3>Quiz for Weakness: {quizzes[currentQuizIndex].weakness}</h3>
            <div className="quiz-header">
              <div className="quiz-progress">
                Question {currentQuestion + 1} of {quizzes[currentQuizIndex].quiz.questions.length}
              </div>
              <div className="quiz-category">
                Category: {quizzes[currentQuizIndex].quiz.questions[currentQuestion].category || 'General'}
              </div>
            </div>
            <div className="quiz-question">
              <h4>{quizzes[currentQuizIndex].quiz.questions[currentQuestion].question}</h4>
              <div className="quiz-options">
                {quizzes[currentQuizIndex].quiz.questions[currentQuestion].options.map((option, idx) => (
                  <label key={idx} className="quiz-option">
                    <input
                      type="radio"
                      name={`question-${currentQuizIndex}-${currentQuestion}`}
                      value={idx}
                      checked={selectedAnswers[currentQuizIndex]?.[currentQuestion] === idx}
                      onChange={() => handleAnswerSelect(currentQuizIndex, currentQuestion, idx)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <div className="quiz-navigation">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="quiz-nav-button"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuizIndex]?.[currentQuestion] === undefined}
                  className="quiz-nav-button primary"
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
            <h3>Combined Quiz Results</h3>
            <div className="score-display">
              <h4>Total Score: {scores.reduce((a, b) => a + (b || 0), 0)}/
                {quizzes.reduce((a, q) => a + (q.quiz.questions.length || 0), 0)}
              </h4>
              <p>Percentage: {Math.round((scores.reduce((a, b) => a + (b || 0), 0) / quizzes.reduce((a, q) => a + (q.quiz.questions.length || 0), 0)) * 100)}%</p>
            </div>
            {quizzes.map((qz, quizIdx) => (
              <div key={quizIdx} className="quiz-review">
                <h4>Quiz for Weakness: {qz.weakness}</h4>
                {qz.quiz.questions.map((question, qIndex) => (
                  <div key={qIndex} className="question-review">
                    <p><strong>Q{qIndex + 1}:</strong> {question.question}</p>
                    <p className="question-category">Category: {question.category || 'General'}</p>
                    <p className={`answer ${selectedAnswers[quizIdx]?.[qIndex] === question.correctAnswer ? 'correct' : 'incorrect'}`}>
                      Your answer: {question.options[selectedAnswers[quizIdx]?.[qIndex]] || 'No answer selected'}
                      {selectedAnswers[quizIdx]?.[qIndex] === question.correctAnswer ? ' ✅' : ' ❌'}
                    </p>
                    {selectedAnswers[quizIdx]?.[qIndex] !== question.correctAnswer && (
                      <p className="correct-answer">
                        Correct answer: {question.options[question.correctAnswer]} ✅
                      </p>
                    )}
                    <p className="explanation"><strong>Explanation:</strong> {question.explanation}</p>
                  </div>
                ))}
                <div className="score-display">
                  <h4>Score: {scores[quizIdx] || 0}/{qz.quiz.questions.length}</h4>
                </div>
              </div>
            ))}
            <div className="quiz-actions">
              <button onClick={resetQuiz} className="reset-quiz-button">
                Take All Quizzes Again
              </button>
              <button onClick={goHome} className="reset-all-button">
                Analyze New Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz; 