import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RadarSystem = ({ phase, color }) => {
    const [targets, setTargets] = useState([]);

    // Generate random targets on mount
    useEffect(() => {
        const newTargets = Array.from({ length: 5 }).map(() => ({
            id: Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2
        }));
        setTargets(newTargets);
    }, []);

    const isLocked = phase === 'LOCK_ON' || phase === 'LAUNCH' || phase === 'WARP';

    return (
        <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '2rem',
            width: '150px',
            height: '150px',
            border: `2px solid ${color || 'rgba(0, 255, 255, 0.3)'}`,
            borderRadius: '50%',
            background: 'rgba(0, 20, 40, 0.5)',
            overflow: 'hidden',
            boxShadow: `0 0 15px ${color}40`,
            backdropFilter: 'blur(2px)'
        }}>
            {/* Grid Rings */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '66%', height: '66%', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%'
            }} />
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '33%', height: '33%', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%'
            }} />

            {/* Crosshair */}
            <div style={{
                position: 'absolute', top: '50%', left: 0, width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)'
            }} />
            <div style={{
                position: 'absolute', left: '50%', top: 0, height: '100%', width: '1px', background: 'rgba(255,255,255,0.1)'
            }} />

            {/* Sweep Line */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute', top: '50%', left: '50%', width: '50%', height: '2px',
                    background: `linear-gradient(90deg, transparent, ${color})`,
                    transformOrigin: 'left center'
                }}
            />

            {/* Targets */}
            {targets.map((t) => (
                <motion.div
                    key={t.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                    style={{
                        position: 'absolute',
                        left: `${t.x}%`,
                        top: `${t.y}%`,
                        width: `${t.size}px`,
                        height: `${t.size}px`,
                        background: isLocked ? 'red' : 'white',
                        borderRadius: '50%'
                    }}
                />
            ))}

            {/* Status Text */}
            <div style={{
                position: 'absolute', bottom: '5px', width: '100%', textAlign: 'center',
                fontSize: '8px', color: color, fontFamily: 'monospace', textShadow: `0 0 5px ${color}`
            }}>
                {isLocked ? 'TARGET LOCKED' : 'SCANNING...'}
            </div>
        </div>
    );
};

export default RadarSystem;
