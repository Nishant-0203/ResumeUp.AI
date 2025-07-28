const Analysis = require('../models/Analysis');
const User = require('../models/User');

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

module.exports = { dashboard }; 