import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

const Node = ({ position, label, route, navigate }) => {
    const mesh = useRef();
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        mesh.current.rotation.y += 0.01;
        const scale = hovered ? 1.5 : 1;
        mesh.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    });

    const handleHover = (status) => {
        document.body.style.cursor = status ? 'pointer' : 'auto';
        setHover(status);
    };

    return (
        <group position={position}>
            <mesh
                ref={mesh}
                onClick={() => navigate(route)}
                onPointerOver={() => handleHover(true)}
                onPointerOut={() => handleHover(false)}
            >
                <icosahedronGeometry args={[0.4, 0]} />
                <meshStandardMaterial
                    color={hovered ? "#ffffff" : "#4ADE80"}
                    emissive="#4ADE80"
                    emissiveIntensity={hovered ? 2 : 0.5}
                    wireframe
                />
            </mesh>
            <Text position={[0.8, 0, 0]} fontSize={0.3} color="white" anchorX="left" anchorY="middle">
                {label}
            </Text>
        </group>
    );
};

const NavNodes = ({ navigate }) => {
    // If passed from parent (World.jsx), use it. Else try to get it (though World handles it best)
    // World.jsx is updated to pass navigate.
    return (
        <group>
            <Node position={[2, 2, 0]} label="Home" route="/" navigate={navigate} />
            <Node position={[1.5, 0.5, 1.5]} label="About" route="/journey" navigate={navigate} />
            <Node position={[0, -1, 2]} label="Projects" route="/projects" navigate={navigate} />
            <Node position={[-1.5, -2, 1.5]} label="Contact" route="/contact" navigate={navigate} />
        </group>
    );
};

export default NavNodes;
