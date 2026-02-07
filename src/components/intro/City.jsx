import React, { useMemo } from 'react';
import * as THREE from 'three';

const City = () => {
    const buildings = useMemo(() => {
        const temp = [];
        const count = 50; // Number of buildings
        const spread = 200; // City spread

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * spread;
            const z = (Math.random() - 0.5) * spread;
            // Clear a path in the middle for swinging
            if (Math.abs(x) < 10) continue;

            const height = 20 + Math.random() * 50;
            const width = 10 + Math.random() * 10;
            const depth = 10 + Math.random() * 10;

            temp.push({
                position: [x, height / 2, z],
                args: [width, height, depth],
                color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.6, 0.4, Math.random() * 0.2 + 0.3) // Brighter Blue/Cyan
            });
        }
        return temp;
    }, []);

    return (
        <group>
            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                <planeGeometry args={[500, 500]} />
                <meshStandardMaterial color="#151525" roughness={0.8} />
            </mesh>

            {/* Buildings */}
            {buildings.map((data, i) => (
                <group key={i} position={data.position}>
                    <mesh>
                        <boxGeometry args={data.args} />
                        <meshStandardMaterial color={data.color} roughness={0.2} metalness={0.6} />
                    </mesh>
                    {/* Random Window Lights */}
                    {Math.random() > 0.5 && (
                        <mesh position={[0, 0, data.args[2] / 2 + 0.1]}>
                            <planeGeometry args={[data.args[0] * 0.8, data.args[1] * 0.9]} />
                            <meshStandardMaterial
                                color={Math.random() > 0.8 ? "#f59e0b" : "#ffffff"}
                                emissive={Math.random() > 0.8 ? "#f59e0b" : "#ffffff"}
                                emissiveIntensity={0.5}
                                transparent
                                opacity={0.3}
                            />
                        </mesh>
                    )}
                </group>
            ))}
        </group>
    );
};

export default City;
