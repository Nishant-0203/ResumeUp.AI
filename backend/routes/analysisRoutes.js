const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const auth = require('../middleware/auth');
const analysisController = require('../controllers/analysisController');

router.post('/analyze-resume', auth, upload.single('resume'), analysisController.analyzeResumeHandler);
router.get('/analysis/:analysisId', auth, analysisController.getAnalysisById);
router.get('/analyses', auth, analysisController.getAllAnalyses);

module.exports = router;