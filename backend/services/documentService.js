import { PDFParse } from 'pdf-parse';

/**
 * Service to parse, extract, and clean text from uploaded documents (PDF, TXT, MD)
 */
export const extractTextFromDocument = async (file) => {
  if (!file || !file.buffer) {
    throw new Error('No document file buffer provided for parsing');
  }

  const filename = file.originalname || 'document.pdf';
  const ext = filename.toLowerCase().slice(filename.lastIndexOf('.'));
  let rawText = '';
  let pageCount = 1;

  try {
    if (ext === '.pdf' || file.mimetype === 'application/pdf') {
      const parser = new PDFParse({ data: file.buffer });
      const result = await parser.getText();
      rawText = result.text || '';
      pageCount = result.total || 1;
    } else {
      // Plain text, Markdown, or other text-based documents
      rawText = file.buffer.toString('utf-8');
      // Approximate pages (around 450 words per page)
      const approxWords = rawText.trim().split(/\s+/).length;
      pageCount = Math.max(1, Math.ceil(approxWords / 450));
    }
  } catch (error) {
    console.error(`[DOCUMENT PARSE ERROR] Error reading ${filename}:`, error.message);
    throw new Error(`Failed to parse document "${filename}": ${error.message}`);
  }

  // Clean and normalize extracted text
  const cleanedText = rawText
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const words = cleanedText ? cleanedText.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  if (wordCount < 15) {
    throw new Error(
      `Document "${filename}" contains only ${wordCount} readable words. Please provide a document with at least 15 words of readable text.`
    );
  }

  return {
    filename,
    cleanedText,
    wordCount,
    pageCount,
    fileSize: file.size,
    preview: cleanedText.slice(0, 300) + (cleanedText.length > 300 ? '...' : '')
  };
};
