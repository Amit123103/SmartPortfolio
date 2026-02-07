import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageTransition } from '../../context/TransitionContext';
import JetScene from './JetScene';
import { MissionText, HUDOverlay } from './HUDOverlay';

const CinematicTransition = () => {
    const { isAnimating, transitionStage, currentMission } = usePageTransition();

    if (!isAnimating) return null;

    const isWarping = transitionStage === 'warp';

    return (
        <AnimatePresence>
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
                    zIndex: 9999,
                    background: '#000'
                }}
            >
                {/* 3D Scene */}
                <div style={{ position: 'absolute', inset: 0 }}>
                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                        <Suspense fallback={null}>
                            <JetScene isWarping={isWarping} color={currentMission.color} />
                        </Suspense>
                    </Canvas>
                </div>

                {/* UI Layers */}
                <MissionText
                    text={currentMission.text}
                    color={currentMission.color}
                    stage={transitionStage}
                />

                <HUDOverlay
                    color={currentMission.color}
                    isWarping={isWarping}
                />

                {/* Loading Bar at bottom */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '8px',
                    background: '#222'
                }}>
                    <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 4.5, ease: "linear" }}
                        style={{
                            height: '100%',
                            background: currentMission.color,
                            boxShadow: `0 0 20px ${currentMission.color}`
                        }}
                    />
                </div>

            </motion.div>
        </AnimatePresence>
    );
};

export default CinematicTransition;
