import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import gsap from 'gsap';
import styles from './CosmicJourney.module.css';
import { soundManager } from '../../audio/SoundManager';
import { musicEngine } from '../../audio/MusicEngine';

import profileImg from '../../assets/profile.png';
// --- SHADERS & MATERIALS ---
const EarthMaterial = new THREE.MeshStandardMaterial({
    color: '#1a365d',
    roughness: 0.6,
    metalness: 0.1,
    emissive: '#0c1a2b',
    emissiveIntensity: 0.5,
    wireframe: false
});

const DigitalEarthMaterial = new THREE.MeshBasicMaterial({
    color: '#00f0ff',
    wireframe: true,
    transparent: true,
    opacity: 0.3
});

const AtmosphereMaterial = new THREE.MeshBasicMaterial({
    color: '#4fc3f7',
    transparent: true,
    opacity: 0.1,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending
});

// --- COMPONENTS ---
const Earth = ({ phase }) => {
    const meshRef = useRef();
    const atmosphereRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05; // Gentle rotation
        }
    });

    // Morph to digital wireframe in phase 'DIGITAL'
    useEffect(() => {
        if (meshRef.current) {
            if (phase === 'DIGITAL') {
                gsap.to(meshRef.current.material, {
                    opacity: 0,
                    duration: 1,
                    onComplete: () => {
                        meshRef.current.material = DigitalEarthMaterial;
                        gsap.to(meshRef.current.material, { opacity: 0.4, duration: 2 });
                    }
                });
            }
        }
    }, [phase]);

    return (
        <group>
            {/* Main Planet */}
            <mesh ref={meshRef} material={EarthMaterial}>
                <sphereGeometry args={[10, 64, 64]} />
            </mesh>

            {/* Atmosphere Glow */}
            <mesh ref={atmosphereRef} scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[10, 64, 64]} />
                <meshBasicMaterial
                    color="#4fc3f7"
                    transparent
                    opacity={0.15}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
};

const SceneController = ({ setPhase, onComplete }) => {
    const cameraRef = useRef();
    const timeline = useRef(null);

    useFrame((state) => {
        // Optional: Manual smoothing if GSAP isn't enough, but GSAP handles camera position well.
    });

    useEffect(() => {
        if (!cameraRef.current) return;

        const cam = cameraRef.current;

        // --- SEQUENCE TIMELINE ---

        // 1. COSMIC STEP 1: FOCUS LOCK (Start to 2s)
        // Already positioned at [0, 20, 40], looking at [0,0,0]

        // 2. COSMIC STEP 2: ORBITAL DESCENT (2s to 6s)
        // 1. WELCOME SEQUENCE (0-4s)

        // 2. COSMIC STEP 2: ORBITAL DESCENT (4s to 8s)
        const t1 = setTimeout(() => {
            setPhase('DESCENT');
            gsap.to(cam.position, {
                x: 0, y: 5, z: 18, // Move closer to Earth
                duration: 4,
                ease: "power2.inOut"
            });
        }, 4000);

        // 3. COSMIC STEP 3: DIGITAL TRANSFORMATION (8s)
        const t2 = setTimeout(() => {
            setPhase('DIGITAL');
        }, 8000);

        // 4. COSMIC STEP 4: IDENTITY EMERGENCE (9s)
        const t3 = setTimeout(() => {
            setPhase('IDENTITY');
        }, 9000);

        // 5. COSMIC STEP 6: TRANSITION TO HOME (14s via onComplete)
        const t4 = setTimeout(() => {
            onComplete();
        }, 14000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, []);

    return (
        <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 20, 60]} fov={45} />
    );
};

// --- MAIN COMPONENT ---
const CosmicJourney = ({ onComplete }) => {
    const [phase, setPhase] = useState('ORBIT'); // ORBIT, DESCENT, DIGITAL, IDENTITY
    const [welcomeIndex, setWelcomeIndex] = useState(-1);
    const welcomeWords = ["Welcome", "to", "My", "Creation", "World"];

    useEffect(() => {
        // Audio Init
        soundManager.playLaunch();
        musicEngine.startAmbient();

        // Word sequence logic
        const wordDelays = [500, 1200, 1600, 2100, 2900]; // Appearance times

        const timers = wordDelays.map((delay, index) => {
            return setTimeout(() => setWelcomeIndex(index), delay);
        });

        // Hide welcome text before descent
        const hideTimer = setTimeout(() => setWelcomeIndex(-1), 3800);

        return () => {
            timers.forEach(clearTimeout);
            clearTimeout(hideTimer);
            musicEngine.stop(); // Optional: Stop ambient when component unmounts
        };
    }, []);

    // Phase Audio Triggers
    useEffect(() => {
        if (phase === 'DESCENT') {
            soundManager.playWarp();
        } else if (phase === 'DIGITAL') {
            soundManager.playLockOn();
        }
    }, [phase]);

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            onClick={() => {
                // Ensure audio context is resumed on interaction
                soundManager.init();
                musicEngine.startAmbient();
            }}
        >
            <Canvas>
                <Suspense fallback={null}>
                    <SceneController setPhase={setPhase} onComplete={onComplete} />

                    <ambientLight intensity={0.2} />
                    <pointLight position={[50, 50, 50]} intensity={1.5} color="#ffffff" />
                    <pointLight position={[-50, 20, -50]} intensity={0.5} color="#4fc3f7" />

                    <Stars radius={300} depth={100} count={5000} factor={4} saturation={0} fade speed={phase === 'DIGITAL' ? 0.5 : 1} />

                    <group position={[0, -5, 0]}>
                        <Earth phase={phase} />
                    </group>
                </Suspense>
            </Canvas>

            {/* Welcome Text Overlay */}
            <AnimatePresence mode="wait">
                {welcomeIndex >= 0 && phase === 'ORBIT' && (
                    <div className={styles.welcomeContainer}>
                        <motion.h1
                            key={welcomeIndex}
                            className={styles.welcomeText}
                            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)', transition: { duration: 0.2 } }}
                            transition={{ duration: 0.5 }}
                        >
                            {welcomeWords[welcomeIndex]}
                        </motion.h1>
                    </div>
                )}
            </AnimatePresence>

            {/* UI Overlay */}
            <AnimatePresence>
                {phase === 'IDENTITY' && (
                    <motion.div
                        className={styles.identityPanel}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        {/* Panel Glow Background (CSS) */}
                        <div className={styles.panelGlow} />

                        <motion.img
                            src={profileImg}
                            alt="Profile"
                            className={styles.profileImage}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        />

                        <div>
                            <motion.h1
                                className={styles.name}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                            >
                                Amit Kumar
                            </motion.h1>
                            <motion.p
                                className={styles.role}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5, duration: 1 }}
                            >
                                Developer · Intelligent Systems · Continuous Growth
                            </motion.p>
                        </div>

                        <motion.div
                            className={styles.introText}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.5, duration: 1.5 }}
                        >
                            <p>
                                “I design systems that think, adapt, and grow —<br />
                                <span className={styles.highlight}>both in code and in myself.</span>”
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button className={styles.skipBtn} onClick={onComplete}>
                Snap to Reality
            </button>
        </motion.div>
    );
};

export default CosmicJourney;
