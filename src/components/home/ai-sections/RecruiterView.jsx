import React from 'react';
import { motion } from 'framer-motion';
import styles from '../AIHome.module.css';
import { useAnalytics } from '../../../context/AnalyticsContext';

const RecruiterView = () => {
    const { metrics } = useAnalytics();
    const data = metrics?.recruiterData;

    if (!data) return null;

    return (
        <section className={styles.section}>
            <motion.div
                className={styles.recruiterHud}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className={styles.scanLine} />

                <h3 className={`${styles.cinematic}`} style={{ color: '#ff0050', marginBottom: '2rem' }}>
                    EXTERNAL OBSERVER :: RECRUITER_VIEW
                </h3>

                <div className={styles.perceptionGrid}>
                    <div>
                        <div style={{ marginBottom: '2rem' }}>
                            <div className={styles.mono} style={{ color: '#888' }}>DETECTED HIRING SIGNAL</div>
                            <div className={styles.neonText} style={{ fontSize: '2rem', color: '#ff0050', textShadow: '0 0 10px #ff0050' }}>
                                {data.hiringSignal}
                            </div>
                        </div>

                        <div>
                            <div className={styles.mono} style={{ color: '#888', marginBottom: '1rem' }}>MARKET FIT ANALYSIS</div>
                            {Object.entries(data.marketFit).map(([role, score]) => (
                                <div key={role} style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{role}</span>
                                    <span style={{ color: score > 90 ? '#0ff' : '#fff' }}>{score}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.glassCard} style={{ padding: '2rem', border: '1px solid rgba(255,0,80,0.3)' }}>
                        <div className={styles.mono} style={{ color: '#ff0050', marginBottom: '1rem' }}>TOP SKILL CLUSTER</div>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {data.topSkills.map((skill, i) => (
                                <motion.li
                                    key={skill}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                                >
                                    {`> ${skill}`}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default RecruiterView;
