import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CertificateModal.module.css';

const CertificateModal = ({ isOpen, onClose, cert }) => {
    if (!isOpen || !cert) return null;

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
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className={styles.closeBtn} onClick={onClose}>×</button>

                    <div className={styles.content}>
                        <h2 className={styles.title}>{cert.title}</h2>
                        <div className={styles.issuer}>Issued by {cert.issuer} • {cert.date}</div>
                        {cert.details && (
                            <p style={{ marginTop: '0.5rem', color: '#ccc', fontSize: '0.9rem' }}>
                                {cert.details}
                            </p>
                        )}

                        <div className={styles.imageContainer}>
                            {/* Use placeholder if real image not available */}
                            <img
                                src={cert.image || `https://placehold.co/800x600/1a1a1a/FFF?text=${encodeURIComponent(cert.title + ' Certificate')}`}
                                alt={cert.title}
                                className={styles.image}
                            />
                        </div>

                        <div className={styles.actions}>
                            <button className={styles.downloadBtn}>
                                Download PDF
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CertificateModal;
