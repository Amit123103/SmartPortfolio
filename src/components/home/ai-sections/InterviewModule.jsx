import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../AIHome.module.css';
import { useAnalytics } from '../../../context/AnalyticsContext';
import API_BASE_URL from '../../../config/api';

const InterviewModule = () => {
    const { metrics } = useAnalytics();
    const knowledgeBase = metrics?.interviewQA || [];

    const [history, setHistory] = useState([
        { sender: 'ai', text: "I am the autonomous intelligence of this portfolio. Ask me about the developer's weaknesses, readiness, or focus." }
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // User Message
        const newHistory = [...history, { sender: 'user', text: input }];
        setHistory(newHistory);
        const query = input;
        setInput('');

        // AI Logic Simulation
        setHistory(prev => [...prev, { sender: 'ai', text: "Analyzing query parameters...", isTyping: true }]);

        try {
            const response = await fetch(`${API_BASE_URL}/api/ai/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: query })
            });

            const data = await response.json();

            setHistory(prev => {
                const filtered = prev.filter(msg => !msg.isTyping);
                return [...filtered, { sender: 'ai', text: data.reply || "Connection to core interrupted." }];
            });

        } catch (error) {
            setHistory(prev => {
                const filtered = prev.filter(msg => !msg.isTyping);
                return [...filtered, { sender: 'ai', text: "Error: Unable to reach autonomous core." }];
            });
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <section className={styles.section}>
            <h2 className={`${styles.cinematic} ${styles.neonText}`} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                [ Autonomous Interview Entity ]
            </h2>

            <div className={styles.chatInterface}>
                <div className={styles.glassCard} style={{ height: '400px', overflowY: 'auto', padding: '1rem' }}>
                    <AnimatePresence>
                        {history.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`${styles.chatMessage} ${msg.sender === 'ai' ? styles.aiMsg : styles.userMsg}`}
                            >
                                <span className={styles.mono} style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.3rem', color: '#888' }}>
                                    {msg.sender === 'ai' ? 'SYSTEM' : 'USER'}
                                </span>
                                {msg.text}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={bottomRef} />
                </div>

                <form onSubmit={handleSend}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Query the system (e.g., 'Are you ready to hire?')"
                        className={styles.chatInput}
                    />
                </form>
            </div>
        </section>
    );
};

export default InterviewModule;
