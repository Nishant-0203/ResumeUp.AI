const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const analysisController = require('../controllers/analysisController');

router.post('/analyze-resume', upload.single('resume'), analysisController.analyzeResumeHandler);
router.get('/analysis/:analysisId', analysisController.getAnalysisById);
router.get('/analyses', analysisController.getAllAnalyses);

module.exports = router; 