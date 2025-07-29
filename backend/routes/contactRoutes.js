import express from 'express';
import contactController from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact
router.post('/', contactController.submitContactForm);

export default router; 