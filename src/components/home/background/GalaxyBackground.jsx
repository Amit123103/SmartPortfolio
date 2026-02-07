import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// 1. The Glowing Core
const Core = () => {
    return (
        <mesh>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshStandardMaterial
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={2}
                roughness={0.1}
            />
            <pointLight distance={20} intensity={5} color="#00ffff" />
        </mesh>
    );
};

// 2. Orbital Rings
const Ring = ({ radius, speed, rotation: initialRotation, color = "#444" }) => {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z += speed * 0.005;
            ref.current.rotation.x += speed * 0.001;
        }
    });

    return (
        <group rotation={initialRotation}>
            <mesh ref={ref}>
                <torusGeometry args={[radius, 0.02, 16, 100]} />
                <meshBasicMaterial color={color} transparent opacity={0.3} />
            </mesh>
        </group>
    );
};

// 3. Floating Particles (Data Nodes)
const Particles = ({ count = 200 }) => {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 5 + Math.random() * 15; // Radius between 5 and 20
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            p[i * 3] = r * Math.sin(phi) * Math.cos(theta); // x
            p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); // y
            p[i * 3 + 2] = r * Math.cos(phi); // z
        }
        return p;
    }, [count]);

    const ref = useRef();
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y = clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length / 3}
                    array={points}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#00ccff" transparent opacity={0.6} sizeAttenuation />
        </points>
    );
};

// 4. Scene Controller (Camera & Mouse)
const SceneController = () => {
    const groupRef = useRef();

    useFrame(({ mouse, camera }) => {
        // Parallax effect
        const targetX = mouse.x * 2;
        const targetY = mouse.y * 2;

        if (groupRef.current) {
            // Smooth lerp
            groupRef.current.rotation.y += (targetX * 0.1 - groupRef.current.rotation.y) * 0.05;
            groupRef.current.rotation.x += (-targetY * 0.1 - groupRef.current.rotation.x) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            <Core />
            <Ring radius={4} speed={1} rotation={[Math.PI / 3, 0, 0]} color="#0ff" />
            <Ring radius={7} speed={-0.8} rotation={[-Math.PI / 4, 0, 0]} color="#0088ff" />
            <Ring radius={10} speed={0.5} rotation={[0, Math.PI / 2, 0]} color="#ffffff" />
            <Particles />
        </group>
    );
};

const GalaxyBackground = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none', background: '#030305' }}>
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 15]} />
                <ambientLight intensity={0.2} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                    <SceneController />
                </Float>
                <fog attach="fog" args={['#030305', 10, 40]} />
            </Canvas>
            {/* Gradient Overlay to blend bottom */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '40%',
                background: 'linear-gradient(to top, #030305, transparent)',
                zIndex: 1
            }} />
        </div>
    );
};

export default GalaxyBackground;
