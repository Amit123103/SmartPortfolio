import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WebShooter = ({ active }) => {
    const lines = useMemo(() => {
        const temp = [];
        const count = 20;
        for (let i = 0; i < count; i++) {
            temp.push({
                offset: Math.random() * 0.5,
                speed: 1 + Math.random(),
                direction: new THREE.Vector3((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, -10).normalize()
            });
        }
        return temp;
    }, []);

    const groupRef = useRef();

    useFrame((state, delta) => {
        if (!active || !groupRef.current) return;

        groupRef.current.children.forEach((child, i) => {
            const data = lines[i];
            // Animate scale/position to shoot outwards
            child.scale.z += data.speed * delta * 20;
            child.material.opacity = Math.min(child.title + delta * 5, 1);
        });
    });

    if (!active) return null;

    return (
        <group ref={groupRef} position={[0, 0, -1]}>
            {/* Attached to camera approx */}
            {lines.map((data, i) => (
                <mesh key={i} rotation={[0, 0, 0]} position={[0, -2, 0]}> {/* From bottom center-ish */}
                    {/* Simplified web strand as a thin cylinder/tube */}
                    <cylinderGeometry args={[0.02, 0.05, 1, 8]} />
                    <meshBasicMaterial color="white" transparent opacity={0.8} />
                </mesh>
            ))}
            {/* Adding 2D style webs logic might be better as Overlay for the transition */}
        </group>
    );
};

export default WebShooter;
