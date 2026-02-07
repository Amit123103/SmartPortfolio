import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCinematic } from '../../context/CinematicContext';
import RadarSystem from './RadarSystem';
import MissionText from './MissionText';
import { soundManager } from '../../audio/SoundManager';

const HUDOverlay = () => {
    const { isTransitioning, phase, missionText, sectionColor } = useCinematic();

    if (!isTransitioning) return null;

    // Trigger sounds based on component mount/phase (handled in Context, but nice to sync here visually)

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            zIndex: 10000, pointerEvents: 'none',
            fontFamily: 'monospace' // Default fallback
        }}>
            <AnimatePresence>
                {/* 1. Black Bg Fade */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase === 'EXIT' ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        background: 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)' // Vignette
                    }}
                />

                {/* 2. Top Bar (Status) */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    style={{
                        position: 'absolute', top: '2rem', left: '0', width: '100%',
                        display: 'flex', justifyContent: 'center', gap: '2rem',
                        color: 'white', fontSize: '10px', letterSpacing: '2px'
                    }}
                >
                    <span>SYS: ONLINE</span>
                    <span style={{ color: sectionColor }}>MOD: CINEMATIC</span>
                    <span>T: {new Date().toLocaleTimeString()}</span>
                </motion.div>

                {/* 3. Mission Text (Center) */}
                {(phase === 'BRIEFING' || phase === 'LOCK_ON' || phase === 'LAUNCH') && (
                    <MissionText text={missionText} color={sectionColor} />
                )}

                {/* 4. Radar (Bottom Left) */}
                {(phase === 'BRIEFING' || phase === 'LOCK_ON' || phase === 'LAUNCH' || phase === 'WARP') && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring' }}
                    >
                        <RadarSystem phase={phase} color={sectionColor} />
                    </motion.div>
                )}

                {/* 5. Speed/Warp Indicator (Bottom Right) */}
                {(phase === 'LAUNCH' || phase === 'WARP') && (
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        style={{
                            position: 'absolute', bottom: '2rem', right: '2rem',
                            textAlign: 'right', color: sectionColor
                        }}
                    >
                        <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                            {phase === 'WARP' ? 'HYPER' : 'MACH 3'}
                        </div>
                        <div style={{ fontSize: '1rem', letterSpacing: '4px' }}>SPEED</div>

                        {/* Bars */}
                        <div style={{ display: 'flex', gap: '2px', justifyContent: 'flex-end', marginTop: '5px' }}>
                            {[...Array(10)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: phase === 'WARP' ? [10, 30, 10] : 10 }}
                                    transition={{ repeat: Infinity, delay: i * 0.05 }}
                                    style={{ width: '5px', height: '10px', background: sectionColor }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* 6. Target Lock Reticle (Center) */}
                {(phase === 'LOCK_ON' || phase === 'LAUNCH') && (
                    <motion.div
                        initial={{ scale: 2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, rotate: [0, 90, 0] }}
                        exit={{ scale: 0, opacity: 0 }}
                        style={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            width: '300px', height: '300px',
                            border: `1px dashed ${sectionColor}`,
                            borderRadius: '50%',
                            boxShadow: `0 0 20px ${sectionColor}40`,
                            zIndex: 10001
                        }}
                    >
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            width: '20px', height: '20px', background: sectionColor, borderRadius: '50%'
                        }} />
                        <div style={{
                            position: 'absolute', bottom: '-20px', width: '100%', textAlign: 'center',
                            color: sectionColor, fontSize: '12px', letterSpacing: '2px'
                        }}>
                            LOCKING TARGET...
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
};

export default HUDOverlay;
