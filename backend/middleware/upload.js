import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Get the absolute path to the uploads directory
const uploadDir = path.join(process.cwd(), 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      console.log('[upload.js][if] Upload directory does not exist, creating:', uploadDir);
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    console.log('[upload.js] ✅ Using upload directory:', uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_'); // Sanitize filename
    const filename = `${timestamp}-${originalName}`;
    console.log('[upload.js] 📁 Generated filename:', filename);
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('[upload.js] 📄 Processing file:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });
    
    if (file.mimetype === 'application/pdf') {
      console.log('[upload.js][if] ✅ File is PDF');
      cb(null, true);
    } else {
      console.log('[upload.js][else] ❌ File is not PDF, mimetype:', file.mimetype);
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Image upload middleware
const imageUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('[upload.js] 🖼️ Processing image file:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });
    
    if (file.mimetype.startsWith('image/')) {
      console.log('[upload.js][if] ✅ File is image');
      cb(null, true);
    } else {
      console.log('[upload.js][else] ❌ File is not image, mimetype:', file.mimetype);
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit for images
  }
});

export { upload, imageUpload };