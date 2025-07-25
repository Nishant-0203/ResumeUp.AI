const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/dashboard', auth, userController.dashboard);

module.exports = router; 