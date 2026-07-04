import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const Planet = ({ orbitRadius, speed, size, color }) => {
    const planetRef = useRef();
    
    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        // Orbit rotation
        if (planetRef.current) {
            planetRef.current.position.x = Math.cos(elapsedTime * speed) * orbitRadius;
            planetRef.current.position.z = Math.sin(elapsedTime * speed) * orbitRadius;
            // Axis rotation
            planetRef.current.rotation.y += 0.01;
        }
    });

    // Create orbit path
    const points = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * orbitRadius, 0, Math.sin(theta) * orbitRadius));
    }
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        <group>
            {/* Orbit Path */}
            <line geometry={lineGeometry}>
                <lineBasicMaterial attach="material" color="#ffffff" transparent opacity={0.1} linewidth={1} />
            </line>
            
            {/* Planet */}
            <mesh ref={planetRef}>
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
            </mesh>
        </group>
    );
};

const Sun = () => {
    const sunRef = useRef();

    useFrame(() => {
        if (sunRef.current) {
            sunRef.current.rotation.y += 0.002;
        }
    });

    return (
        <group>
            <pointLight position={[0, 0, 0]} intensity={2.5} color="#ffddaa" distance={200} decay={1.5} />
            <mesh ref={sunRef}>
                <sphereGeometry args={[2.5, 64, 64]} />
                <meshBasicMaterial color="#ffaa00" />
            </mesh>
            {/* Sun Glow */}
            <mesh scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshBasicMaterial color="#ff5500" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
            </mesh>
        </group>
    );
};

const SceneCamera = () => {
    useFrame(({ camera, clock }) => {
        // Slow pan and tilt for cinematic effect
        const time = clock.getElapsedTime();
        camera.position.x = Math.sin(time * 0.05) * 10;
        camera.position.y = 8 + Math.sin(time * 0.1) * 3;
        camera.position.z = 25 + Math.cos(time * 0.05) * 5;
        camera.lookAt(0, 0, 0);
    });
    return null;
};

const CinematicBackground = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            background: '#020202', // Deep space black
            pointerEvents: 'none' // Crucial for letting clicks pass through to UI
        }}>
            <Canvas camera={{ position: [0, 10, 30], fov: 45 }}>
                <SceneCamera />
                <ambientLight intensity={0.05} />
                
                <Stars radius={150} depth={50} count={7000} factor={6} saturation={0.5} fade speed={1} />
                
                <Sun />
                
                {/* 10 Planets matching the 10 Navigation Option Colors */}
                <Planet orbitRadius={6} speed={0.8} size={0.3} color="#2a75bb" />   {/* Home */}
                <Planet orbitRadius={9} speed={0.6} size={0.5} color="#8a2be2" />   {/* Projects */}
                <Planet orbitRadius={12} speed={0.5} size={0.4} color="#00ccff" />  {/* Analytics */}
                <Planet orbitRadius={16} speed={0.4} size={0.6} color="#00ffff" />  {/* Skills */}
                <Planet orbitRadius={20} speed={0.3} size={0.7} color="#2ebf91" />  {/* Certifications */}
                <Planet orbitRadius={25} speed={0.25} size={1.2} color="#ffd700" /> {/* Achievements */}
                <Planet orbitRadius={30} speed={0.2} size={1.0} color="#ff69b4" />  {/* Journey */}
                <Planet orbitRadius={36} speed={0.15} size={0.9} color="#ff8c00" /> {/* Experience */}
                <Planet orbitRadius={42} speed={0.1} size={0.8} color="#008080" />  {/* CV */}
                <Planet orbitRadius={48} speed={0.05} size={0.5} color="#ff4444" /> {/* Contact */}
            </Canvas>
        </div>
    );
};

export default CinematicBackground;
