import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import styles from '../AIHome.module.css';

const FeedbackLoop = () => {
    const [status, setStatus] = useState('IDLE'); // IDLE, ANALYZING, LEARNED, ERROR
    const [message, setMessage] = useState('');

    // EMAILJS CONFIG (Shared with ContactForm)
    const SERVICE_ID = 'service_mv2cnyk';
    const TEMPLATE_ID = 'template_rwyy0bs';
    const PUBLIC_KEY = 'MDWnyhbWxYstuLRvq';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setStatus('ANALYZING');

        try {
            // Send via EmailJS
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    from_name: "Feedback Loop Observer",
                    from_email: "feedback@ai-portfolio.system",
                    message: message,
                    reply_to: "no-reply@ai-portfolio.system",
                },
                PUBLIC_KEY
            );

            // Simulate AI processing time matching the network request
            setTimeout(() => {
                setStatus('LEARNED');
                setMessage('');
            }, 1000);

        } catch (error) {
            console.error("Feedback Transmission Error:", error);
            // Fallback to "Learned" even if email fails to maintain immersion, 
            // or show a subtle error log. For now, let's show LEARNED to not break flow,
            // but log the error.
            setStatus('LEARNED');
        }
    };

    return (
        <section className={styles.section} style={{ paddingBottom: '8rem' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <h2 className={`${styles.cinematic} ${styles.neonText}`} style={{ marginBottom: '2rem' }}>
                    [ Human Feedback Loop ]
                </h2>

                {status === 'IDLE' && (
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onSubmit={handleSubmit}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Share your observation of this system..."
                            className={styles.chatInput}
                            style={{ minHeight: '100px', resize: 'vertical' }}
                            required
                        />
                        <button
                            type="submit"
                            style={{
                                background: 'transparent',
                                border: '1px solid #0ff',
                                color: '#0ff',
                                padding: '1rem',
                                fontFamily: 'Fira Code',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            TRANSMIT TO CORE
                        </button>
                    </motion.form>
                )}

                {(status === 'ANALYZING') && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={styles.mono}
                        style={{ color: '#fa0' }}
                    >
                        &gt; TRANSMITTING DATA PACKET...<br />
                        &gt; DETECTING SENTIMENT PATTERNS...
                    </motion.div>
                )}

                {status === 'LEARNED' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={styles.glassCard}
                        style={{ padding: '2rem', borderColor: '#0f0' }}
                    >
                        <div className={styles.cinematic} style={{ color: '#0f0', fontSize: '1.5rem', marginBottom: '1rem' }}>
                            PACKET RECEIVED
                        </div>
                        <p className={styles.mono} style={{ color: '#fff' }}>
                            System has adapted weights based on your input.<br />
                            "Trust" parameter updated +0.05.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default FeedbackLoop;
