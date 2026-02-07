import React from 'react';
import { motion } from 'framer-motion';

const WebOverlay = ({ active, onReveal }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 50,
                pointerEvents: 'none',
                background: 'radial-gradient(circle at center, transparent 20%, white 120%)',
                mixBlendMode: 'screen'
            }}
        >
            {/* Procedural Web Lines (SVG) */}
            {active && (
                <svg width="100%" height="100%" style={{ position: 'absolute' }}>
                    {[...Array(20)].map((_, i) => (
                        <motion.line
                            key={i}
                            x1="50%" y1="50%"
                            x2={`${Math.random() * 100}%`} y2={`${Math.random() * 100}%`}
                            stroke="white"
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: Math.random() * 0.2 }}
                        />
                    ))}
                    {/* Concentric Rings */}
                    {[...Array(5)].map((_, i) => (
                        <motion.circle
                            key={`c-${i}`}
                            cx="50%" cy="50%"
                            r={`${(i + 1) * 10}%`}
                            stroke="white"
                            strokeWidth="1"
                            fill="none"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.5 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        />
                    ))}
                </svg>
            )}

            {/* Flash Effect */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: active ? [0, 1, 0] : 0 }}
                transition={{ duration: 0.2, times: [0, 0.1, 1] }}
                style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'white'
                }}
            />
        </motion.div>
    );
};

export default WebOverlay;
