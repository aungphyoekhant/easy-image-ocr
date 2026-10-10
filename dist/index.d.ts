/**
 * Extract text from an image file URL or path.
 * @param imagePath - Local path or URL to the image
 * @param language - Language code (e.g., 'eng' for English, 'mya' for Myanmar)
 * @returns Promise resolving to the extracted text
 */
export declare function recognizeText(imagePath: string, language?: string): Promise<string>;
