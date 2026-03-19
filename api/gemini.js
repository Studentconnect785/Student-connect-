export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { system, messages, maxTokens } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          })),
          generationConfig: {
            maxOutputTokens: maxTokens || 600,
            temperature: 0.7
          }
        })
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
      || 'Sorry, try again!';
    res.status(200).json({ text });

  } catch(e) {
    res.status(500).json({ text: 'Connection error. Please try again!' });
  }
}
