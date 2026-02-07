import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../AIHome.module.css';
import { useAnalytics } from '../../../context/AnalyticsContext';

const InterviewModule = () => {
    const { metrics } = useAnalytics();
    const knowledgeBase = metrics?.interviewQA || [];

    const [history, setHistory] = useState([
        { sender: 'ai', text: "I am the autonomous intelligence of this portfolio. Ask me about the developer's weaknesses, readiness, or focus." }
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // User Message
        const newHistory = [...history, { sender: 'user', text: input }];
        setHistory(newHistory);
        const query = input.toLowerCase();
        setInput('');

        // AI Logic Simulation
        setTimeout(() => {
            let response = "My analysis is inconclusive on that specific query. However, my general data suggests a strong upward trajectory.";

            const match = knowledgeBase.find(qa =>
                qa.trigger.some(trigger => query.includes(trigger))
            );

            if (match) {
                response = match.answer;
            }

            setHistory(prev => [...prev, { sender: 'ai', text: response }]);
        }, 800);
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
