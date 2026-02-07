import React from 'react';
import { motion } from 'framer-motion';
import styles from '../AIHome.module.css';

const DataCollection = () => {
    const sources = [
        { name: 'LeetCode', status: 'SYNCED', count: '450+ Solved' },
        { name: 'GitHub', status: 'ACTIVE', count: '1.2k Commits' },
        { name: 'System Design', status: 'ANALYZING', count: 'High Complexity' },
        { name: 'Portfolio', status: 'LIVE TRACKING', count: 'Session Active' }
    ];

    return (
        <section className={styles.section}>
            <h2 className={`${styles.cinematic} ${styles.neonText}`} style={{ textAlign: 'center', marginBottom: '3rem' }}>
                [ System Inputs ]
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                {sources.map((source, index) => (
                    <motion.div
                        key={index}
                        className={styles.glassCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        style={{ padding: '2rem', textAlign: 'center' }}
                    >
                        <div className={styles.mono} style={{ color: '#888', marginBottom: '0.5rem', fontSize: '0.8rem' }}>{source.name}</div>
                        <div className={styles.cinematic} style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>{source.count}</div>
                        <div className={styles.mono} style={{ color: '#0f0', fontSize: '0.7rem', border: '1px solid #0f0', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                            {source.status}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className={styles.mono}
                style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.7rem', color: '#555' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            >
                PRIVACY PROTOCOL: SECURE. ALL DATA PROCESSED LOCALLY ON-DEVICE via INDEXED_DB.
            </motion.div>
        </section>
    );
};

export default DataCollection;
