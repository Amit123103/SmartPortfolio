import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FlowSystem = ({ count = 200 }) => {
    const mesh = useRef();

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                x: (Math.random() - 0.5) * 10,
                y: (Math.random() - 0.5) * 10,
                z: (Math.random() - 0.5) * 10,
                speed: 0.02
            });
        }
        return temp;
    }, [count]);

    useFrame(() => {
        if (!mesh.current) return;
        particles.forEach((p, i) => {
            p.y -= p.speed;
            if (p.y < -5) p.y = 5;
            dummy.position.set(p.x, p.y, p.z);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <planeGeometry args={[0.2, 0.2]} />
            <meshBasicMaterial color="#4ADE80" />
        </instancedMesh>
    );
};

export default FlowSystem;
