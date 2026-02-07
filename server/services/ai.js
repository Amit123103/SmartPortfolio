import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

export const generateAutoReply = async (message, name, language) => {
    if (!openai) {
        return `<p>Hi ${name},<br/><br/>Thanks for reaching out! I've received your message and will get back to you shortly.<br/><br/>Best,<br/>My Portfolio AI</p>`;
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful, professional portfolio assistant. Write an email auto-reply." },
                { role: "user", content: `Write a short, professional auto-reply email to ${name} who sent this message: "${message}". Language: ${language}. Sign it as "My Portfolio AI".` }
            ],
            max_tokens: 150
        });

        return completion.choices[0].message.content.replace(/\n/g, '<br/>');
    } catch (error) {
        console.error('OpenAI Error:', error);
        return `<p>Hi ${name},<br/><br/>Thanks for reaching out! I've received your message and will get back to you shortly.<br/><br/>Best,<br/>My Portfolio AI</p>`;
    }
};
