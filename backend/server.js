// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// DB connection
require('./db/mongoose');

// Routes
const analysisRoutes = require('./routes/analysisRoutes');
const quizRoutes = require('./routes/quizRoutes');

// Middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', analysisRoutes);
app.use('/api', quizRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running successfully!', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;