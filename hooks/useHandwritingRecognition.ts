import { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';

interface RecognitionResult {
    text: string;
    confidence?: number;
}

export const useHandwritingRecognition = (apiKey: string | undefined) => {
    const [isRecognizing, setIsRecognizing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const recognizeHandwriting = useCallback(async (imageBase64: string): Promise<string | null> => {
        if (!apiKey) {
            setError("API Key is missing");
            return null;
        }

        setIsRecognizing(true);
        setError(null);

        try {
            const baseUrl = (import.meta as any).env.VITE_GEMINI_BASE_URL || "https://generativelanguage.googleapis.com";
            const client = new GoogleGenAI({
                apiKey,
                httpOptions: {
                    baseUrl: baseUrl,
                    apiVersion: 'v1beta'
                }
            } as any);

            // Remove header if present (data:image/png;base64,)
            const base64Data = imageBase64.split(',')[1];

            const response = await client.models.generateContent({
                model: 'gemini-2.5-flash', // Using a model known for good vision capabilities
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { text: "Identify the handwritten mathematical formula, number, or text in this image. Return ONLY the recognized text/formula without any markdown formatting or explanation. e.g., Mm/r², √(GM/R)" },
                            { inlineData: { mimeType: 'image/png', data: base64Data } }
                        ]
                    }
                ],
            });

            const responseText = response.text;

            return responseText ? responseText.trim() : null;

        } catch (err: any) {
            console.error("Handwriting Recognition Error:", err);
            // Fallback or specific error handling
            if (err.message?.includes("404")) {
                // Fallback to older model if experiment not available? 
                // For now just error out.
                setError("Model not ready or network error.");
            } else {
                setError(err.message || "Failed to recognize handwriting");
            }
            return null;
        } finally {
            setIsRecognizing(false);
        }
    }, [apiKey]);

    return {
        recognizeHandwriting,
        isRecognizing,
        error
    };
};
