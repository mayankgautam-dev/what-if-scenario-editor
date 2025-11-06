import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Mode, Suggestion } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const base64ToInlineData = (base64String: string) => {
  const [header, data] = base64String.split(',');
  const mimeType = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
  return {
    inlineData: {
      mimeType,
      data,
    },
  };
};

const urlToBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const analyzeImage = async (imageDataUrl: string, mode: Mode): Promise<Suggestion[]> => {
  const imagePart = base64ToInlineData(imageDataUrl);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: {
      parts: [imagePart, { text: mode.analysisPrompt }]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: {
                  type: Type.STRING,
                  description: "A short, catchy title for the suggestion."
                },
                prompt: {
                  type: Type.STRING,
                  description: "A detailed, actionable prompt for the image editing model."
                }
              },
              required: ["title", "prompt"]
            }
          }
        },
        required: ["suggestions"]
      }
    }
  });

  const jsonText = response.text.trim();
  const result = JSON.parse(jsonText);

  return result.suggestions || [];
};

export const editImage = async (imageDataUrl: string, prompt: string): Promise<{ newImage: string | null; text: string | null }> => {
  const imagePart = base64ToInlineData(imageDataUrl);
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image-preview',
    contents: {
      parts: [
        imagePart,
        { text: prompt },
      ],
    },
    config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  let newImage: string | null = null;
  let text: string | null = null;

  const parts = response?.candidates?.[0]?.content?.parts;

  if (!parts || !Array.isArray(parts)) {
    console.error("Gemini API response did not contain expected parts:", response);
    const blockReason = response?.promptFeedback?.blockReason;
    if (blockReason) {
      throw new Error(`Image generation failed due to safety settings. Reason: ${blockReason}`);
    }
    throw new Error("Invalid response from image generation API. The 'parts' array is missing or not iterable.");
  }
  
  for (const part of parts) {
    if (part.inlineData) {
      const { mimeType, data } = part.inlineData;
      newImage = `data:${mimeType};base64,${data}`;
    } else if (part.text) {
      text = part.text;
    }
  }

  return { newImage, text };
};

export const generateExampleImage = async (imageUrl: string, prompt: string): Promise<string | null> => {
  const imageDataUrl = await urlToBase64(imageUrl);
  const result = await editImage(imageDataUrl, prompt);
  return result.newImage;
};

export const generateImage = async (prompt: string): Promise<{ newImage: string | null }> => {
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
    },
  });

  if (response.generatedImages?.[0]?.image?.imageBytes) {
    const base64ImageBytes = response.generatedImages[0].image.imageBytes;
    const newImage = `data:image/jpeg;base64,${base64ImageBytes}`;
    return { newImage };
  }

  return { newImage: null };
};