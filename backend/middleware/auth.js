const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('[auth.js][if] No token provided');
    return res.status(401).json({ error: 'No token provided.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    console.log('[auth.js][if] Token verified for user:', decoded.userId);
    next();
  } catch (err) {
    console.log('[auth.js][else] Invalid token');
    return res.status(401).json({ error: 'Invalid token.' });
  }
}

module.exports = auth; 