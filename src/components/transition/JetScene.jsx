import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import JetModel from './JetModel';

// Basic particle system for space dust / Warp lines
const WarpParticles = ({ phase }) => {
    const count = phase === 'WARP' ? 2000 : 500;
    const mesh = useRef();

    // Create random positions
    // In a real app we'd use useMemo for stable particles, but simple is ok for now.
    // However, to make it "AAA" let's cache geometric data.
    const [positions, speeds] = React.useMemo(() => {
        const pos = new Float32Array(2000 * 3);
        const spd = new Float32Array(2000);
        for (let i = 0; i < 2000; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 100; // Deep depth
            spd[i] = Math.random() * 0.5 + 0.1;
        }
        return [pos, spd];
    }, []);

    useFrame((state) => {
        if (!mesh.current) return;

        const speedMultiplier = phase === 'WARP' ? 20 : (phase === 'LAUNCH' ? 5 : 0.5);
        const positionsAttribute = mesh.current.geometry.attributes.position;

        for (let i = 0; i < count; i++) {
            let z = positionsAttribute.array[i * 3 + 2];
            z += speeds[i] * speedMultiplier;

            if (z > 10) {
                z = -100; // Reset far back
            }
            positionsAttribute.array[i * 3 + 2] = z;
        }
        positionsAttribute.needsUpdate = true;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={positions.length / 3}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={phase === 'WARP' ? 0.3 : 0.1}
                color={phase === 'WARP' ? "#00FFFF" : "white"}
                transparent
                opacity={0.8}
            />
        </points>
    );
};

const JetScene = ({ phase }) => {
    const group = useRef();

    useFrame((state) => {
        if (!group.current) return;
        const time = state.clock.getElapsedTime();

        // 1. Base Float
        let targetY = Math.sin(time * 1.5) * 0.1;
        let targetX = Math.cos(time * 1) * 0.1;
        let targetZ = 0;
        let rotZ = Math.sin(time) * 0.05; // Gentle banking

        // 2. Phase-specific animation overrides
        if (phase === 'BRIEFING') {
            // Fly in from distance
            // handled by context timing usually, but let's add subtle drift
        } else if (phase === 'LOCK_ON') {
            // Shake slightly
            targetX += (Math.random() - 0.5) * 0.05;
            targetY += (Math.random() - 0.5) * 0.05;
        } else if (phase === 'LAUNCH') {
            // Pull back before launch (anticipation)
            targetZ = -0.5;
            // More shake
            targetX += (Math.random() - 0.5) * 0.1;
            targetY += (Math.random() - 0.5) * 0.1;
        } else if (phase === 'WARP') {
            // Forward but shake vigorously
            targetZ = -2;
            targetX += (Math.random() - 0.5) * 0.2;
            targetY += (Math.random() - 0.5) * 0.2;
            rotZ += (Math.random() - 0.5) * 0.1;
        } else if (phase === 'EXIT') {
            // Fly out fast
            targetZ = -50;
        }

        // Lerp positions for smoothness
        group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.1);
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.1);
        group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.1);

        // Banking
        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, rotZ, 0.1);
    });

    return (
        <>
            <group ref={group}>
                <JetModel phase={phase} />
            </group>

            <WarpParticles phase={phase} />

            {/* Dynamic Lighting */}
            <ambientLight intensity={0.2} />
            <pointLight
                position={[10, 10, 10]}
                intensity={phase === 'WARP' ? 2 : 1}
                color={phase === 'WARP' ? "#00ffff" : "white"}
            />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="orange" />
        </>
    );
};

export default JetScene;
