import React from 'react';
import { motion } from 'framer-motion';
import styles from './ExperienceCard.module.css';

const ExperienceCard = ({ item, index, onViewCertificate }) => {
    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.2, duration: 0.6, type: "spring", stiffness: 50 }}
        >
            <div className={styles.header}>
                <div className={styles.roleInfo}>
                    <h3 className={styles.title}>{item.title}</h3>
                    <span className={styles.company}>{item.company}</span>
                </div>
                <div className={styles.metaInfo}>
                    <div>{item.date}</div>
                    <div>{item.location}</div>
                </div>
            </div>

            <p className={styles.description}>{item.description}</p>

            {item.certificate && (
                <div className={styles.footer}>
                    <button
                        className={styles.certBtn}
                        onClick={() => onViewCertificate(item)}
                    >
                        <span>🏅</span> View Certificate
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default ExperienceCard;
