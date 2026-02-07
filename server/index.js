import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import contactRoutes from './routes/contact.js';
import aiRoutes from './routes/ai.js';
app.use('/api/contact', contactRoutes);
app.use('/api/ai', aiRoutes);

// Database Initialization (using lowdb for simplified local demo)
import { initDB } from './db/db.js';
await initDB();

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'AI Contact System Online' });
});

app.listen(PORT, () => {
    console.log(`AI Contact Server running on port ${PORT}`);
});
