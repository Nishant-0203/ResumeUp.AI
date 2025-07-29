import express from 'express';
import auth from '../middleware/auth.js';
import { imageUpload } from '../middleware/upload.js';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/dashboard', auth, userController.dashboard);
router.post('/upload-image', auth, imageUpload.single('image'), userController.uploadImage);

export default router;