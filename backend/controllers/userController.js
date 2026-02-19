const Analysis = require('../models/Analysis');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

async function dashboard(req, res) {
  try {
    const userId = req.user.id;
    console.log('[userController.js][try] Dashboard request for user:', userId);
    const analyses = await Analysis.find({ user: userId }).sort({ createdAt: -1 });
    const user = await User.findById(userId).select('-password');
    console.log('[userController.js][if] ✅ Analyses found:', analyses.length);
    res.json({ analyses, user });
  } catch (error) {
    console.error('[Dashboard] Error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
}

async function uploadImage(req, res) {
  try {
    console.log('[uploadImage] Request received');
    console.log('[uploadImage] File:', req.file);
    
    if (!req.file) {
      console.log('[uploadImage] ❌ No file provided');
      return res.status(400).json({ 
        success: false,
        error: 'No image file provided.' 
      });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      console.log('[uploadImage] ❌ User not found:', userId);
      return res.status(404).json({ 
        success: false,
        error: 'User not found.' 
      });
    }

    // Cloudinary URL is in req.file.path
    const imageUrl = req.file.path;
    
    console.log('[uploadImage] Cloudinary URL:', imageUrl);
    
    // Update user with new image URL from Cloudinary
    user.image = imageUrl;
    await user.save();

    console.log('[uploadImage] ✅ Image uploaded successfully for user:', userId);
    res.json({ 
      success: true, 
      message: 'Image uploaded successfully.',
      image: imageUrl 
    });
  } catch (error) {
    console.error('[uploadImage] Error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error uploading image.' 
    });
  }
}

module.exports = { dashboard, uploadImage };