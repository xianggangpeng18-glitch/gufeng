
import { GoogleGenAI, Type } from "@google/genai";
import { MoodSelection } from "../types";

export const generateClassicalQuote = async (selection: MoodSelection) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    你是一位精通中国古典文学、辞赋与诗词的大家。
    你的任务是根据用户的“心情分类”、“意象主题”、“情感强度”以及“具体描述”，创作一句20字以内的古风/古文短句。
    
    规则：
    1. 必须是原创的古文风格，而非简单的现代白话。
    2. 字数严控在20字以内。
    3. 风格可以隐喻、暗示、唯美、苍凉或深邃，务必有“高级感”。
    4. 不要提供解释，只返回生成的文字内容。
    5. 如果用户描述含有负面极端情绪，请以委婉、超脱的文学手法化解。
  `;

  const prompt = `
    心情：${selection.category}
    意象风格：${selection.theme}
    情感强度：${selection.intensity}/5
    具体心境描述：${selection.description}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("墨尽笔枯，暂无法成句，请稍后再试。");
  }
};
