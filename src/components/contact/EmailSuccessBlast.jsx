import React from 'react';
import { motion } from 'framer-motion';

const EmailSuccessBlast = ({ onComplete }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => setTimeout(onComplete, 3000)}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.9)',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
            }}
        >
            {/* Blast Shockwave */}
            <motion.div
                initial={{ scale: 0, opacity: 1, borderWidth: '50px' }}
                animate={{ scale: 4, opacity: 0, borderWidth: '0px' }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    position: 'absolute',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    border: '5px solid #00f0ff',
                }}
            />

            {/* Central Icon */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                style={{ fontSize: '10rem', marginBottom: '2rem' }}
            >
                📨
            </motion.div>

            {/* Text */}
            <motion.h2
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                    color: '#00f0ff',
                    fontFamily: 'var(--font-display)',
                    textTransform: 'uppercase',
                    fontSize: '3rem',
                    textShadow: '0 0 20px #00f0ff'
                }}
            >
                Transmission Sent
            </motion.h2>

            {/* Flying Particles (Simple implementation) */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, scale: 0 }}
                    animate={{
                        x: (Math.random() - 0.5) * 1000,
                        y: (Math.random() - 0.5) * 1000,
                        scale: [0, 1, 0]
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{
                        position: 'absolute',
                        fontSize: '2rem'
                    }}
                >
                    ✉️
                </motion.div>
            ))}
        </motion.div>
    );
};

export default EmailSuccessBlast;
