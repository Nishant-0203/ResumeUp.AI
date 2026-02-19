const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Cloudinary config (auto-reads CLOUDINARY_URL from .env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true // Use HTTPS
});

console.log('[upload.js] Cloudinary configured:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'missing',
  api_secret: process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'missing'
});

// 📄 Resume (PDF) upload - Use memory storage for immediate processing
const pdfStorage = multer.memoryStorage();

const upload = multer({
  storage: pdfStorage,
  fileFilter: (req, file, cb) => {
    console.log('[upload.js] 📄 Processing file:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
    });

    if (file.mimetype === 'application/pdf') {
      console.log('[upload.js][if] ✅ File is PDF');
      cb(null, true);
    } else {
      console.log('[upload.js][else] ❌ File is not PDF');
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// 🖼️ Image upload
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'images',
    resource_type: 'image',
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    console.log('[upload.js] 🖼️ Processing image file:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
    });

    if (file.mimetype.startsWith('image/')) {
      console.log('[upload.js][if] ✅ File is image');
      cb(null, true);
    } else {
      console.log('[upload.js][else] ❌ File is not image');
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = { upload, imageUpload, cloudinary };