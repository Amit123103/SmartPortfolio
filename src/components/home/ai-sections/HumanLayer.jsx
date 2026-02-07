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
                        style={{ fontSize: '3rem', marginBottom: '0.5rem', color: '#fff' }}
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
                        I am currently pursuing studies in Machine Learning Engineering, focusing on algorithms, data analysis, and model development.
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
                        I am a Machine Learning Engineering student with a strong interest in building intelligent systems that solve real-world problems. I enjoy working with data, exploring patterns, and transforming insights into practical solutions using modern machine learning techniques.

                        I am continuously learning and improving my skills in programming, data analysis, and model development. I enjoy experimenting with new technologies, collaborating on projects, and applying theoretical knowledge to hands-on applications.

                        With a growth mindset and curiosity-driven approach, I aim to develop impactful, scalable solutions while growing as a skilled and responsible engineer.
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
