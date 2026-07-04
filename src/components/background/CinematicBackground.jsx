import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
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

const RealisticEarth = () => {
    const earthRef = useRef();
    
    // Load high res earth texture and normal map
    const [colorMap, normalMap] = useLoader(TextureLoader, [
        'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
        'https://unpkg.com/three-globe/example/img/earth-topology.png'
    ]);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        const orbitRadius = 18;
        const speed = 0.15;
        if (earthRef.current) {
            earthRef.current.position.x = Math.cos(elapsedTime * speed) * orbitRadius;
            earthRef.current.position.z = Math.sin(elapsedTime * speed) * orbitRadius;
            // Earth spinning on its axis
            earthRef.current.rotation.y += 0.005;
            earthRef.current.rotation.x = 0.2; // Axial tilt
        }
    });

    return (
        <group>
            <mesh ref={earthRef}>
                <sphereGeometry args={[2.5, 64, 64]} />
                <meshStandardMaterial 
                    map={colorMap} 
                    normalMap={normalMap} 
                    roughness={0.6} 
                    metalness={0.2}
                />
            </mesh>
        </group>
    );
};

const MiniSolarSystem = ({ position }) => {
    const systemRef = useRef();
    
    // Randomize initial rotation and speeds for uniqueness
    const initialRotation = Math.random() * Math.PI * 2;
    const speedMultiplier = 0.5 + Math.random();
    
    useFrame(({ clock }) => {
        if (systemRef.current) {
            systemRef.current.rotation.y = initialRotation + clock.getElapsedTime() * speedMultiplier;
        }
    });

    return (
        <group position={position} ref={systemRef}>
            {/* Tiny Sun */}
            <mesh>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshBasicMaterial color="#ffffaa" />
                <pointLight intensity={1} distance={10} color="#ffffaa" decay={2} />
            </mesh>
            
            {/* Tiny Orbiting Planet 1 */}
            <group rotation={[0, 0, 0.2]}>
                <mesh position={[1.2, 0, 0]}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshStandardMaterial color="#3388ff" />
                </mesh>
                {/* Orbit Path */}
                <line>
                    <bufferGeometry attach="geometry" {...(() => {
                        const pts = [];
                        for(let i=0; i<=32; i++) {
                            const angle = (i/32) * Math.PI * 2;
                            pts.push(new THREE.Vector3(Math.cos(angle)*1.2, 0, Math.sin(angle)*1.2));
                        }
                        return { setFromPoints: (p) => new THREE.BufferGeometry().setFromPoints(pts) };
                    })()} />
                    <lineBasicMaterial attach="material" color="#3388ff" transparent opacity={0.2} />
                </line>
            </group>

            {/* Tiny Orbiting Planet 2 */}
            <group rotation={[0.3, 0, -0.1]}>
                <mesh position={[-2.0, 0, 0]}>
                    <sphereGeometry args={[0.12, 8, 8]} />
                    <meshStandardMaterial color="#ff5533" />
                </mesh>
            </group>

            {/* Tiny Orbiting Planet 3 */}
            <group rotation={[-0.2, 0, 0.4]}>
                <mesh position={[0, 0, 2.8]}>
                    <sphereGeometry args={[0.15, 8, 8]} />
                    <meshStandardMaterial color="#aa33ff" />
                </mesh>
            </group>
        </group>
    );
};

const InfiniteGalaxy = () => {
    const groupRef = useRef();
    
    // Generate star/dust particles with colors
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const colorPalette = [
        new THREE.Color("#14B8A6"), // Teal
        new THREE.Color("#8a2be2"), // Purple
        new THREE.Color("#ff007f"), // Pink
        new THREE.Color("#ffd700"), // Gold
        new THREE.Color("#00ffff"), // Cyan
    ];

    for (let i = 0; i < particleCount; i++) {
        // Scatter particles in a long deep tunnel
        positions[i * 3] = (Math.random() - 0.5) * 50; // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200 - 100; // z (depth)

        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    // Generate solar systems
    const solarSystems = Array.from({ length: 60 }).map(() => [
        (Math.random() - 0.5) * 40, // x
        (Math.random() - 0.5) * 40, // y
        (Math.random() - 0.5) * 200 - 100  // z
    ]);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        const speed = 25; // Warp speed!
        
        if (groupRef.current) {
            // Move entire group towards the camera and loop it back
            groupRef.current.position.z = (elapsedTime * speed) % 100;
            // Add a slight cinematic spiral roll
            groupRef.current.rotation.z = elapsedTime * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Colored Galaxy Dust */}
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
                    <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial size={0.3} vertexColors transparent opacity={0.8} sizeAttenuation blending={THREE.AdditiveBlending} />
            </points>

            {/* Mini Solar Systems scattered through the infinite galaxy */}
            {solarSystems.map((pos, i) => (
                <MiniSolarSystem key={i} position={pos} />
            ))}
        </group>
    );
};

const SupernovaEvent = () => {
    const sunRef = useRef();
    const flashRef = useRef();
    const shockwaveRef = useRef();
    const planetsRef = useRef([]);
    const meteorsRef = useRef([]);
    const meteorTailsRef = useRef([]);
    const explosionsRef = useRef([]);
    const blastRingsRef = useRef([]);

    // 5 distinct planets
    const planetData = [
        { radius: 6, speed: 1.2, size: 0.4, color: "#3388ff", meteorStart: [20, 10, -25] },
        { radius: 10, speed: 0.8, size: 0.6, color: "#ff5533", meteorStart: [-25, 15, -15] },
        { radius: 14, speed: 0.5, size: 0.8, color: "#aa33ff", meteorStart: [30, -20, 15] },
        { radius: 18, speed: 0.4, size: 1.0, color: "#33ffaa", meteorStart: [-35, -25, 25] },
        { radius: 24, speed: 0.2, size: 1.2, color: "#ffaa33", meteorStart: [0, 40, -40] },
    ];

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() % 25; // 25s loop

        // Sun logic
        if (sunRef.current) {
            if (t < 16) {
                // Normal sun
                sunRef.current.scale.setScalar(2);
                sunRef.current.material.color.set("#ffcc00");
                sunRef.current.material.emissive.set("#ffaa00");
            } else if (t >= 16 && t < 22) {
                // Violent pulsing and color shift
                const pulse = Math.sin(t * 30) * 0.8 + 2.5 + (t - 16) * 0.2; 
                sunRef.current.scale.setScalar(pulse);
                // Shift to white/blue
                sunRef.current.material.color.set("#ffffff");
                sunRef.current.material.emissive.set("#aaaaff");
            } else {
                // Shrink core instantly
                sunRef.current.scale.setScalar(0.01);
            }
        }

        // Planets logic
        planetsRef.current.forEach((planet, i) => {
            if (planet) {
                if (t < 12) {
                    planet.visible = true;
                    const angle = t * planetData[i].speed;
                    planet.position.x = Math.cos(angle) * planetData[i].radius;
                    planet.position.z = Math.sin(angle) * planetData[i].radius;
                    planet.rotation.y += 0.05;
                } else {
                    planet.visible = false; // Destroyed
                }
            }
        });

        // Meteors and Tails logic
        meteorsRef.current.forEach((meteor, i) => {
            if (meteor && meteorTailsRef.current[i]) {
                if (t >= 8 && t < 12) {
                    meteor.visible = true;
                    meteorTailsRef.current[i].visible = true;
                    
                    const progress = (t - 8) / 4; 
                    const targetAngle = 12 * planetData[i].speed;
                    const targetPos = new THREE.Vector3(
                        Math.cos(targetAngle) * planetData[i].radius,
                        0,
                        Math.sin(targetAngle) * planetData[i].radius
                    );
                    const startPos = new THREE.Vector3(...planetData[i].meteorStart);
                    
                    const currentPos = startPos.clone().lerp(targetPos, progress);
                    meteor.position.copy(currentPos);
                    
                    // Orient tail to point backward along the path
                    meteorTailsRef.current[i].position.copy(currentPos);
                    meteorTailsRef.current[i].lookAt(startPos); 
                } else {
                    meteor.visible = false;
                    meteorTailsRef.current[i].visible = false;
                }
            }
        });

        // Planetary Explosions logic
        explosionsRef.current.forEach((explosion, i) => {
            if (explosion && blastRingsRef.current[i]) {
                if (t >= 12 && t < 16) {
                    explosion.visible = true;
                    blastRingsRef.current[i].visible = true;
                    
                    const timeSinceHit = t - 12;
                    
                    // Position at death spot
                    const targetAngle = 12 * planetData[i].speed;
                    const posX = Math.cos(targetAngle) * planetData[i].radius;
                    const posZ = Math.sin(targetAngle) * planetData[i].radius;
                    
                    explosion.position.set(posX, 0, posZ);
                    blastRingsRef.current[i].position.set(posX, 0, posZ);
                    
                    // Advanced Blast Scaling
                    explosion.scale.setScalar(timeSinceHit * 4);
                    blastRingsRef.current[i].scale.setScalar(0.1 + timeSinceHit * 10);
                    
                    // Fade out
                    const opacity = Math.max(0, 1 - timeSinceHit);
                    explosion.material.opacity = opacity;
                    blastRingsRef.current[i].material.opacity = opacity;
                } else {
                    explosion.visible = false;
                    blastRingsRef.current[i].visible = false;
                }
            }
        });

        // Supernova Flash and Shockwave logic
        if (flashRef.current && shockwaveRef.current) {
            if (t >= 22) {
                flashRef.current.visible = true;
                shockwaveRef.current.visible = true;
                
                const progress = t - 22; // 0 to 3s
                
                flashRef.current.scale.setScalar(progress * 200);
                flashRef.current.material.opacity = Math.max(0, 1 - (progress / 2));
                
                shockwaveRef.current.scale.setScalar(0.1 + progress * 50);
                shockwaveRef.current.material.opacity = Math.max(0, 1 - (progress / 2));
            } else {
                flashRef.current.visible = false;
                shockwaveRef.current.visible = false;
            }
        }
    });

    return (
        <group>
            {/* The Sun with glowing corona */}
            <mesh ref={sunRef}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial color="#ffcc00" emissive="#ffaa00" emissiveIntensity={3} />
                <pointLight distance={150} intensity={8} decay={1.5} />
            </mesh>
            
            {/* Sun Corona */}
            <mesh scale={[2.5, 2.5, 2.5]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#ff5500" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>

            {/* Supernova Blinding Flash */}
            <mesh ref={flashRef} visible={false}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={1} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
            </mesh>
            
            {/* Supernova Galactic Shockwave */}
            <mesh ref={shockwaveRef} visible={false} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.9, 1, 64]} />
                <meshBasicMaterial color="#aaddff" transparent opacity={1} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} depthWrite={false} />
            </mesh>

            {/* Planets, Meteors, and Explosions */}
            {planetData.map((data, i) => (
                <group key={i}>
                    {/* Planet */}
                    <mesh ref={(el) => (planetsRef.current[i] = el)}>
                        <sphereGeometry args={[data.size, 64, 64]} />
                        <meshStandardMaterial color={data.color} roughness={0.5} metalness={0.5} />
                    </mesh>

                    {/* Meteor Head */}
                    <mesh ref={(el) => (meteorsRef.current[i] = el)} visible={false}>
                        <sphereGeometry args={[data.size * 0.8, 32, 32]} />
                        <meshBasicMaterial color="#ffffff" />
                        <pointLight color="#ff3300" intensity={3} distance={30} />
                    </mesh>
                    
                    {/* Meteor Fire Tail */}
                    <group ref={(el) => (meteorTailsRef.current[i] = el)} visible={false}>
                        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 2]}>
                            <coneGeometry args={[data.size * 1.5, 8, 32]} />
                            <meshBasicMaterial color="#ff3300" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
                        </mesh>
                    </group>

                    {/* Planetary Explosion Core */}
                    <mesh ref={(el) => (explosionsRef.current[i] = el)} visible={false}>
                        <sphereGeometry args={[data.size, 32, 32]} />
                        <meshBasicMaterial color="#ffaa00" transparent opacity={1} blending={THREE.AdditiveBlending} depthWrite={false} />
                    </mesh>
                    
                    {/* Planetary Explosion Shockwave Ring */}
                    <mesh ref={(el) => (blastRingsRef.current[i] = el)} visible={false} rotation={[Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[0.8, 1, 32]} />
                        <meshBasicMaterial color="#ff5500" transparent opacity={1} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} depthWrite={false} />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

const SceneCamera = ({ isExperiencePage }) => {
    useFrame(({ camera, clock }) => {
        const time = clock.getElapsedTime();
        camera.position.x = Math.sin(time * 0.05) * 10;
        camera.position.y = 8 + Math.sin(time * 0.1) * 3;
        camera.position.z = 25 + Math.cos(time * 0.05) * 5;
        
        // Add violent camera shake during Supernova
        if (isExperiencePage) {
            const t = time % 25;
            if (t > 16 && t < 23) {
                const intensity = t < 22 ? (t - 16) * 0.1 : 0.8;
                camera.position.x += (Math.random() - 0.5) * intensity;
                camera.position.y += (Math.random() - 0.5) * intensity;
                camera.position.z += (Math.random() - 0.5) * intensity;
            }
        }
        
        camera.lookAt(0, 0, 0);
    });
    return null;
};

const CinematicBackground = () => {
    // Determine the current route
    const location = useLocation();
    const isProjectsPage = location.pathname === '/projects';
    const isSkillsPage = location.pathname === '/skills';
    const isCvPage = location.pathname === '/cv' || location.pathname === '/resume';
    const isExperiencePage = location.pathname === '/experience';

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
                <SceneCamera isExperiencePage={isExperiencePage} />
                <ambientLight intensity={0.05} />
                
                <Stars radius={150} depth={50} count={7000} factor={6} saturation={0.5} fade speed={1} />
                
                {isExperiencePage ? (
                    <SupernovaEvent />
                ) : isCvPage ? (
                    <InfiniteGalaxy />
                ) : isProjectsPage ? (
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
                        {/* Huge Realistic Earth Orbiting */}
                        <Suspense fallback={<Planet orbitRadius={18} speed={0.15} size={2.5} color="#2a75bb" />}>
                            <RealisticEarth />
                        </Suspense>
                        
                        {/* 10 Planets matching the 10 Navigation Option Colors */}
                        <Planet orbitRadius={6} speed={0.8} size={0.3} color="#2a75bb" />   {/* Home */}
                        <Planet orbitRadius={9} speed={0.6} size={0.5} color="#8a2be2" />   {/* Projects */}
                        <Planet orbitRadius={12} speed={0.5} size={0.4} color="#00ccff" />  {/* Analytics */}
                        <Planet orbitRadius={24} speed={0.4} size={0.6} color="#00ffff" />  {/* Skills */}
                        <Planet orbitRadius={28} speed={0.3} size={0.7} color="#2ebf91" />  {/* Certifications */}
                        <Planet orbitRadius={33} speed={0.25} size={1.2} color="#ffd700" /> {/* Achievements */}
                        <Planet orbitRadius={38} speed={0.2} size={1.0} color="#ff69b4" />  {/* Journey */}
                        <Planet orbitRadius={44} speed={0.15} size={0.9} color="#ff8c00" /> {/* Experience */}
                        <Planet orbitRadius={50} speed={0.1} size={0.8} color="#008080" />  {/* CV */}
                        <Planet orbitRadius={56} speed={0.05} size={0.5} color="#ff4444" /> {/* Contact */}
                    </>
                )}
            </Canvas>
        </div>
    );
};

export default CinematicBackground;
