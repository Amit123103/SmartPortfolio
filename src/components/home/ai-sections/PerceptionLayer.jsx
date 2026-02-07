import React from 'react';
import { motion } from 'framer-motion';
import styles from '../AIHome.module.css';
import ProfileSection from '../ProfileSection';

const PerceptionLayer = () => {
    return (
        <section className={styles.section}>
            <div className={styles.perceptionGrid}>
                {/* Left: Code Scanning Visual */}
                <motion.div
                    className={styles.glassCard}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    style={{ padding: '2rem', height: '100%', position: 'relative', overflow: 'hidden' }}
                >
                    <h3 className={`${styles.cinematic} ${styles.neonText}`}>Perception :: Source</h3>
                    <motion.div
                        className={styles.mono}
                        animate={{ y: [-200, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        style={{ color: 'rgba(0, 255, 255, 0.3)', marginTop: '2rem', fontSize: '0.8rem' }}
                    >
                        {/* Simulated Code Stream */}
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i}>{`> scanning_module_0${i} ... verified`}</div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right: Avatar Perception */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <ProfileSection />
                </motion.div>
            </div>

            <motion.div
                style={{ textAlign: 'center', marginTop: '3rem', color: '#888' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                ANALYZING DEVELOPER IDENTITY... MATCH FOUND.
            </motion.div>
        </section>
    );
};

export default PerceptionLayer;
