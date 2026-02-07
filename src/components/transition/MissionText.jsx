import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MissionText = ({ text, color }) => {
    const [displayedText, setDisplayedText] = useState('');

    // Typewriter Effect
    useEffect(() => {
        let currentText = '';
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < text.length) {
                currentText += text[currentIndex];
                setDisplayedText(currentText);
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 30); // Speed of typing

        return () => clearInterval(interval);
    }, [text]);

    const glitchVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 },
        exit: {
            opacity: 0,
            filter: 'blur(10px)',
            transition: { duration: 0.2 }
        }
    };

    return (
        <div style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 10002
        }}>
            <motion.h1
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={glitchVariants}
                style={{
                    fontFamily: 'Courier New, monospace',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: color,
                    textShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
                    letterSpacing: '5px',
                    background: 'rgba(0,0,0,0.6)',
                    padding: '0.5rem 1rem',
                    border: `1px solid ${color}`,
                    clipPath: 'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)'
                }}
            >
                {displayedText}
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >_</motion.span>
            </motion.h1>

            {/* Subtext */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                    marginTop: '0.5rem',
                    fontSize: '0.8rem',
                    color: 'white',
                    opacity: 0.7,
                    letterSpacing: '2px'
                }}
            >
                AUTHORIZATION VERIFIED...
            </motion.div>
        </div>
    );
};

export default MissionText;
