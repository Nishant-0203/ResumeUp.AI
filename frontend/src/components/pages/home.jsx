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
  const [quiz, setQuiz] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
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
      setQuiz(null);
      setShowQuiz(false);
      setQuizCompleted(false);
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
    setQuiz(null);
    setShowQuiz(false);
    setQuizCompleted(false);

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
      console.log('Generating quiz for analysis ID:', analysisId);
      const response = await axios.post(`http://localhost:5000/api/generate-quiz/${analysisId}`);
      
      if (response.data.success && response.data.quiz) {
        setQuiz(response.data.quiz);
        setShowQuiz(true);
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setQuizCompleted(false);
        setScore(0);
        console.log('Quiz generated successfully:', response.data.quiz.questions?.length, 'questions');
      } else {
        setError('Quiz generated but there was an issue with the data format.');
      }
    } catch (err) {
      console.error('Quiz generation error:', err);
      setError(err.response?.data?.error || 'Failed to generate quiz. Please try again.');
    } finally {
      setQuizLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setQuizCompleted(true);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setScore(0);
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

          {showQuiz && quiz && !quizCompleted && (
            <div className="quiz-section">
              <h3>Improvement Quiz</h3>
              <div className="quiz-header">
                <div className="quiz-progress">
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </div>
                <div className="quiz-category">
                  Category: {quiz.questions[currentQuestion].category || 'General'}
                </div>
              </div>
              
              <div className="quiz-question">
                <h4>{quiz.questions[currentQuestion].question}</h4>
                <div className="quiz-options">
                  {quiz.questions[currentQuestion].options.map((option, index) => (
                    <label key={index} className="quiz-option">
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value={index}
                        checked={selectedAnswers[currentQuestion] === index}
                        onChange={() => handleAnswerSelect(currentQuestion, index)}
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
                    disabled={selectedAnswers[currentQuestion] === undefined}
                    className="quiz-nav-button primary"
                  >
                    {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {showResults && quizCompleted && quiz && (
            <div className="quiz-results">
              <h3>Quiz Results</h3>
              <div className="score-display">
                <h4>Your Score: {score}/{quiz.questions.length}</h4>
                <p>Percentage: {Math.round((score / quiz.questions.length) * 100)}%</p>
                <div className="performance-message">
                  {score === quiz.questions.length ? '🎉 Perfect Score!' :
                   score >= quiz.questions.length * 0.8 ? '👏 Great Job!' :
                   score >= quiz.questions.length * 0.6 ? '👍 Good Effort!' :
                   '📚 Keep Learning!'}
                </div>
              </div>
              
              <div className="quiz-review">
                <h4>Review Your Answers:</h4>
                {quiz.questions.map((question, qIndex) => (
                  <div key={qIndex} className="question-review">
                    <p><strong>Q{qIndex + 1}:</strong> {question.question}</p>
                    <p className="question-category">Category: {question.category || 'General'}</p>
                    <p className={`answer ${selectedAnswers[qIndex] === question.correctAnswer ? 'correct' : 'incorrect'}`}>
                      Your answer: {question.options[selectedAnswers[qIndex]] || 'No answer selected'}
                      {selectedAnswers[qIndex] === question.correctAnswer ? ' ✅' : ' ❌'}
                    </p>
                    {selectedAnswers[qIndex] !== question.correctAnswer && (
                      <p className="correct-answer">
                        Correct answer: {question.options[question.correctAnswer]} ✅
                      </p>
                    )}
                    <p className="explanation"><strong>Explanation:</strong> {question.explanation}</p>
                  </div>
                ))}
              </div>
              
              <div className="quiz-actions">
                <button onClick={resetQuiz} className="reset-quiz-button">
                  Take Another Quiz
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