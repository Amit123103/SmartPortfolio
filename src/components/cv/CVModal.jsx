import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CVModal.module.css';

const CVModal = ({ isOpen, onClose, document }) => {
    if (!isOpen || !document) return null;

    // Placeholder for real document images. In a real app, these would be paths to actual images/PDFs.
    const docImage = document.image || `https://placehold.co/800x1100/FFF/000?text=${encodeURIComponent(document.title + ' Preview')}`;

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
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.header}>
                        <h2 className={styles.title}>{document.title}</h2>
                        <button className={styles.closeBtn} onClick={onClose}>×</button>
                    </div>

                    <div className={styles.body}>
                        {document.type === 'video' ? (
                            <div className={styles.videoContainer}>
                                <video
                                    controls
                                    className={styles.videoPlayer}
                                    poster={`https://placehold.co/800x450/111/FFF?text=Video+CV+Preview`}
                                >
                                    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ) : (
                            <motion.img
                                src={docImage}
                                alt={document.title}
                                className={styles.documentImage}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                            />
                        )}
                    </div>

                    <div className={styles.footer}>
                        {document.type === 'video' ? (
                            <button className={styles.downloadBtn}>
                                <span>⬇</span> Download Video
                            </button>
                        ) : (
                            <a
                                href={document.downloadUrl || document.image}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.downloadBtn}
                                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <span>⬇</span> Download {document.type === 'resume' ? 'Resume' : 'CV'}
                            </a>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CVModal;
