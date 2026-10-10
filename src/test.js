import { recognizeText } from "./index.js";
async function test() {
    console.log("Processing image with TypeScript...");
    const text = await recognizeText("https://tesseract.projectnaptha.com/img/eng_bw.png", "eng");
    console.log("\n--- Extracted Text Result ---");
    console.log(text);
}
test();
//# sourceMappingURL=test.js.map