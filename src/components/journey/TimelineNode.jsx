import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TimelineNode.module.css';

const TimelineNode = ({ data, index, onImageClick }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            className={styles.nodeContainer}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            {/* Timeline Dot */}
            <motion.div
                className={styles.nodePoint}
                whileHover={{ scale: 1.5, borderColor: '#fff' }}
            />

            {/* Content Card */}
            <motion.div
                className={styles.nodeCard}
                onClick={() => setExpanded(!expanded)}
                layout
            >
                <span className={styles.year}>{data.year}</span>
                <h3 className={styles.title}>{data.title}</h3>
                <p className={styles.shortDesc}>{data.description}</p>

                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            className={styles.details}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <p>
                                Detailed chapter of my journey. {data.title} was a pivotal moment where I explored new technologies and pushed my limits.
                            </p>
                            <img
                                src={data.image}
                                alt={data.title}
                                className={styles.image}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onImageClick(data.image);
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default TimelineNode;
