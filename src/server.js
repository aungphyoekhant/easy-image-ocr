import express from "express";
import cors from "cors";
import multer from "multer";
import { createWorker } from "tesseract.js";

const app = express();
app.use(cors());
app.use(express.json());

// ပုံများကို ခေတ္တသိမ်းဆည်းရန် Multer ကို သုံးပါ
const upload = multer({ dest: "uploads/" });

// မြန်မာ NRC Regex Pattern (ဥပမာ - ၁၂/မဂတ(နိုင်)၁၂၃၄၅၆)
// လိုအပ်သလို မြန်မာ့မြို့နယ်အမည်အတိုကောက်များကို ချိန်ညှိနိုင်ပါသည်
const nrcPattern =
  /\b([၁-၉ আরবি/ဉီးတို့ပါ၀န်ဝတ္ထုစသည်...]+)\/([က-အ]+)\((နိုင်\vert{}ပြု\vert{}ဧည့်\vert{}စသ)\)([၀-၉\d]{6})\b/;

app.post("/api/verify-nrc", upload.single("nrcImage"), async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "NRC ပုံ မပါဝင်ပါ" });
  }

  const imagePath = req.file.path;

  try {
    // Tesseract Worker စတင်ရန် (မြန်မာနှင့် အင်္ဂလိပ်စာလုံးများကို တစ်ပါတည်း တွဲဖတ်ရန် 'mya+eng' ကို သုံးပါ)
    const worker = await createWorker("mya+eng");

    const {
      data: { text },
    } = await worker.recognize(imagePath);
    await worker.terminate();

    // စာသားများကို သန့်စင်ခြင်း
    const cleanedText = text.replace(/\s+/g, " ").trim();
    console.log("Extracted OCR Text:", cleanedText);

    // NRC Format နဲ့ ကိုက်ညီမှု ရှိမရှိ စစ်ဆေးခြင်း
    // (Note: OCR အမှားအယွင်းများရှိနိုင်သဖြင့် Fuzzy Matching သို့မဟုတ် AI Post-processing ထပ်မံထည့်သွင်းနိုင်သည်)
    const isMatch = nrcPattern.test(cleanedText);

    res.json({
      success: true,
      rawText: cleanedText,
      isValidFormat: isMatch,
      message: isMatch
        ? "NRC ပုံစံ မှန်ကန်ပါသည်"
        : "NRC ပုံစံ မသေချာပါ (သို့) ရှင်းလင်းသောပုံကို အသုံးပြုပါ",
    });
  } catch (error) {
    console.error("OCR Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`NRC Verification API is running on http://localhost:${PORT}`);
});
