import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SymbolReveal = ({ active }) => {
    const group = useRef();

    useFrame((state) => {
        if (!active || !group.current) return;
        const t = state.clock.getElapsedTime();

        // Gentle float
        group.current.rotation.y = Math.sin(t * 0.5) * 0.1;
        group.current.rotation.z = Math.cos(t * 0.3) * 0.05;

        // Pulse scale
        const scale = 1 + Math.sin(t * 2) * 0.05;
        group.current.scale.set(scale, scale, scale);
    });

    if (!active) return null;

    return (
        <group ref={group} position={[0, 0, -5]}>
            {/* The Spider Symbol (Stylized) */}
            {/* Body */}
            <mesh position={[0, 0, 0]}>
                <circleGeometry args={[1, 32]} />
                <meshBasicMaterial color="#ef4444" transparent opacity={0.9} />
            </mesh>

            {/* Legs (Stylized Lines) */}
            {[...Array(8)].map((_, i) => (
                <mesh key={i} rotation={[0, 0, (i * Math.PI) / 4]} position={[0, 0, -0.1]}>
                    <planeGeometry args={[0.2, 4]} />
                    <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
                </mesh>
            ))}

            {/* Glow Halo */}
            <mesh position={[0, 0, -0.2]}>
                <circleGeometry args={[2.5, 32]} />
                <meshBasicMaterial color="#ef4444" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
            </mesh>
        </group>
    );
};

export default SymbolReveal;
