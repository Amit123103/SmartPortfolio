import fs from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, 'db.json');

// Simple In-Memory Cache with File Persistence
const db = {
    data: {
        messages: [],
        conversations: []
    }
};

export const initDB = async () => {
    try {
        const content = await fs.readFile(DB_PATH, 'utf-8');
        db.data = JSON.parse(content);
        console.log('Local Database Loaded');
    } catch (error) {
        // If file doesn't exist, create it
        console.log('Creating new Database file');
        await persistDB();
    }
};

const persistDB = async () => {
    await fs.writeFile(DB_PATH, JSON.stringify(db.data, null, 2));
};

// Generic read/write (LowDB compatible-ish interface)
export const getDB = () => {
    return {
        data: db.data,
        read: async () => { /* no-op, data is in memory */ },
        write: async () => { await persistDB(); }
    };
};
