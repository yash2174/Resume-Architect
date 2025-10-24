import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface ResumeAnalysisResult {
    overallScore: number;
    resumeVerdict: string;
    extractedKeywords: string[];
    actionableInsights: string;
    clarityScore: number;
    impactScore: number;
    concisenessScore: number;
}

export interface CareerAnalysisResult {
    roleSuitability: string;
    recruiterPerspective: string;
    skillGaps: string[];
    suggestedCourses: string[];
}

const resumeAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        overallScore: {
            type: Type.NUMBER,
            description: "A score from 0 to 100 representing the overall quality of the resume based on clarity, impact, formatting, and keyword usage."
        },
        resumeVerdict: {
            type: Type.STRING,
            description: "A concise, one or two-word verdict on the resume's quality (e.g., 'Excellent', 'Good', 'Moderate', 'Needs Improvement')."
        },
        extractedKeywords: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of the most important keywords, skills, and technologies extracted from the resume."
        },
        actionableInsights: {
            type: Type.STRING,
            description: "Detailed, actionable suggestions to improve the resume, focusing on strengths to highlight and weaknesses to address. Use markdown bullet points separated by newlines (e.g., '- Suggestion 1\\n- Suggestion 2')."
        },
        clarityScore: {
            type: Type.NUMBER,
            description: "A score from 0-100 on the resume's clarity and readability."
        },
        impactScore: {
            type: Type.NUMBER,
            description: "A score from 0-100 based on the use of quantifiable achievements and strong action verbs."
        },
        concisenessScore: {
            type: Type.NUMBER,
            description: "A score from 0-100 on how concise and to-the-point the resume is."
        }
    },
    required: ["overallScore", "resumeVerdict", "extractedKeywords", "actionableInsights", "clarityScore", "impactScore", "concisenessScore"]
};

const careerAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        roleSuitability: {
            type: Type.STRING,
            description: "A paragraph summarizing what types of roles and industries the candidate is a strong fit for based on their resume. The tone should be professional and encouraging. Do not use any markdown like asterisks."
        },
        recruiterPerspective: {
            type: Type.STRING,
            description: "Provide an analysis from a recruiter's point of view. Mention the candidate's key strengths and potential weaknesses or areas for improvement on the resume. The response must be a single paragraph. Do not use any markdown like asterisks."
        },
        skillGaps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 3-5 specific, high-impact skills or technologies the candidate should consider learning to advance in their identified career path. These should be concise phrases."
        },
        suggestedCourses: {
             type: Type.ARRAY,
             items: { type: Type.STRING },
             description: "A list of 3-5 specific, actionable course or certification recommendations that would help bridge the identified skill gaps. For example: 'AWS Certified Solutions Architect - Associate certification' or 'Advanced Python for Data Science course on Coursera'. These should be concise phrases."
        }
    },
    required: ["roleSuitability", "recruiterPerspective", "skillGaps", "suggestedCourses"]
};

export const analyzeResume = async (
    resumeFile: { data: string; mimeType: string }
): Promise<ResumeAnalysisResult> => {

    const promptText = `
        Act as an expert career coach and professional resume reviewer with experience in Applicant Tracking Systems (ATS).
        Analyze the provided resume file in isolation. Your task is to provide a comprehensive, professional review in JSON format according to the provided schema.

        Your analysis should focus on:
        1.  **Clarity and Readability:** Is the resume easy to read and understand? Is the formatting clean?
        2.  **Impact and Action Verbs:** Does the resume use strong action verbs and quantify achievements with metrics?
        3.  **Keyword Optimization:** Does the resume contain relevant keywords for a typical role in its field?
        4.  **Conciseness:** Is the content concise and impactful?

        Based on your analysis, provide the following:
        - An 'overallScore' from 0 to 100.
        - A 'clarityScore' from 0 to 100.
        - An 'impactScore' from 0 to 100.
        - A 'concisenessScore' from 0 to 100.
        - A concise 'resumeVerdict' (e.g., 'Excellent', 'Good', 'Moderate', 'Needs Improvement').
        - A list of 'extractedKeywords' which includes key skills and technologies.
        - Detailed 'actionableInsights' for improvement, formatted with markdown bullet points separated by newlines (e.g., "- Suggestion 1\\n- Suggestion 2...").
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: resumeFile.mimeType,
                            data: resumeFile.data
                        }
                    },
                    { text: promptText }
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: resumeAnalysisSchema,
            },
        });

        const jsonStr = response.text.trim();
        if (!jsonStr) {
            throw new Error("Received an empty response from the API.");
        }
        const result = JSON.parse(jsonStr) as ResumeAnalysisResult;
        return result;

    } catch (error) {
        console.error("Error analyzing resume with Gemini API:", error);
        throw new Error("Failed to get resume analysis from Gemini. The model may be unable to generate a response for the provided file.");
    }
};


export const analyzeCareerPath = async (
    resumeFile: { data: string; mimeType: string }
): Promise<CareerAnalysisResult> => {

    const promptText = `
        Act as a senior career counselor and corporate recruiter. Your task is to analyze the provided resume and deliver professional, actionable career advice.
        The response must be in JSON format according to the provided schema. The language must be professional and direct. Do not use any markdown formatting, especially asterisks.

        Your analysis should cover these areas:
        1.  **Role Suitability:** Based on the experience and skills, what job roles is this person a strong candidate for?
        2.  **Recruiter's Perspective:** What would a recruiter see as the primary strengths and weaknesses of this resume? What impression does it give?
        3.  **Skill Gap Analysis:** What critical skills or technologies are they missing to advance in their field?
        4.  **Actionable Recommendations:** Suggest specific, high-value courses or certifications that would fill these gaps and make them a more competitive candidate.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: resumeFile.mimeType,
                            data: resumeFile.data
                        }
                    },
                    { text: promptText }
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: careerAnalysisSchema,
            },
        });

        const jsonStr = response.text.trim();
        if (!jsonStr) {
            throw new Error("Received an empty response from the API.");
        }
        const result = JSON.parse(jsonStr) as CareerAnalysisResult;
        return result;

    } catch (error) {
        console.error("Error analyzing career path with Gemini API:", error);
        throw new Error("Failed to get career analysis from Gemini. The model may be unable to generate a response for the provided file.");
    }
};