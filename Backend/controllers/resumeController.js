import fs from "fs";

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";



import analyzeResume from "../services/aiService.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const data = new Uint8Array(fs.readFileSync(req.file.path));

    const pdf = await pdfjsLib.getDocument({
      data,
      standardFontDataUrl: "node_modules/pdfjs-dist/standard_fonts/",
    }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      for (let item of content.items) {
        text += item.str + " ";
      }
    }

    const jobDescription = req.body.description;

    const aiResult = await analyzeResume(text, jobDescription);

    res.json({
      message: "Processed successfully",
      aiResponse: aiResult,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};