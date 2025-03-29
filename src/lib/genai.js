import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyCRg_OnI_1FhlBsgbbI1uVdKIxh3QCr0pk";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const GenAI = async (prompt) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
        const response = await model.generateContent(prompt);
        return response.response.text();
    } catch (error) {
        console.error("Error generating content:", error);
        return null;
    }
}