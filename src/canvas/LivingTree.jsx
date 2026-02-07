import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const LivingTree = () => {
    const mesh = useRef();

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <mesh ref={mesh} position={[0, -5, 0]}>
            <cylinderGeometry args={[1, 3, 16, 32]} />
            <meshStandardMaterial color="#2E8B57" wireframe={false} />
        </mesh>
    );
};

export default LivingTree;
