import React from 'react';
import { motion } from 'framer-motion';
import styles from '../AIHome.module.css';
import { useAnalytics } from '../../../context/AnalyticsContext';

const DecisionEngine = () => {
    const { metrics } = useAnalytics();
    const decisions = metrics?.decisions || [];

    return (
        <section className={styles.section}>
            <h2 className={`${styles.cinematic} ${styles.neonText}`} style={{ textAlign: 'center', marginBottom: '3rem' }}>
                [ Autonomous Decision Engine ]
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                {decisions.map((decision, index) => (
                    <motion.div
                        key={index}
                        className={styles.glassCard}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        style={{ padding: '2rem', borderLeft: `4px solid ${decision.priority === 'High' ? '#f05' : decision.priority === 'Medium' ? '#fa0' : '#0f0'}` }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span className={styles.mono} style={{ fontSize: '0.7rem', color: '#888' }}>PRIORITY: {decision.priority.toUpperCase()}</span>
                            <span className={styles.mono} style={{ fontSize: '0.7rem', color: '#fff' }}>#{decision.id}</span>
                        </div>
                        <h3 className={styles.cinematic} style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#fff' }}>
                            {decision.action}
                        </h3>
                        <p className={styles.mono} style={{ fontSize: '0.85rem', color: '#ccc', lineHeight: '1.5' }}>
                            REASON: {decision.reason}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default DecisionEngine;
