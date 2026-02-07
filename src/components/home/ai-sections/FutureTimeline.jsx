import React from 'react';
import { motion } from 'framer-motion';
import styles from '../AIHome.module.css';
import { useAnalytics } from '../../../context/AnalyticsContext';

const FutureTimeline = () => {
    const { metrics } = useAnalytics();
    const simulations = metrics?.simulations || [];

    return (
        <section className={styles.section}>
            <h2 className={`${styles.cinematic} ${styles.neonText}`} style={{ marginBottom: '3rem', textAlign: 'center' }}>
                [ Multi-Future Simulation ]
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                {simulations.map((sim, index) => (
                    <motion.div
                        key={index}
                        className={styles.glassCard}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        style={{ padding: '2rem' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span className={styles.mono} style={{ color: '#fff', fontSize: '1.2rem' }}>{sim.path}</span>
                            <span className={styles.mono} style={{ color: '#0ff' }}>{sim.probability}% Probability</span>
                        </div>

                        <div style={{ width: '100%', height: '4px', background: '#333', borderRadius: '2px', overflow: 'hidden' }}>
                            <motion.div
                                style={{ height: '100%', background: index === 0 ? '#0ff' : index === 1 ? '#f05' : '#0f0' }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${sim.probability}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </div>

                        <div style={{ marginTop: '1rem', color: '#888', fontSize: '0.9rem' }}>
                            PREDICTED OUTCOME: <span style={{ color: '#fff' }}>{sim.outcome}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FutureTimeline;
