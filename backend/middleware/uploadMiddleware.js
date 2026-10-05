import multer from 'multer';

// Use memory storage for fast in-memory document parsing without disk clutter
const storage = multer.memoryStorage();

// Allowed file types: PDF, Text, Markdown
const fileFilter = (req, file, cb) => {
  const ext = file.originalname.toLowerCase().slice(file.originalname.lastIndexOf('.'));

  const validPdf = ext === '.pdf' && file.mimetype === 'application/pdf';
  const validText = ['.txt', '.md', '.markdown'].includes(ext) && 
    ['text/plain', 'text/markdown', 'application/octet-stream'].includes(file.mimetype);

  if (validPdf || validText) {
    cb(null, true);
  } else {
    cb(new Error('Invalid document format. Please upload a PDF (.pdf), Text (.txt), or Markdown (.md) file.'), false);
  }
};

export const uploadDocument = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB maximum file limit
  },
  fileFilter
});
