import { createWorker } from "tesseract.js";

/**
 * Extract text from an image file URL or path.
 * @param imagePath - Local path or URL to the image
 * @param language - Language code (e.g., 'eng' for English, 'mya' for Myanmar)
 * @returns Promise resolving to the extracted text
 */
export async function recognizeText(
  imagePath: string,
  language: string = "eng",
): Promise<string> {
  try {
    // 1. Create a Tesseract worker with typing
    const worker = await createWorker(language);

    // 2. Perform OCR recognition
    const ret = await worker.recognize(imagePath);

    // 3. Clean up worker memory
    await worker.terminate();

    // 4. Return the clean text
    return ret.data.text.trim();
  } catch (error: any) {
    throw new Error(`OCR Processing Failed: ${error.message}`);
  }
}
