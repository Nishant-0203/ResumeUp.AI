import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css';

const App = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [analysisId, setAnalysisId] = useState('');
  const [structuredData, setStructuredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Multi-quiz state
  const [quizzes, setQuizzes] = useState([]); // Array of { weakness, quiz }
  const [quizLoading, setQuizLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { quizIndex: { questionIndex: answerIndex } }
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [scores, setScores] = useState([]); // Array of scores per quiz
  const [showResults, setShowResults] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      setError('');
      // Reset previous results
      setAnalysis('');
      setAnalysisId('');
      setStructuredData(null);
      setQuizzes([]);
      setShowQuiz(false);
      setQuizCompleted(false);
      setScores([]);
    } else {
      setError('Please select a PDF file');
      setResumeFile(null);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile) {
      setError('Please upload a resume first');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);

    setLoading(true);
    setError('');
    setAnalysis('');
    setQuizzes([]);
    setShowQuiz(false);
    setQuizCompleted(false);
    setScores([]);

    try {
      const response = await axios.post('http://localhost:5000/api/analyze-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setAnalysis(response.data.analysis);
        setAnalysisId(response.data.analysisId);
        setStructuredData(response.data.structuredData);
        console.log('Analysis stored with ID:', response.data.analysisId);
      } else {
        setError('Analysis completed but there was an issue saving the data.');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.response?.data?.error || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuizDown = async () => {
    if (!analysisId) {
      setError('No analysis found. Please analyze a resume first.');
      return;
    }

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
  };

  const resetAll = () => {
    setResumeFile(null);
    setJobDescription('');
    setAnalysis('');
    setAnalysisId('');
    setStructuredData(null);
    setError('');
    resetQuiz();
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>AI Resume Analyzer</h1>
          <p>Analyze your resume and match it with job descriptions using Google Gemini AI.</p>
        </header>

        <div className="main-content">
          <div className="input-section">
            <div className="upload-section">
              <h3>Upload Resume</h3>
              <div className="file-upload">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <label htmlFor="resume-upload" className="file-label">
                  {resumeFile ? resumeFile.name : 'Choose PDF file'}
                </label>
              </div>
              {resumeFile && (
                <div className="success-message">
                  ✅ Resume uploaded successfully!
                </div>
              )}
            </div>

            <div className="job-description-section">
              <h3>Job Description (Optional)</h3>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="job-description-input"
                rows={6}
              />
            </div>

            <div className="button-group">
              <button
                onClick={handleAnalyze}
                disabled={!resumeFile || loading}
                className="analyze-button"
              >
                {loading ? 'Analyzing...' : 'Analyze Resume'}
              </button>
              
              {(analysis || analysisId) && (
                <button
                  onClick={resetAll}
                  className="reset-button"
                >
                  Start New Analysis
                </button>
              )}
            </div>

            {error && <div className="error-message">{error}</div>}
          </div>

          {analysis && (
            <div className="analysis-section">
              <h3>Analysis Results</h3>
              <div className="analysis-content">
                {analysis.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
              
              {/* Display structured data summary */}
              {structuredData && (
                <div className="structured-summary">
                  <h4>Quick Summary:</h4>
                  <div className="summary-item">
                    <strong>Strengths:</strong> {structuredData.strengths?.length || 0} identified
                  </div>
                  <div className="summary-item">
                    <strong>Weaknesses:</strong> {structuredData.weaknesses?.length || 0} identified
                  </div>
                  <div className="summary-item">
                    <strong>Skills to Improve:</strong> {structuredData.skillsToImprove?.length || 0} identified
                  </div>
                </div>
              )}
              
              <div className="quiz-button-section">
                <button
                  onClick={handleQuizDown}
                  disabled={quizLoading || !analysisId}
                  className="quiz-button"
                >
                  {quizLoading ? 'Generating Quiz...' : 'Quiz Down'}
                </button>
                {analysisId && (
                  <div className="analysis-id-info">
                    Analysis ID: {analysisId}
                  </div>
                )}
              </div>
            </div>
          )}

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
                <button onClick={resetAll} className="reset-all-button">
                  Analyze New Resume
                </button>
              </div>
            </div>
          )}
        </div>

        <footer className="footer">
          <p>
            Powered by <strong>React</strong> and <strong>Google Gemini AI</strong> | 
            Developed by{' '}
            <a
              href="https://www.linkedin.com/in/dutta-sujoy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Sujoy Dutta</strong>
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;