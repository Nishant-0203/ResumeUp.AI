import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/user/signin');
      return;
    }
    axios.get('/api/user/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setAnalyses(res.data.analyses || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load dashboard. Please sign in again.');
        setLoading(false);
        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/user/signin');
        }, 1500);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/user/signin');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-white to-gray-50 pt-24">
      <div className="w-full max-w-3xl px-4 py-8 bg-white/80 rounded-3xl shadow-xl border border-white/30 backdrop-blur-md">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-transparent bg-clip-text">My Dashboard</h2>
          <button onClick={handleLogout} className="px-4 py-2 rounded-full bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-white font-semibold shadow hover:opacity-90 transition">Logout</button>
        </div>
        {loading ? (
          <div className="text-center text-lg text-gray-600">Loading...</div>
        ) : error ? (
          <div className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded text-center mb-4">{error}</div>
        ) : analyses.length === 0 ? (
          <div className="text-center text-gray-700 text-lg">No resume analyses found. Upload a resume to get started!</div>
        ) : (
          <div className="space-y-6">
            {analyses.map((a, idx) => (
              <div key={a._id || idx} className="bg-gradient-to-br from-[#f8a4a8]/20 to-[#a78bfa]/20 rounded-2xl shadow p-6 border border-white/30">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <div className="font-semibold text-lg text-purple-700">Resume Analysis {idx + 1}</div>
                  <div className="text-gray-500 text-sm">{new Date(a.createdAt).toLocaleString()}</div>
                </div>
                <div className="mb-2 text-gray-700">
                  <span className="font-semibold">Overall Evaluation:</span> {a.analysisStructured?.overallEvaluation || a.analysisJson?.overallEvaluation || 'N/A'}
                </div>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex flex-col items-center"><span className="font-semibold">Strengths</span><span>{a.analysisStructured?.strengths?.length || 0}</span></div>
                  <div className="flex flex-col items-center"><span className="font-semibold">Weaknesses</span><span>{a.analysisStructured?.weaknesses?.length || 0}</span></div>
                  <div className="flex flex-col items-center"><span className="font-semibold">Skills to Improve</span><span>{a.analysisStructured?.skillsToImprove?.length || 0}</span></div>
                </div>
                <div className="mt-4 text-gray-600 text-sm break-words">
                  <span className="font-semibold">Job Description:</span> {a.jobDescription ? a.jobDescription.slice(0, 120) + (a.jobDescription.length > 120 ? '...' : '') : 'N/A'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 