import { GoogleGenAI } from "@google/genai";

const getGeminiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key is missing. AI features will be disabled or return mock data.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateForecastingInsight = async (
  contextData: any,
  role: 'CFO' | 'COO'
): Promise<string> => {
  const ai = getGeminiClient();
  if (!ai) {
    return "AI Insight unavailable: API Key not configured. Please define process.env.API_KEY.";
  }

  const model = "gemini-2.5-flash";
  
  let systemInstruction = "";
  let prompt = "";

  if (role === 'CFO') {
    systemInstruction = "You are an expert Hospital CFO and Data Analyst. Provide a concise financial forecast and risk assessment based on the provided JSON data. Focus on cash flow, revenue trends, and actionable advice. Keep it under 100 words.";
    prompt = `Analyze this financial data: ${JSON.stringify(contextData)}`;
  } else {
    systemInstruction = "You are an expert Hospital Chief Operating Officer (COO). Provide a resource demand forecast (beds, staff) and inventory risk assessment based on the provided JSON data. Focus on efficiency and bottlenecks. Keep it under 100 words.";
    prompt = `Analyze this operational data: ${JSON.stringify(contextData)}`;
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3,
      }
    });
    return response.text || "No insights generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate AI forecast at this time.";
  }
};
