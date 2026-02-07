import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SocialTransition = ({ platform, color, onComplete }) => {
    const [muzzleFlash, setMuzzleFlash] = useState(false);

    useEffect(() => {
        // Sequence: Run (0-1.5s) -> Fire (1.5s) -> Complete (1.8s)
        const fireTimer = setTimeout(() => {
            setMuzzleFlash(true);
        }, 1200);

        const completeTimer = setTimeout(() => {
            onComplete();
        }, 1400);

        return () => {
            clearTimeout(fireTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: '#050505',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
        >
            {/* Cinematic Platform Text */}
            <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0.2 }}
                style={{
                    color: color,
                    fontFamily: 'Impact, sans-serif',
                    fontSize: '15vw',
                    textTransform: 'uppercase',
                    position: 'absolute',
                    zIndex: 1
                }}
            >
                {platform}
            </motion.h1>

            {/* Army Man Silhouette (SVG) */}
            <motion.div
                initial={{ x: '-100vw' }}
                animate={{ x: '0vw' }}
                transition={{ duration: 1.2, ease: "linear" }}
                style={{
                    position: 'absolute',
                    bottom: '0',
                    height: '60vh',
                    width: '40vh',
                    zIndex: 2
                }}
            >
                <svg viewBox="0 0 100 200" fill="black">
                    {/* Simplified Soldier Silhouette */}
                    <path d="M40,20 C40,10 50,10 50,20 L50,30 L70,50 L60,80 L50,60 L50,100 L70,140 L60,190 L40,140 L20,190 L10,140 L30,100 L30,60 L10,50 L20,30 L40,30 Z" />
                    {/* Gun */}
                    <rect x="50" y="55" width="60" height="5" />
                </svg>
            </motion.div>

            {/* Muzzle Flash */}
            <AnimatePresence>
                {muzzleFlash && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: [1, 5, 1] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            width: '100vw',
                            height: '100vh',
                            background: 'white',
                            zIndex: 10
                        }}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SocialTransition;
