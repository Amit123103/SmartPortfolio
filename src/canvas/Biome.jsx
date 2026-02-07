import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMetaverseState } from '../store/useMetaverseState';
import { simulateGrowth } from '../physics/growth';

// We import the raw strings from the shader files or define them inline if bundler issues arise.
// Since I wrote them to files earlier, I'll inline them here to guarantee runnability without bundler config changes.
const vertexShader = `
uniform float uTime;
uniform float uSway;
uniform float uMistDensity;
varying vec2 vUv;
varying vec3 vWorldPos;
varying float vElevation;

void main() {
    vUv = uv;
    vec3 pos = position;
    float wind = sin(uTime * 0.5 + pos.x * 0.5) * cos(uTime * 0.3 + pos.z * 0.5) * uSway;
    pos.x += wind * smoothstep(0.0, 5.0, pos.y);
    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    vWorldPos = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
    vElevation = pos.y;
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uFogColor;
uniform float uMistDensity;

varying vec2 vUv;
varying vec3 vWorldPos;
varying float vElevation;

void main() {
    vec3 color = mix(uColorA, uColorB, vUv.y + sin(uTime) * 0.1);
    float dist = length(cameraPosition - vWorldPos);
    float fogFactor = smoothstep(5.0, 20.0, dist) * uMistDensity;
    float groundFog = smoothstep(2.0, -2.0, vWorldPos.y) * 0.5;
    color = mix(color, uFogColor, fogFactor + groundFog);
    gl_FragColor = vec4(color, 1.0);
}
`;

const BIOME_CONFIGS = {
    emerald_forest: {
        colorA: '#022C22', colorB: '#4ADE80', fog: '#064E3B', mist: 0.2, sway: 0.5
    },
    bioluminescent_grove: {
        colorA: '#0F172A', colorB: '#38BDF8', fog: '#1E293B', mist: 0.4, sway: 0.3
    },
    sakura_highlands: {
        colorA: '#451a03', colorB: '#FDBA74', fog: '#FFF7ED', mist: 0.3, sway: 0.6
    }
};

const Biome = () => {
    const mesh = useRef();
    const { currentBiome, treeHealth, updateNutrients } = useMetaverseState();

    const config = BIOME_CONFIGS[currentBiome] || BIOME_CONFIGS.emerald_forest;

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color(config.colorA) },
        uColorB: { value: new THREE.Color(config.colorB) },
        uFogColor: { value: new THREE.Color(config.fog) },
        uMistDensity: { value: config.mist },
        uSway: { value: config.sway }
    }), []);

    // Growth Loop
    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate 1 min of growth
            const growth = simulateGrowth({ health: treeHealth }, { light: 0.8, water: 0.5, time: 1 });
            updateNutrients(-0.1); // Cost of living

            // Apply physics result to visual
            if (mesh.current) {
                mesh.current.scale.setScalar(growth.sizeModifier);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [treeHealth]);

    useFrame((state) => {
        if (!mesh.current) return;

        const time = state.clock.getElapsedTime();
        mesh.current.material.uniforms.uTime.value = time;

        // Smoothly lerp to new biome settings
        const u = mesh.current.material.uniforms;
        u.uColorA.value.lerp(new THREE.Color(config.colorA), 0.05);
        u.uColorB.value.lerp(new THREE.Color(config.colorB), 0.05);
        u.uFogColor.value.lerp(new THREE.Color(config.fog), 0.05);
        u.uMistDensity.value = THREE.MathUtils.lerp(u.uMistDensity.value, config.mist, 0.05);
    });

    return (
        <group>
            {/* The Great Tree */}
            <mesh ref={mesh} position={[0, -5, 0]}>
                <cylinderGeometry args={[2, 4, 30, 32, 20]} />
                <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                />
            </mesh>

            {/* Ground Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color={config.fog} />
            </mesh>
        </group>
    );
};

export default Biome;
