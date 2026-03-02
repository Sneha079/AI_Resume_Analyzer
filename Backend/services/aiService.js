import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function buildResumeAnalyzerPrompt(text, jobDescription = "") {
  let basePrompt = `
# Context:
- You are an AI Resume Analyzer.
- You will be given Candidate's Resume and Job Description of the role he is applying for.

# Instruction:
- Analyze candidate's resume based on the possible points that can be extracted from job description.
- Consider all points like required skills, experience, education, certifications, projects, etc.
- Calculate the score (out of 5) for every point at the beginning with detailed explanation.
- If aligned mark with ✅
- If not aligned mark with ❌
- If unclear mark with ⚠️
- Final heading must be: "Suggestions to improve your resume:"

RESUME:
${text}
`;

  if (jobDescription) {
    basePrompt += `
Additionally, compare this resume to the following job description:

JOB DESCRIPTION:
${jobDescription}

# Output Format:
- Each and every point must have score (example: 3/5)
- Emoji must be at beginning (example: 4/5 ✅ Skill Match - Explanation...)
`;
  }

  return basePrompt;
}

async function analyzeResume(resumeText, jobDescription) {
  try {
    if (!resumeText) {
      return "Resume text is required.";
    }

    const prompt = buildResumeAnalyzerPrompt(resumeText, jobDescription);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    //   generationConfig: {
    //     temperature: 0.1,
    //     maxOutputTokens: 0.5,
    //   },
    });

    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "Error analyzing resume.";
  }
}

export default analyzeResume;