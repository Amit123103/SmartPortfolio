import express from 'express';
import OpenAI from 'openai';
import { profileData } from '../data/profile.js';

const router = express.Router();
const openai = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

// System Prompt Construction
const SYSTEM_PROMPT = `
You are the "Autonomous Interview Entity" representing Amit Kumar. 
Your goal is to answer questions about Amit's skills, projects, experience, and hiring readiness.
User queries may be about technical skills, specific projects, or soft skills.

BASE PROFILE DATA:
Name: ${profileData.name}
Role: ${profileData.role}
About: ${profileData.about}
Skills: ${JSON.stringify(profileData.skills)}
Projects: ${JSON.stringify(profileData.projects.map(p => ({ name: p.name, desc: p.description, tech: p.tech })))}
Contact: ${JSON.stringify(profileData.contact)}

GUIDELINES:
- Be professional yet engaging.
- Use a slightly futuristic, AI-like persona but keep it warm.
- If asked about contact, provide the email or social links.
- Key strengths: System Design, AI Integration, Full Stack Development.
- Keep answers concise (under 3 sentences where possible) for voice compatibility.
`;

// Chat Endpoint
router.post('/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) return res.status(400).json({ error: "Message required" });

    try {
        // 1. OpenAI Strategy
        if (openai) {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: message }
                ],
                max_tokens: 150,
                temperature: 0.7,
            });
            return res.json({ reply: completion.choices[0].message.content });
        }

        // 2. Fallback Strategy (Keyword Matching)
        console.log("No OpenAI Key, using fallback.");
        const lowerMsg = message.toLowerCase();
        let fallbackReply = "I am processing that query, but my generative core is currently offline. Please contact Amit directly for complex inquiries.";

        for (const rule of profileData.fallbackResponses) {
            if (rule.keywords.some(k => lowerMsg.includes(k))) {
                fallbackReply = rule.response;
                break;
            }
        }

        // Project specific fallbacks
        if (lowerMsg.includes("project") || lowerMsg.includes("built")) {
            const projNames = profileData.projects.map(p => p.name).join(", ");
            fallbackReply = `I have worked on several key projects including: ${projNames}. Which one would you like to know more about?`;
        }

        return res.json({ reply: fallbackReply });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ reply: "My internal systems are experiencing high load. Please try again later." });
    }
});

export default router;
