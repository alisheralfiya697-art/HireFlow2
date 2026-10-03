import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF worker
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  } catch (e) {
    console.warn('PDF worker setup:', e);
  }
}

/**
 * Extracts printable ASCII/UTF-8 words from binary buffer
 */
export function extractTextFromBinaryBuffer(buffer: ArrayBuffer): string {
  try {
    const decoder = new TextDecoder('utf-8', { fatal: false });
    const raw = decoder.decode(buffer);

    // Extract text inside PDF text blocks or plain word sequences
    const textPieces: string[] = [];

    // Check for PDF TJ / Tj operators
    const tjMatches = raw.match(/\(([^()]{2,})\)\s*Tj/g);
    if (tjMatches && tjMatches.length > 5) {
      for (const m of tjMatches) {
        const text = m.replace(/^\(/, '').replace(/\)\s*Tj$/, '').trim();
        if (text && text.length > 1) {
          textPieces.push(text);
        }
      }
    }

    if (textPieces.length > 5) {
      return textPieces.join(' ').replace(/\\r/g, '').replace(/[ \t]{2,}/g, ' ');
    }

    // Fallback: chunk sequences of readable characters
    const chunks = raw.match(/[\x20-\x7E\t\n\r]{4,}/g);
    if (chunks && chunks.length > 0) {
      const clean = chunks
        .filter(
          (c) =>
            !c.startsWith('<<') &&
            !c.startsWith('>>') &&
            !c.includes('/Font') &&
            !c.includes('/ProcSet') &&
            !c.includes('/Length') &&
            !c.includes('/Filter') &&
            !c.includes('FlateDecode') &&
            !c.includes('xref') &&
            !c.includes('trailer') &&
            !c.includes('startxref')
        )
        .join('\n')
        .replace(/[ \t]{2,}/g, ' ')
        .trim();

      if (clean.length > 30) return clean;
    }
  } catch (err) {
    console.warn('extractTextFromBinaryBuffer failed:', err);
  }
  return '';
}

/**
 * Robustly parses text from PDF file using PDF.js with fallback to stream decoding
 */
export async function parsePdfFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  try {
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useSystemFonts: true,
    });

    const pdfDoc = await loadingTask.promise;
    const pageTexts: string[] = [];

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageStrings = textContent.items
        .map((item: any) => item.str || '')
        .filter((str: string) => str.trim().length > 0);
      pageTexts.push(pageStrings.join(' '));
    }

    const fullText = pageTexts.join('\n\n').trim();
    if (fullText.length > 30) {
      return fullText;
    }
  } catch (err) {
    console.warn('PDF.js parse warning, using binary stream fallback:', err);
  }

  // Fallback to binary stream extractor
  const streamText = extractTextFromBinaryBuffer(arrayBuffer);
  if (streamText && streamText.length > 30) {
    return streamText;
  }

  return '';
}

/**
 * Parses DOCX file using mammoth with fallback
 */
export async function parseDocxFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  try {
    const result = await mammoth.extractRawText({ arrayBuffer });
    if (result.value && result.value.trim().length > 20) {
      return result.value.trim();
    }
  } catch (err) {
    console.warn('Mammoth docx parse failed, falling back:', err);
  }

  // Fallback
  return extractTextFromBinaryBuffer(arrayBuffer);
}

/**
 * Universal text extraction from any resume file
 */
export async function extractResumeText(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';

  // 1. Plain text formats
  if (
    file.type.includes('text') ||
    ['txt', 'md', 'rtf', 'json', 'csv'].includes(ext)
  ) {
    try {
      const text = await file.text();
      if (text.trim().length > 0) return text;
    } catch (e) {
      console.warn('file.text() failed:', e);
    }
  }

  // 2. DOCX files
  if (
    ext === 'docx' ||
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const text = await parseDocxFile(file);
    if (text.trim().length > 0) return text;
  }

  // 3. PDF files
  if (ext === 'pdf' || file.type === 'application/pdf') {
    const text = await parsePdfFile(file);
    if (text.trim().length > 0) return text;
  }

  // 4. Any other binary or unknown format
  try {
    const buffer = await file.arrayBuffer();
    const fallbackText = extractTextFromBinaryBuffer(buffer);
    if (fallbackText.trim().length > 0) return fallbackText;
  } catch (e) {
    console.warn('Final buffer fallback failed:', e);
  }

  return '';
}
