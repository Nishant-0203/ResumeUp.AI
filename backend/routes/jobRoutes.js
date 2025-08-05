const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jobController = require('../controllers/jobController');

// Get recommended jobs based on user's analysis
router.get('/recommended', auth, jobController.getRecommendedJobs);

// Get all jobs
router.get('/', auth, jobController.getAllJobs);

module.exports = router;
