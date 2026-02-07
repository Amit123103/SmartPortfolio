import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectModal.module.css';

const ProjectModal = ({ isOpen, onClose, project }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    if (!isOpen || !project) return null;

    // Mock gallery logic - in a real app, 'project.gallery' would be an array of URLs
    const galleryImages = project.gallery || [
        project.image,
        `https://placehold.co/600x400/222/FFF?text=${encodeURIComponent(project.title)}+Detail+1`,
        `https://placehold.co/600x400/333/FFF?text=${encodeURIComponent(project.title)}+Detail+2`,
    ];

    return (
        <AnimatePresence>
            <motion.div
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className={styles.modal}
                    initial={{ scale: 0.9, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 50 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.header}>
                        <div>
                            <h2 className={styles.title}>{project.title}</h2>
                            <span className={styles.meta}>{project.date}</span>
                        </div>
                        <button className={styles.closeBtn} onClick={onClose}>×</button>
                    </div>

                    <div className={styles.body}>
                        <div className={styles.links}>
                            {project.githubLink && (
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={`${styles.linkBtn} ${styles.secondaryLink}`}>
                                    View Code
                                </a>
                            )}
                            {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={`${styles.linkBtn} ${styles.primaryLink}`}>
                                    Live Demo
                                </a>
                            )}
                        </div>

                        <p className={styles.description}>
                            {project.details || project.description}
                        </p>

                        {project.techStack && (
                            <>
                                <h3 className={styles.sectionTitle}>Tech Stack</h3>
                                <div className={styles.techStack}>
                                    {project.techStack.map((tech, index) => (
                                        <span key={index} className={styles.techItem}>{tech}</span>
                                    ))}
                                </div>
                            </>
                        )}

                        <h3 className={styles.sectionTitle}>Gallery</h3>
                        <div className={styles.gallery}>
                            {galleryImages.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    className={styles.galleryItem}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <img src={img} alt={`${project.title} screenshot ${idx + 1}`} className={styles.galleryImg} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Lightbox for gallery images */}
                {selectedImage && (
                    <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
                        <motion.img
                            src={selectedImage}
                            className={styles.lightboxImg}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                        />
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectModal;
