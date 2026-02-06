
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

export const getFinancialAdvice = async (transactions: Transaction[], currentBalance: number) => {
  // Always use process.env.API_KEY directly as a named parameter.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const summary = transactions.map(t => `${t.date}: ${t.description} - Rs. ${t.amount} (${t.category})`).join('\n');
  
  const prompt = `
    As a world-class financial advisor for someone in Sri Lanka, analyze these recent transactions and provide 3 short, actionable pieces of advice to help me save more money.
    Weekly Budget Limit: Rs. 3500
    Current Total Balance: Rs. ${currentBalance}
    Recent Transactions:
    ${summary}
    
    Return the response as a clear, encouraging list. Keep each point brief (under 15 words).
  `;

  try {
    const response = await ai.models.generateContent({
      // Use gemini-3-pro-preview for advanced reasoning tasks like financial analysis.
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });
    // Directly access the .text property of GenerateContentResponse.
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I couldn't analyze your spending right now. Try again later!";
  }
};
