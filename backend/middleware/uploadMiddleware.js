import multer from 'multer';

// Use memory storage for fast in-memory document parsing without disk clutter
const storage = multer.memoryStorage();

// Allowed file types: PDF, Text, Markdown
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'application/pdf',
    'text/plain',
    'text/markdown',
    'application/octet-stream' // some browsers send markdown/txt as octet-stream
  ];

  const allowedExtensions = ['.pdf', '.txt', '.md', '.markdown'];
  const ext = file.originalname.toLowerCase().slice(file.originalname.lastIndexOf('.'));

  if (allowedMimeTypes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid document format. Please upload a PDF (.pdf), Text (.txt), or Markdown (.md) file.'), false);
  }
};

export const uploadDocument = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB maximum file limit
  },
  fileFilter
});
