import express from 'express';
// Hooks for Admin CRM to fetch emails, etc. (Mocked for now or connected to DB)
import { getDB } from '../db/db.js';

const router = express.Router();

router.get('/inbox', async (req, res) => {
    // Return DB messages
    const db = getDB();
    await db.read();
    res.json(db.data.messages || []);
});

export default router;
