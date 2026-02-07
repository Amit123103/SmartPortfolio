import React from 'react';
import { motion } from 'framer-motion';
import styles from './SocialButton.module.css';

const SocialButton = ({ platform, icon, color, onClick }) => {
    return (
        <motion.button
            className={styles.button}
            style={{
                borderColor: color,
                boxShadow: `0 0 10px ${color}40`
            }}
            whileHover={{
                scale: 1.1,
                boxShadow: `0 0 30px ${color}`,
                textShadow: `0 0 10px ${color}`
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            aria-label={`Connect on ${platform}`}
        >
            <span className={styles.icon} style={{ color: color }}>{icon}</span>
            <span className={styles.label} style={{ color: color }}>{platform}</span>
            <div className={styles.glow} style={{ background: color }} />
        </motion.button>
    );
};

export default SocialButton;
