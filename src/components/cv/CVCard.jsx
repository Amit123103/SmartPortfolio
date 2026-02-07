import React from 'react';
import { motion } from 'framer-motion';
import styles from './CVCard.module.css';

const CVCard = ({ item, index, onView }) => {
    // Determine accent color style based on type
    const getAccentVars = (type) => {
        switch (type) {
            case 'general': return { '--card-accent': '#2a75bb', '--card-accent-glow': 'rgba(42, 117, 187, 0.4)' };
            case 'specialized': return { '--card-accent': '#8a2be2', '--card-accent-glow': 'rgba(138, 43, 226, 0.4)' };
            case 'resume': return { '--card-accent': '#2ebf91', '--card-accent-glow': 'rgba(46, 191, 145, 0.4)' };
            case 'video': return { '--card-accent': '#e62429', '--card-accent-glow': 'rgba(230, 36, 41, 0.4)' };
            default: return { '--card-accent': '#fff', '--card-accent-glow': 'rgba(255, 255, 255, 0.2)' };
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'resume': return '📄';
            case 'video': return '🎬';
            default: return '📋';
        }
    };

    return (
        <motion.div
            className={styles.card}
            style={getAccentVars(item.type)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{ y: -8 }}
        >
            <div className={styles.iconWrapper}>
                {getIcon(item.type)}
            </div>

            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
            <div className={styles.date}>{item.date}</div>

            <button className={styles.viewBtn} onClick={() => onView(item)}>
                View Document
            </button>
        </motion.div>
    );
};

export default CVCard;
