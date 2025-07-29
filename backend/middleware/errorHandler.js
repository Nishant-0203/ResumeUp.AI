import multer from 'multer';

function errorHandler(error, req, res, next) {
  if (error instanceof multer.MulterError) {
    console.log('[errorHandler.js][if] Multer error');
    if (error.code === 'LIMIT_FILE_SIZE') {
      console.log('[errorHandler.js][if] File size limit error');
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
  }
  res.status(500).json({ error: error.message || 'Something went wrong!' });
}

export default errorHandler; 