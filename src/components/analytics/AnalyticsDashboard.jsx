import React from 'react';
import { motion } from 'framer-motion';
import { useAnalytics } from '../../context/AnalyticsContext';
import Layout from '../layout/Layout';
import styles from './AnalyticsDashboard.module.css';

// Visual Components (Placeholders for now, can be expanded to full charts)
const MetricCard = ({ label, value, delay }) => (
    <motion.div
        className={styles.metricCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
    >
        <div className={styles.metricValue}>{value}</div>
        <div className={styles.metricLabel}>{label}</div>
    </motion.div>
);

const InsightCard = ({ type, text, confidence, delay }) => (
    <motion.div
        className={styles.insightCard}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
    >
        <span className={styles.typeTag}>{type}</span>
        <p className={styles.insightText}>"{text}"</p>
        <div className={styles.confidenceMeter}>
            <motion.div
                className={styles.confidenceFill}
                initial={{ width: 0 }}
                whileInView={{ width: `${confidence}%` }}
                transition={{ duration: 1, delay: delay + 0.2 }}
            />
        </div>
        <span style={{ fontSize: '0.7rem', color: '#555', marginTop: '5px' }}>AI Confidence: {confidence}%</span>
    </motion.div>
);

const AnalyticsDashboard = () => {
    const { loading, metrics, insights, predictions } = useAnalytics();

    if (loading) {
        return (
            <Layout>
                <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#050505', color: '#0ff' }}>
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        style={{ fontFamily: 'monospace', fontSize: '1.2rem' }}
                    >
                        INITIALIZING AI CORE...
                    </motion.div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className={styles.dashboardContainer}>
                {/* Header */}
                <header className={styles.header}>
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        INTELLIGENCE
                    </motion.h1>
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        LIVE PERFORMANCE TRACKING & AI FORECASTING
                    </motion.p>
                </header>

                {/* Data Stream Visual */}
                <div className={styles.dataStream}>
                    <motion.div
                        animate={{ x: [-1000, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        INGESTING METRICS... LEETCODE: SYNCED... GITHUB: SYNCED... ANALYZING PATTERNS... CALCULATING VELOCITY... OPTIMIZING PATH...
                    </motion.div>
                </div>

                {/* Core Metrics */}
                <section className={styles.metricsGrid}>
                    <MetricCard label="Problem Solving" value={metrics.problemSolving} delay={0.1} />
                    <MetricCard label="Consistency" value={`${metrics.consistency}%`} delay={0.2} />
                    <MetricCard label="Speed Velocity" value={metrics.speed} delay={0.3} />
                </section>

                {/* AI Reasoning / Insights */}
                <section className={styles.insightSection}>
                    <h2 className={styles.sectionTitle}>AI Reasoning Engine</h2>
                    <div className={styles.insightGrid}>
                        {insights.map((insight, index) => (
                            <InsightCard
                                key={index}
                                type={insight.type}
                                text={insight.text}
                                confidence={insight.confidence}
                                delay={index * 0.1}
                            />
                        ))}
                    </div>
                </section>

                {/* Prediction / Forecast */}
                <section className={styles.predictionSection}>
                    <h2 className={styles.sectionTitle}>Future Trajectory</h2>
                    <div className={styles.forecastContainer}>
                        {/* Simple visual representation of graph */}
                        <svg width="100%" height="100%" viewBox="0 0 800 300" style={{ overflow: 'visible' }}>
                            {/* Grid Lines */}
                            <line x1="0" y1="250" x2="800" y2="250" stroke="#333" strokeWidth="1" />
                            <line x1="0" y1="50" x2="800" y2="50" stroke="#333" strokeWidth="1" />

                            {/* Data Path */}
                            <motion.path
                                d={`M 50,200 Q 200,180 350,150 T 600,80`}
                                fill="none"
                                stroke="#0ff"
                                strokeWidth="3"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                viewport={{ once: true }}
                            />

                            {/* Forecast Dotted Line */}
                            <motion.path
                                d={`M 600,80 Q 700,50 750,40`}
                                fill="none"
                                stroke="#0ff"
                                strokeWidth="3"
                                strokeDasharray="5,5"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 0.5 }}
                                transition={{ delay: 2, duration: 1 }}
                                viewport={{ once: true }}
                            />

                            {/* Points */}
                            <circle cx="50" cy="200" r="4" fill="#fff" />
                            <circle cx="350" cy="150" r="4" fill="#fff" />
                            <circle cx="600" cy="80" r="4" fill="#fff" />
                            <text x="610" y="80" fill="#0ff" fontSize="12">NOW</text>
                            <text x="750" y="30" fill="#0ff" fontSize="12" opacity="0.6">FORECAST</text>
                        </svg>
                    </div>
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '0.9rem' }}>
                        <div>Expected Mastery: <strong>{predictions.nextMasteryDate}</strong></div>
                        <div>Burnout Risk: <strong style={{ color: '#0f0' }}>{predictions.burnoutRisk}</strong></div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AnalyticsDashboard;
