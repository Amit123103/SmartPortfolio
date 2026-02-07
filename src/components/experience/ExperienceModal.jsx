import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ExperienceModal.module.css';

const ExperienceModal = ({ isOpen, onClose, certificateName }) => {
    if (!isOpen) return null;

    // Check if certificateName is an object (the item) or a string
    const description = typeof certificateName === 'string' ? certificateName : (certificateName?.certificate || 'Certificate');
    const imageSrc = (typeof certificateName === 'object' && certificateName?.certificateImage)
        ? certificateName.certificateImage
        : `https://placehold.co/800x600/EEE/333?text=${encodeURIComponent(description)}`;

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
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.header}>
                        <span className={styles.title}>Certificate Preview</span>
                        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                    </div>

                    <div className={styles.body}>
                        <motion.img
                            src={imageSrc}
                            alt={description}
                            className={styles.image}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        />
                    </div>

                    <div className={styles.footer}>
                        <a
                            href={imageSrc}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.downloadBtn}
                            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <span>⬇</span> Download Certificate
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ExperienceModal;
