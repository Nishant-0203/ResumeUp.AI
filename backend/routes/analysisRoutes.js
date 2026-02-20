const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const auth = require('../middleware/auth');
const analysisController = require('../controllers/analysisController');

// Wrap multer upload with error handling
router.post(
  '/analyze-resume',
  auth,
  (req, res, next) => {
    upload.single('resume')(req, res, (err) => {
      if (err) {
        if (err.code === 'ECONNRESET') {
          return res.status(503).json({ 
            error: 'Connection to cloud storage was reset. Please try again.',
            details: err.message 
          });
        }
        return res.status(400).json({ 
          error: 'File upload failed', 
          details: err.message 
        });
      }
      next();
    });
  },
  analysisController.analyzeResumeHandler
);

router.get('/analysis/:analysisId', auth, analysisController.getAnalysisById);
router.get('/analyses', auth, analysisController.getAllAnalyses);

module.exports = router;