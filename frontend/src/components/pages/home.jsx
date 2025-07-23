import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [analysisId, setAnalysisId] = useState('');
  const [structuredData, setStructuredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      setError('');
      setAnalysis('');
      setAnalysisId('');
      setStructuredData(null);
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

  const resetAll = () => {
    setResumeFile(null);
    setJobDescription('');
    setAnalysis('');
    setAnalysisId('');
    setStructuredData(null);
    setError('');
  };

  const goToQuiz = () => {
    if (analysisId) {
      navigate('/quiz', { state: { analysisId } });
    }
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
                  onClick={goToQuiz}
                  disabled={!analysisId}
                  className="quiz-button"
                >
                  Start Quiz
                </button>
                {analysisId && (
                  <div className="analysis-id-info">
                    Analysis ID: {analysisId}
                  </div>
                )}
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

export default Home;