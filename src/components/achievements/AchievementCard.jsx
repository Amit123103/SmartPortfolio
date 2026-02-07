import React from 'react';
import { motion } from 'framer-motion';
import styles from './AchievementCard.module.css';

const AchievementCard = ({ item, index, onClick }) => {
    return (
        <motion.div
            className={styles.cardContainer}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
            onClick={() => onClick(item)}
        >
            <div className={styles.card}>
                <div className={styles.glow} />
                <div className={styles.imageWrapper}>
                    <img src={item.image} alt={item.title} className={styles.image} />
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.description}>{item.description}</p>
                    <span className={styles.date}>{item.date}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default AchievementCard;
