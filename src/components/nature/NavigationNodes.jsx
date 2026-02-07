import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';

const NavNode = ({ position, label, route, color = '#4ADE80' }) => {
    const mesh = useRef();
    const [hovered, setHover] = useState(false);
    const navigate = useNavigate();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Float animation
        mesh.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
        // Rotate slowly
        mesh.current.rotation.y += 0.01;

        // Scale on hover
        const targetScale = hovered ? 1.5 : 1;
        mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    });

    const handleClick = () => {
        // Navigate
        navigate(route);
    };

    return (
        <group position={[position[0], position[1], position[2]]}>
            {/* Glow Sphere */}
            <mesh
                ref={mesh}
                onClick={handleClick}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
                onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); }}
            >
                <icosahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial
                    color={hovered ? '#fff' : color}
                    emissive={color}
                    emissiveIntensity={hovered ? 2 : 0.5}
                    wireframe
                />
            </mesh>

            {/* Label - Always visible facing camera */}
            <Text
                position={[0.6, 0, 0]}
                fontSize={0.3}
                color={hovered ? "#FACC15" : "white"}
                anchorX="left"
                anchorY="middle"
            >
                {label}
            </Text>

            {/* Connection Line to 'Trunk' (x=0) */}
            <line>
                <bufferGeometry>
                    <float32BufferAttribute
                        attach="attributes-position"
                        count={2}
                        array={new Float32Array([0, 0, 0, -position[0], 0, -position[2]])}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color={color} transparent opacity={0.3} />
            </line>
        </group>
    );
};

const NavigationNodes = () => {
    // Spiral positions for nodes
    return (
        <group>
            <NavNode position={[2, 2, 0]} label="Home" route="/" color="#4ADE80" />
            <NavNode position={[1.5, 0.5, 1.5]} label="About" route="/journey" color="#A7F3D0" />
            <NavNode position={[0, -1, 2]} label="Projects" route="/projects" color="#FACC15" />
            <NavNode position={[-1.5, -2.5, 1.5]} label="Skills" route="/skills" color="#99F6E4" />
            <NavNode position={[-2, -4, 0]} label="Contact" route="/contact" color="#FF6B6B" />
        </group>
    );
};

export default NavigationNodes;
