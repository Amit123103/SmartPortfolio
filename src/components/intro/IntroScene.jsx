import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

import City from './City';
import SpiderHero from './SpiderHero';
import WebOverlay from './WebOverlay';
import SymbolReveal from './SymbolReveal';
import { soundManager } from '../../audio/SoundManager';

const SceneContent = ({ onComplete }) => {
    const cameraRef = useRef();
    const heroRef = useRef();
    const timeRef = useRef(0);

    // States: CITY, JUMP, WEB, SILHOUETTE, HOME
    const [phase, setPhase] = useState('CITY');
    const [webTriggered, setWebTriggered] = useState(false);

    useEffect(() => {
        try { soundManager.playWind(); } catch (e) { console.warn(e); }

        // Failsafe: Force complete after 12s
        const timer = setTimeout(onComplete, 12000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    useFrame((state, delta) => {
        timeRef.current += delta;
        const t = timeRef.current;
        if (!cameraRef.current) return;

        // 1. CITY ESTABLISH (0-2s)
        if (t < 2.0) {
            cameraRef.current.position.set(0, 40, 50 - t * 2);
            cameraRef.current.lookAt(0, 30, 0);
        }

        // 2. HERO JUMP (2-5s)
        else if (t < 5.0) {
            setPhase('JUMP');
            const jumpT = t - 2.0;
            if (heroRef.current) {
                // Parabolic Arc
                heroRef.current.position.x = THREE.MathUtils.lerp(0, -10, jumpT / 3);
                heroRef.current.position.y = 30 + Math.sin((jumpT / 3) * Math.PI) * 10;
                heroRef.current.position.z = THREE.MathUtils.lerp(0, -20, jumpT / 3);
                heroRef.current.rotation.x = jumpT * Math.PI * 2; // Flip
            }
            // Chase Camera
            cameraRef.current.position.set(
                THREE.MathUtils.lerp(0, -10, jumpT / 3) + 10,
                THREE.MathUtils.lerp(40, 45, jumpT / 3),
                THREE.MathUtils.lerp(40, 0, jumpT / 3)
            );
            if (heroRef.current) cameraRef.current.lookAt(heroRef.current.position);
        }

        // 3. WEB SHOT (5-7s)
        else if (t < 7.0) {
            setPhase('WEB');
            if (!webTriggered) { setWebTriggered(true); try { soundManager.playThwip(); } catch (e) { } }
            // Hero freezes or aims at camera
            if (heroRef.current) heroRef.current.lookAt(cameraRef.current.position);
        }

        // 4. HERO SILHOUETTE REVEAL (7-9s)
        else if (t < 9.0) {
            setPhase('SILHOUETTE');
            // Camera pulls back slowly
            cameraRef.current.position.z += delta * 2;
        }

        // 5. TRANSITION TO HOME (9s+)
        else {
            if (phase !== 'HOME') {
                setPhase('HOME');
                onComplete();
            }
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 40, 50]} fov={75} />
            <ambientLight intensity={0.6} />
            <pointLight position={[20, 50, 20]} intensity={2} color="#4a95db" />
            <pointLight position={[-20, 20, -20]} intensity={1.5} color="#ff4449" />
            <Stars radius={200} depth={50} count={3000} factor={4} fade />
            <fog attach="fog" args={['#101025', 10, 100]} />

            <City />

            <group ref={heroRef} position={[0, 30, 0]}>
                <SpiderHero action={phase === 'JUMP' ? 'JUMP' : 'IDLE'} />
            </group>
        </>
    );
};

const IntroScene = ({ onComplete }) => {
    const [revealWeb, setRevealWeb] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Web Overlay Timing (Syncs with Phase 3)
    useEffect(() => {
        const t1 = setTimeout(() => setRevealWeb(true), 5000);
        const t2 = setTimeout(() => setRevealWeb(false), 8000); // slightly longer dissolve
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    if (hasError) {
        onComplete();
        return null;
    }

    return (
        <motion.div
            className="canvas-container"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.0 } }}
            style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                zIndex: 9999, background: 'black', pointerEvents: 'auto'
            }}
        >
            <Canvas
                shadows
                onError={() => setHasError(true)}
                onCreated={({ gl }) => { gl.domElement.id = "intro-canvas"; }}
            >
                <Suspense fallback={null}>
                    <SceneContent onComplete={onComplete} />
                </Suspense>
            </Canvas>

            <WebOverlay active={revealWeb} />

            <button
                onClick={onComplete}
                aria-label="Skip Intro"
                style={{
                    position: 'absolute', bottom: '15vh', right: '5vw',
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.4)',
                    color: 'white', padding: '12px 24px', fontSize: '14px',
                    zIndex: 1000, cursor: 'pointer', fontFamily: 'monospace',
                    textTransform: 'uppercase', letterSpacing: '2px'
                }}
            >
                Skip Intro
            </button>
        </motion.div>
    );
};

export default IntroScene;
