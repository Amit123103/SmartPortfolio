import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AchievementModal.module.css';

const AchievementModal = ({ isOpen, onClose, achievement }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    if (!isOpen || !achievement) return null;

    // Mock gallery images based on the main image
    const galleryImages = [
        achievement.image,
        `https://placehold.co/600x400/222/FFF?text=Detail+1`,
        `https://placehold.co/600x400/333/FFF?text=Detail+2`,
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
                    initial={{ scale: 0.8, opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
                    animate={{ scale: 1, opacity: 1, clipPath: "circle(150% at 50% 50%)" }}
                    exit={{ scale: 0.8, opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.6 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.header}>
                        <h2 className={styles.title}>{achievement.title}</h2>
                        <span className={styles.meta}>{achievement.date}</span>
                        <button className={styles.closeBtn} onClick={onClose}>×</button>
                    </div>

                    <div className={styles.body}>
                        <p className={styles.description}>{achievement.description} This achievement highlights dedication to innovation and technical excellence. Recognized by industry leaders, it marks a significant milestone in my professional journey.</p>

                        <h3 style={{ color: 'white', marginTop: '1rem', fontFamily: 'var(--font-display)' }}>Gallery</h3>
                        <div className={styles.gallery}>
                            {galleryImages.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    className={styles.galleryItem}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <img src={img} alt={`Gallery ${idx}`} className={styles.galleryImg} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Simple Lightbox */}
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

export default AchievementModal;
