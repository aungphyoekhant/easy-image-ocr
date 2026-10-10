import { recognizeText } from "./index.js";

async function test() {
  console.log("Processing image with TypeScript...");

  // Clean, single-line direct image URL without duplicates or line breaks
  const directImageUrl =
    "https://i.pinimg.com/736x/06/4b/d7/064bd736835bdf9125189e02dda96447.jpg";

  const text = await recognizeText(directImageUrl, "eng");

  console.log("\n--- Extracted Text Result ---");
  console.log(text);
}

test();
