import React from 'react';
import { motion } from 'framer-motion';
import styles from '../AIHome.module.css';
import { useAnalytics } from '../../../context/AnalyticsContext';

const CollectiveIntelligence = () => {
    const { metrics } = useAnalytics();
    const trends = metrics?.collectiveTrends || [];

    return (
        <section className={styles.section}>
            <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                <h2 className={`${styles.cinematic} ${styles.neonText}`} style={{ marginBottom: '1rem' }}>
                    [ Collective Intelligence Layer ]
                </h2>
                <p className={styles.mono} style={{ color: '#888', marginBottom: '3rem' }}>
                    BENCHMARKING AGAINST ANONYMIZED MARKET DATASETS
                </p>

                <div style={{ display: 'grid', gap: '2rem' }}>
                    {trends.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.glassCard}
                            style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div style={{ minWidth: '150px' }}>
                                <div className={styles.cinematic} style={{ fontSize: '1.2rem', color: '#fff' }}>{item.trend}</div>
                                <div className={styles.mono} style={{ fontSize: '0.8rem', color: item.status === 'Integrating' ? '#0f0' : '#888' }}>
                                    STATUS: {item.status}
                                </div>
                            </div>

                            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {/* User Relevance */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span className={styles.mono} style={{ width: '80px', fontSize: '0.8rem', color: '#0ff' }}>MY MATCH</span>
                                    <div style={{ flexGrow: 1, height: '4px', background: '#333', borderRadius: '2px' }}>
                                        <motion.div
                                            style={{ height: '100%', background: '#0ff' }}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.userRelevance}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                        />
                                    </div>
                                </div>
                                {/* Market Heat */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span className={styles.mono} style={{ width: '80px', fontSize: '0.8rem', color: '#f05' }}>MARKET</span>
                                    <div style={{ flexGrow: 1, height: '4px', background: '#333', borderRadius: '2px' }}>
                                        <motion.div
                                            style={{ height: '100%', background: '#f05' }}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.marketHeat}%` }}
                                            transition={{ duration: 1, delay: 0.7 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CollectiveIntelligence;
