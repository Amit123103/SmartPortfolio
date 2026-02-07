import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../AIHome.module.css';

const Awakening = ({ onComplete }) => {
    const lines = [
        "INITIALIZING CORE SYSTEM...",
        "ACCESSING PERCEPTION LAYER...",
        "RECONSTRUCTING MEMORY GRAPH...",
        "SYSTEM ONLINE."
    ];

    const [currentLine, setCurrentLine] = useState(0);

    useEffect(() => {
        if (currentLine < lines.length) {
            const timeout = setTimeout(() => {
                setCurrentLine(prev => prev + 1);
            }, 1000); // 1.5s per line
            return () => clearTimeout(timeout);
        } else {
            // Sequence done
            setTimeout(onComplete, 800);
        }
    }, [currentLine]);

    return (
        <div className={styles.awakeningContainer}>
            {lines.slice(0, currentLine + 1).map((line, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    className={styles.systemLog}
                >
                    {`> ${line}`}
                </motion.div>
            ))}
        </div>
    );
};

export default Awakening;
