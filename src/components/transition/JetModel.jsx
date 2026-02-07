import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const JetModel = ({ phase }) => {
    const engineRef = useRef();

    // Flicker effect for engine
    useFrame((state) => {
        if (engineRef.current) {
            const intensity = phase === 'WARP' ? 2 + Math.random() : 0.8 + Math.random() * 0.2;
            engineRef.current.intensity = intensity;
        }
    });

    const bodyColor = "#1e293b"; // Dark Slate
    const wingColor = "#334155"; // Slate
    const cockpitColor = "#0ea5e9"; // Sky Blue
    const engineGlow = phase === 'WARP' ? "#00ffff" : "#f97316";

    return (
        <group scale={[0.5, 0.5, 0.5]} rotation={[0, Math.PI, 0]}>
            {/* Fuselage Main */}
            <mesh position={[0, 0, 0.5]}>
                <coneGeometry args={[0.8, 5, 8]} />
                <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Cockpit */}
            <mesh position={[0, 0.5, 1]} rotation={[-0.2, 0, 0]}>
                <capsuleGeometry args={[0.35, 1.2, 4, 8]} />
                <meshPhysicalMaterial
                    color={cockpitColor}
                    transmission={0.6}
                    opacity={0.8}
                    metalness={0.9}
                    roughness={0.1}
                    transparent
                />
            </mesh>

            {/* Main Wings */}
            <group position={[0, 0, 0.5]}>
                <mesh position={[1.5, -0.2, 0.5]} rotation={[Math.PI / 2, 0, -0.2]}>
                    <boxGeometry args={[2.5, 1.5, 0.1]} />
                    <meshStandardMaterial color={wingColor} roughness={0.5} metalness={0.6} />
                </mesh>
                <mesh position={[-1.5, -0.2, 0.5]} rotation={[Math.PI / 2, 0, 0.2]}>
                    <boxGeometry args={[2.5, 1.5, 0.1]} />
                    <meshStandardMaterial color={wingColor} roughness={0.5} metalness={0.6} />
                </mesh>
            </group>

            {/* Tail Fins */}
            <group position={[0, 0.5, -1.8]}>
                <mesh position={[0.6, 0.5, 0]} rotation={[0, 0, 0.3]}>
                    <boxGeometry args={[0.1, 1.5, 1]} />
                    <meshStandardMaterial color={wingColor} />
                </mesh>
                <mesh position={[-0.6, 0.5, 0]} rotation={[0, 0, -0.3]}>
                    <boxGeometry args={[0.1, 1.5, 1]} />
                    <meshStandardMaterial color={wingColor} />
                </mesh>
            </group>

            {/* Rear Engine */}
            <group position={[0, 0, -2]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.4, 0.6, 1, 16, 1, true]} />
                    <meshStandardMaterial color="#0f172a" side={THREE.DoubleSide} />
                </mesh>
                {/* Glow Core */}
                <mesh position={[0, 0, -0.2]}>
                    <sphereGeometry args={[0.35]} />
                    <meshBasicMaterial color={engineGlow} />
                </mesh>
                <pointLight ref={engineRef} color={engineGlow} distance={5} decay={2} />
            </group>

            {/* Missiles (Decorative) */}
            <mesh position={[2, -0.3, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 1.5]} />
                <meshStandardMaterial color="#475569" />
            </mesh>
            <mesh position={[-2, -0.3, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 1.5]} />
                <meshStandardMaterial color="#475569" />
            </mesh>
        </group>
    );
};

export default JetModel;
