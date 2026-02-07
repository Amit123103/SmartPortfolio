import React from 'react';
import { motion } from 'framer-motion';
import styles from './SkillCard.module.css';

const SkillCard = ({ skill, index }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (skill.level / 100) * circumference;

    const getCategoryColor = (cat) => {
        switch (cat) {
            case 'Frontend': return { color: '#61dafb', glow: 'rgba(97, 218, 251, 0.5)' };
            case 'Backend': return { color: '#68a063', glow: 'rgba(104, 160, 99, 0.5)' };
            case 'AI': return { color: '#ffde57', glow: 'rgba(255, 222, 87, 0.5)' }; // Python yellow-ish
            case 'Tools': return { color: '#f05032', glow: 'rgba(240, 80, 50, 0.5)' }; // Git orange-ish
            default: return { color: '#fff', glow: 'rgba(255, 255, 255, 0.3)' };
        }
    };

    const { color, glow } = getCategoryColor(skill.category);

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{ '--skill-color': color, '--skill-glow': glow }}
        >
            <div className={styles.progressContainer}>
                <svg className={styles.svgCircle} viewBox="0 0 120 120">
                    <circle
                        className={styles.circleBackground}
                        cx="60"
                        cy="60"
                        r={radius}
                    />
                    <motion.circle
                        className={styles.circleProgress}
                        cx="60"
                        cy="60"
                        r={radius}
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset: strokeDashoffset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + (index * 0.1) }}
                    />
                </svg>
                <span className={styles.percentage}>
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {skill.level}%
                    </motion.span>
                </span>
            </div>

            <div className={styles.info}>
                <h3 className={styles.name}>{skill.name}</h3>
                <span className={styles.category}>{skill.category}</span>
            </div>
        </motion.div>
    );
};

export default SkillCard;
