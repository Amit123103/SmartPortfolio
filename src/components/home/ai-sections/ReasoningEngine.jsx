import React from 'react';
import { motion } from 'framer-motion';
import styles from '../AIHome.module.css';
import { useAnalytics } from '../../../context/AnalyticsContext';

const ReasoningEngine = () => {
    const { insights } = useAnalytics();

    return (
        <section className={styles.section}>
            <motion.h2
                className={`${styles.cinematic} ${styles.neonText}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{ marginBottom: '3rem', fontSize: '2rem', textAlign: 'center' }}
            >
                [ Reasoning Engine ]
            </motion.h2>

            <div className={styles.logContainer}>
                {insights && insights.map((insight, index) => (
                    <motion.div
                        key={index}
                        className={styles.logEntry}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                    >
                        <span className={styles.logTime}>T-{index}0ms</span>
                        <span className={styles.logType}>[{insight.type.toUpperCase()}]</span>
                        <span>{insight.text}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ReasoningEngine;
