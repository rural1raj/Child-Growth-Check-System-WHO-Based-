
import { GoogleGenAI } from "@google/genai";
import { Gender, GrowthStatus } from "./types";

export const getHealthTip = async (
  gender: Gender,
  age: number,
  weightStatus: GrowthStatus,
  heightStatus: GrowthStatus
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      Child Stats:
      - Gender: ${gender === Gender.BOY ? 'Boy' : 'Girl'}
      - Age: ${age} months
      - Weight Status: ${weightStatus}
      - Height Status: ${heightStatus}
      
      Task: Provide a 2-line helpful health tip for an Anganwadi worker in simple Hindi. 
      Focus on nutrition if growth is low. Keep it encouraging.
      Language: Hindi only.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "बच्चे के पोषण का ध्यान रखें और नियमित अंतराल पर वजन और लंबाई की जाँच करते रहें।";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "बच्चे के पोषण और नियमित टीकाकरण का ध्यान रखें। संतुलित आहार दें।";
  }
};
