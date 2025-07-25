const Analysis = require('../models/Analysis');

// NOTE: This assumes Analysis has a 'user' field referencing User._id. If not, you must add it when saving analyses.
async function dashboard(req, res) {
  try {
    const userId = req.user.id;
    console.log('[Dashboard] Request for user:', userId);
    const analyses = await Analysis.find({ user: userId }).sort({ createdAt: -1 });
    console.log('[Dashboard] Analyses found:', analyses.length);
    res.json({ analyses });
  } catch (error) {
    console.error('[Dashboard] Error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
}

module.exports = { dashboard }; 