import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const InfiniteParticles = ({ count = 200, color = '#FACC15', area = [10, 20, 10] }) => {
    const mesh = useRef();
    const lightMesh = useRef();

    // Create random initial positions and speeds
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * area[0];
            const y = (Math.random() - 0.5) * area[1]; // Height variance
            const z = (Math.random() - 0.5) * area[2];
            const speed = 0.02 + Math.random() * 0.05;
            const scale = 0.1 + Math.random() * 0.2;
            temp.push({ x, y, z, speed, scale, originalY: y });
        }
        return temp;
    }, [count, area]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            // Descend
            particle.y -= particle.speed;

            // Spiral effect around 0,0
            const time = state.clock.getElapsedTime();
            const radius = 3 + Math.sin(time * 0.5 + i) * 1; // Radius breathes
            const angle = time * 0.2 + (i * 0.1);

            // Wrap around logic
            const height = area[1];
            if (particle.y < -height / 2) {
                particle.y = height / 2;
            }

            // Update dummy object
            dummy.position.set(
                Math.cos(angle) * radius + particle.x * 0.2, // Spiral X
                particle.y,
                Math.sin(angle) * radius + particle.z * 0.2  // Spiral Z
            );

            // Rotate particle to face movement
            dummy.rotation.x = Math.sin(time + i);
            dummy.rotation.z = Math.cos(time + i);

            dummy.scale.set(particle.scale, particle.scale, particle.scale);
            dummy.updateMatrix();

            mesh.current.setMatrixAt(i, dummy.matrix);
        });

        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
                color={color}
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </instancedMesh>
    );
};

export default InfiniteParticles;
