import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.post("/api/tts", async (req, res) => {
  console.log('POST /api/tts hit with body:', req.body); // <--- Logging for debug!
  try {
    // Get text and either default or provided voiceId from request body
    const { text, voiceId = "kHhWB9Fw3aF6ly7JvltC" } = req.body;

    // Send POST request to ElevenLabs API
    const upstream = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?optimize_streaming_latency=4`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg"
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: { stability: 0.4, similarity_boost: 0.7 }
        })
      }
    );

    // Error handling: if upstream call fails, print error and return 500
    if (!upstream.ok) {
      const err = await upstream.text();
      return res.status(500).json({ error: "TTS failed", details: err });
    }

    // Convert Web Stream to Buffer then send as audio/mpeg
    const arrayBuffer = await upstream.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-store");
    res.end(buffer);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "server_error" });
  }
});

app.listen(3000, () => console.log("TTS server running on :3000"));
