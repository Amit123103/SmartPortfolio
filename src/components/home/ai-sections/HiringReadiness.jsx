import React from 'react';
import { motion } from 'framer-motion';
import styles from '../AIHome.module.css';
import { useAnalytics } from '../../../context/AnalyticsContext';

const HiringReadiness = () => {
    const { metrics } = useAnalytics();
    const index = metrics?.hiringIndex;

    if (!index) return null;

    return (
        <section className={styles.section}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <h2 className={`${styles.cinematic} ${styles.neonText}`} style={{ marginBottom: '3rem' }}>
                    [ Hiring Readiness Index ]
                </h2>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                    {/* Big Gauge */}
                    <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                        <svg width="200" height="200" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="90" fill="none" stroke="#222" strokeWidth="10" />
                            <motion.circle
                                cx="100" cy="100" r="90"
                                fill="none" stroke="#0f0" strokeWidth="10"
                                strokeDasharray="565" // 2 * pi * 90
                                strokeDashoffset="565"
                                style={{ strokeLinecap: 'round', rotate: '-90deg', transformOrigin: '50% 50%' }}
                                whileInView={{ strokeDashoffset: 565 - (565 * index.score) / 100 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, ease: "easeOut" }}
                            />
                        </svg>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <span className={styles.cinematic} style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff' }}>{index.score}</span>
                            <span className={styles.mono} style={{ fontSize: '0.8rem', color: '#0f0' }}>{index.delta}</span>
                        </div>
                    </div>

                    {/* Factors */}
                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {index.factors.map((factor, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '250px', marginBottom: '0.3rem' }}>
                                    <span className={styles.mono} style={{ color: '#ccc', fontSize: '0.9rem' }}>{factor.name}</span>
                                    <span className={styles.mono} style={{ color: '#fff', fontSize: '0.9rem' }}>{factor.score}</span>
                                </div>
                                <div style={{ width: '100%', height: '2px', background: '#333' }}>
                                    <motion.div
                                        style={{ height: '100%', background: '#fff' }}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${factor.score}%` }}
                                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HiringReadiness;
