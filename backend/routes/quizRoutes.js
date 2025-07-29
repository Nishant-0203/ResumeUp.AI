import express from 'express';
import quizController from '../controllers/quizController.js';

const router = express.Router();

router.post('/generate-quiz/:analysisId', quizController.generateQuizHandler);

export default router; 