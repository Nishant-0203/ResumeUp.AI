const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Cloudinary config (auto-reads CLOUDINARY_URL from .env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // optional if CLOUDINARY_URL is set
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📄 Resume (PDF) upload
const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'resumes',        // Cloudinary folder
    resource_type: 'raw',     // needed for pdf/docx
    format: async () => 'pdf' // force pdf format
  },
});

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

module.exports = { upload, imageUpload };