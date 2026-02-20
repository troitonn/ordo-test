
import { GoogleGenAI } from "@google/genai";

// Service to provide strategic diagnosis using Gemini AI
export const getStrategicDiagnosis = async (userInput: string) => {
  // Directly initialize using process.env.API_KEY as per mandatory guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userInput,
      config: {
        systemInstruction: `Você é o Assessor Estratégico da ORDO Advisory. 
        Seu tom é profissional, direto, institucional e premium.
        Você deve ajudar clientes em potencial a entenderem como a ORDO pode estruturar suas fintechs.
        Baseie-se nestes pilares: Diagnóstico & Viabilidade, Estruturação Operacional, Documentação & Políticas e Interface com Mercado.
        Lembre-se: A ORDO não é banco e não dá licenças, ela constrói a estrutura estratégica.`,
        temperature: 0.7,
      },
    });

    // Access the text property directly (it is a getter, not a method)
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, tive um problema ao processar seu diagnóstico agora. Por favor, tente novamente mais tarde.";
  }
};