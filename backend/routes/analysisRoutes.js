import express from 'express';
import { upload } from '../middleware/upload.js';
import auth from '../middleware/auth.js';
import analysisController from '../controllers/analysisController.js';

const router = express.Router();

router.post('/analyze-resume', auth, upload.single('resume'), analysisController.analyzeResumeHandler);
router.get('/analysis/:analysisId', auth, analysisController.getAnalysisById);
router.get('/analyses', auth, analysisController.getAllAnalyses);

export default router;