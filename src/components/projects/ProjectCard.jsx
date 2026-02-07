import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project, customDelay, onOpenModal }) => {
    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: customDelay, duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -10 }}
        >
            <div className={styles.imageWrapper}>
                <img src={project.image} alt={project.title} className={styles.image} />
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{project.title}</h3>
                <span className={styles.date}>{project.date}</span>
                <p className={styles.description}>{project.description}</p>

                <div className={styles.actions}>
                    <a
                        href={project.githubLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.button} ${styles.secondaryBtn}`}
                    >
                        GitHub
                    </a>
                    <a
                        href={project.liveLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.button} ${styles.primaryBtn}`}
                    >
                        Live Demo
                    </a>
                    <button
                        className={`${styles.button} ${styles.outlineBtn} ${styles.fullWidth}`}
                        onClick={() => onOpenModal && onOpenModal(project)}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
