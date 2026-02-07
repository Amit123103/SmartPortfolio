import express from 'express';
import { getDB } from '../db/db.js';

const router = express.Router();

// Validation Helper
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

router.post('/', async (req, res) => {
    try {
        const { name, email, message, honeypot } = req.body;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // 🛡️ 1. Basic Validation
        if (!name || !name.trim()) return res.status(400).json({ success: false, error: 'Name required' });
        if (!email || !isValidEmail(email)) return res.status(400).json({ success: false, error: 'Valid email required' });

        // 🛡️ 2. Honeypot (Spam Protection)
        if (honeypot) {
            console.log(`🤖 Bot detected: ${ip}`);
            return res.json({ success: true, message: 'Received' });
        }

        // 📝 3. Only Log to Database (Email handled by Frontend/EmailJS)
        const db = getDB();
        await db.read();

        const newMessage = {
            id: Date.now().toString(),
            name,
            email,
            message,
            ip,
            timestamp: new Date().toISOString(),
            status: 'logged_only' // Marked as frontend-managed
        };

        db.data.messages.push(newMessage);
        await db.write();

        console.log(`📝 Message logged (EmailJS handled delivery): ${email}`);
        res.json({ success: true, message: 'Message logged successfully' });

    } catch (error) {
        console.error('Server Log Error:', error);
        res.status(500).json({ success: false, error: 'Server Log Error' });
    }
});

export default router;
