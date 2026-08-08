import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/generate-itinerary", async (req, res) => {
    try {
      const { destination, duration, mood, budget } = req.body;
      
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      
      const prompt = `Create a detailed travel itinerary for ${destination} for ${duration}. The mood should be ${mood} and the budget is ${budget}.
      Provide a timeline of activities per day. Limit to 4-5 activities per day. 
      The language must be in French.
      Make sure to return it as a JSON matching the requested schema.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              budgetEstimation: { type: Type.STRING, description: "Total estimated budget in Euros, e.g. '350€'" },
              pace: { type: Type.STRING, description: "Tranquille, Modéré, or Intense" },
              days: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    dayTitle: { type: Type.STRING, description: "e.g., Jour 1" },
                    activities: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          time: { type: Type.STRING, description: "e.g., 09:00" },
                          title: { type: Type.STRING },
                          description: { type: Type.STRING },
                          imageUrl: { type: Type.STRING, description: "A few English keywords to fetch an unsplash image, e.g., 'Louvre Museum Paris'" },
                          durationStr: { type: Type.STRING, description: "e.g., 2h" },
                          price: { type: Type.STRING, description: "e.g., 15€ or Gratuit" },
                          insiderTip: { type: Type.STRING, description: "A quick insider tip" }
                        },
                        required: ["time", "title", "description", "imageUrl", "durationStr", "price", "insiderTip"]
                      }
                    }
                  },
                  required: ["dayTitle", "activities"]
                }
              }
            },
            required: ["budgetEstimation", "pace", "days"]
          }
        }
      });
      
      const text = response.text;
      if (!text) {
        throw new Error("No text returned from Gemini");
      }
      
      res.json(JSON.parse(text));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate itinerary" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
