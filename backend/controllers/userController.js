const Analysis = require('../models/Analysis');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

async function dashboard(req, res) {
  try {
    const userId = req.user.id;
    const analyses = await Analysis.find({ user: userId }).sort({ createdAt: -1 });
    const user = await User.findById(userId).select('-password');
    res.json({ analyses, user });
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
}

async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No image file provided.' 
      });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: 'User not found.' 
      });
    }

    // Cloudinary URL is in req.file.path
    const imageUrl = req.file.path;
    
    // Update user with new image URL from Cloudinary
    user.image = imageUrl;
    await user.save();

    res.json({ 
      success: true, 
      message: 'Image uploaded successfully.',
      image: imageUrl 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Server error uploading image.' 
    });
  }
}

module.exports = { dashboard, uploadImage };