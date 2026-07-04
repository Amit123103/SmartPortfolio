import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useLocation } from 'react-router-dom';

const Planet = ({ orbitRadius, speed, size, color }) => {
    const planetRef = useRef();
    
    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        if (planetRef.current) {
            planetRef.current.position.x = Math.cos(elapsedTime * speed) * orbitRadius;
            planetRef.current.position.z = Math.sin(elapsedTime * speed) * orbitRadius;
            planetRef.current.rotation.y += 0.01;
        }
    });

    const points = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * orbitRadius, 0, Math.sin(theta) * orbitRadius));
    }
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        <group>
            <line geometry={lineGeometry}>
                <lineBasicMaterial attach="material" color="#ffffff" transparent opacity={0.1} linewidth={1} />
            </line>
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
            <mesh scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshBasicMaterial color="#ff5500" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
            </mesh>
        </group>
    );
};

const BlackHole = () => {
    const diskRef = useRef();
    const starRef = useRef();
    const groupRef = useRef();

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        
        // Spin the accretion disk
        if (diskRef.current) {
            diskRef.current.rotation.z = elapsedTime * 2;
            diskRef.current.rotation.x = Math.PI / 2 + Math.sin(elapsedTime * 0.5) * 0.1; 
        }

        // Animate the star getting sucked in
        if (starRef.current) {
            // Cycle every 5 seconds
            const cycleTime = elapsedTime % 5; 
            const progress = cycleTime / 5; // 0 to 1

            // Start far away (radius 15) and spiral inwards to 0
            const radius = 15 * (1 - progress);
            const angle = elapsedTime * 5; // fast spiraling

            starRef.current.position.x = Math.cos(angle) * radius;
            starRef.current.position.z = Math.sin(angle) * radius;
            
            // As it gets closer, it gets stretched and scales down
            const scale = Math.max(0.01, 1 - progress);
            starRef.current.scale.set(scale, scale, scale);

            // Fade out the light inside the star mesh as it crosses event horizon (radius ~2.5)
            if (radius < 2.5) {
                starRef.current.material.opacity = Math.max(0, radius / 2.5);
            } else {
                starRef.current.material.opacity = 1;
            }
        }
        
        // Slow float of the entire black hole system
        if (groupRef.current) {
             groupRef.current.position.y = Math.sin(elapsedTime * 0.5) * 0.5;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Event Horizon (Pure Black Sphere) */}
            <mesh>
                <sphereGeometry args={[2.5, 64, 64]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* Glowing Aura (Gravitational Lensing approximation) */}
            <mesh scale={[1.1, 1.1, 1.1]}>
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshBasicMaterial color="#4400ff" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
            </mesh>

            {/* Accretion Disk (Torus) */}
            <mesh ref={diskRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[4.5, 0.8, 16, 100]} />
                <meshBasicMaterial color="#ff5500" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
            </mesh>
            
            <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1.2, 1.2, 1.2]}>
                 <torusGeometry args={[4.5, 1.2, 16, 100]} />
                 <meshBasicMaterial color="#aa00ff" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
            </mesh>

            {/* Doomed Star being absorbed */}
            <mesh ref={starRef}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={1} blending={THREE.AdditiveBlending} />
                <pointLight intensity={2} color="#ffffff" distance={20} decay={2} />
            </mesh>
        </group>
    );
};

const SpaceStation = () => {
    const stationRef = useRef();
    const solarPanelsRef = useRef();

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        
        // Orbit the station around the sun
        const orbitRadius = 15;
        const orbitSpeed = 0.2;
        if (stationRef.current) {
            stationRef.current.position.x = Math.cos(elapsedTime * orbitSpeed) * orbitRadius;
            stationRef.current.position.z = Math.sin(elapsedTime * orbitSpeed) * orbitRadius;
            
            // Station slowly rotates as it orbits to always face tangentially or spin
            stationRef.current.rotation.y = -elapsedTime * orbitSpeed; 
            stationRef.current.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2; // slight wobble
        }

        // Spin the solar panels relative to the station
        if (solarPanelsRef.current) {
            solarPanelsRef.current.rotation.x = elapsedTime * 0.5;
        }
    });

    return (
        <group ref={stationRef}>
            {/* Core Module - Saffron, White, Green (Indian Flag Theme) */}
            {/* Top Module: Saffron */}
            <mesh position={[0, 1.5, 0]}>
                <cylinderGeometry args={[0.8, 0.8, 1, 32]} />
                <meshStandardMaterial color="#FF9933" metalness={0.6} roughness={0.4} />
            </mesh>
            
            {/* Middle Module: White */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.9, 0.9, 2, 32]} />
                <meshStandardMaterial color="#FFFFFF" metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Ashoka Chakra representation (Blue Ring in center) */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.92, 0.92, 0.2, 32]} />
                <meshStandardMaterial color="#000080" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Bottom Module: Green */}
            <mesh position={[0, -1.5, 0]}>
                <cylinderGeometry args={[0.8, 0.8, 1, 32]} />
                <meshStandardMaterial color="#138808" metalness={0.6} roughness={0.4} />
            </mesh>

            {/* Solar Panels Group */}
            <group ref={solarPanelsRef}>
                {/* Left Panel Array */}
                <mesh position={[-3.5, 0, 0]}>
                    <boxGeometry args={[5, 0.1, 2]} />
                    <meshStandardMaterial color="#112255" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Right Panel Array */}
                <mesh position={[3.5, 0, 0]}>
                    <boxGeometry args={[5, 0.1, 2]} />
                    <meshStandardMaterial color="#112255" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Connecting Truss */}
                <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.2, 0.2, 8, 16]} />
                    <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
                </mesh>
            </group>
            
            {/* Glowing Antenna */}
            <mesh position={[0, 2.5, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
                <meshStandardMaterial color="#aaaaaa" />
            </mesh>
            <mesh position={[0, 3, 0]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshBasicMaterial color="#ff0000" />
            </mesh>
        </group>
    );
};

const SceneCamera = () => {
    useFrame(({ camera, clock }) => {
        const time = clock.getElapsedTime();
        camera.position.x = Math.sin(time * 0.05) * 10;
        camera.position.y = 8 + Math.sin(time * 0.1) * 3;
        camera.position.z = 25 + Math.cos(time * 0.05) * 5;
        camera.lookAt(0, 0, 0);
    });
    return null;
};

const CinematicBackground = () => {
    // Determine the current route
    const location = useLocation();
    const isProjectsPage = location.pathname === '/projects';
    const isSkillsPage = location.pathname === '/skills';

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
                
                {isProjectsPage ? (
                    <BlackHole />
                ) : isSkillsPage ? (
                    <>
                        <Sun />
                        <SpaceStation />
                        <Planet orbitRadius={25} speed={0.05} size={3} color="#2a75bb" /> {/* Giant Earth in background */}
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </Canvas>
        </div>
    );
};

export default CinematicBackground;
