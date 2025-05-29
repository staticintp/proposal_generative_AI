// lib/gemini.js
export async function generateProposal(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;

  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=' + apiKey, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    }),
  });

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '응답이 없습니다.';
}
