import React from 'react';
import { motion } from 'framer-motion';
import styles from './CertificationCard.module.css';

const CertificationCard = ({ cert, customDelay, onSelect }) => {
    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: customDelay, duration: 0.5, ease: "easeOut" }}
        >
            <div className={styles.iconWrapper}>
                <span role="img" aria-label="certificate">📜</span> {/* Or use an SVG icon */}
            </div>

            <h3 className={styles.title}>{cert.title}</h3>
            <div className={styles.issuer}>Issued by {cert.issuer}</div>
            <div className={styles.date}>{cert.date}</div>

            <button className={styles.viewBtn} onClick={() => onSelect(cert)}>
                View Certificate
            </button>
        </motion.div>
    );
};

export default CertificationCard;
