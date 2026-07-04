import React from 'react';
import { motion } from 'framer-motion';
import styles from '../AIHome.module.css';
import ProfileSection from '../ProfileSection';

const HumanLayer = () => {
    return (
        <div style={{ paddingBottom: '4rem', position: 'relative', zIndex: 10 }}>
            {/* Section 0: Profile Anchor */}
            <section className={styles.section} style={{ minHeight: '80vh', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    {/* Profile Image Wrapper */}
                    <div style={{ marginBottom: '2rem' }}>
                        <ProfileSection />
                    </div>

                    <motion.h1
                        className={styles.cinematic}
                        style={{
                            fontSize: '3rem',
                            marginBottom: '0.5rem',
                            color: '#fff',
                            textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        AMIT KUMAR
                    </motion.h1>

                    <motion.p
                        className={styles.mono}
                        style={{ fontSize: '1.2rem', color: '#88ccdd' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                    >
                        I am currently specializing in MLOps (Machine Learning Operations), focusing on building robust pipelines, model orchestration, and scalable production deployments.
                    </motion.p>
                </motion.div>
            </section>

            {/* Section 1: Philosophy (The Human Mind) */}
            <section className={styles.section} style={{ maxWidth: '800px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h2 className={styles.cinematic} style={{ marginBottom: '2rem', color: '#555' }}>
                        // CORE PHILOSOPHY
                    </h2>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem', color: '#ddd' }}>
                        I am an AI and MLOps Engineer dedicated to architecting robust, end-to-end machine learning pipelines. While building intelligent models is crucial, my true passion lies in <strong>Machine Learning Operations (MLOps)</strong>—the engineering discipline of deploying, monitoring, and scaling these models in real-world production environments. <br/><br/>
                        My expertise spans continuous integration and continuous deployment (CI/CD) for ML, automated model retraining, containerization, and infrastructure as code. I focus on creating self-healing architectures that can handle massive data streams, utilizing tools like Docker, Kubernetes, Jenkins, and cloud-native AI services to ensure zero downtime and peak inference latency. <br/><br/>
                        With a relentless drive for optimization, I don't just build algorithms in isolation; I engineer resilient, enterprise-grade AI ecosystems that reliably deliver intelligence at scale.
                    </p>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#aaa' }}>
                        But beneath this human exterior lies a digital obsession. <br />
                        <span style={{ color: '#0ff' }}>Scroll down to awaken the intelligence.</span>
                    </p>
                </motion.div>
            </section>
        </div>
    );
};

export default HumanLayer;
