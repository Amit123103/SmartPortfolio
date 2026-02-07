import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ExperienceTimelineNode.module.css';

const ExperienceTimelineNode = ({ item, index, onViewCertificate }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            className={styles.nodeContainer}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            {/* Timeline Dot */}
            <motion.div
                className={styles.nodePoint}
                whileHover={{ scale: 1.5, borderColor: '#fff' }}
            />

            {/* Content Card */}
            <motion.div
                className={styles.nodeCard}
                onClick={() => setExpanded(!expanded)}
                layout
            >
                {item.image && (
                    <img src={item.image} alt={item.title} className={styles.nodeImage} />
                )}
                <div className={styles.header}>
                    <span className={styles.date}>{item.date}</span>
                    <h3 className={styles.title}>{item.title}</h3>
                    <h4 className={styles.company}>{item.company} | {item.location}</h4>
                </div>

                <p className={styles.shortDesc}>{item.description}</p>

                {item.certificate && (
                    <motion.button
                        className={styles.certButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewCertificate(item);
                        }}
                    >
                        View Certificate
                    </motion.button>
                )}
            </motion.div>
        </motion.div>
    );
};

export default ExperienceTimelineNode;
