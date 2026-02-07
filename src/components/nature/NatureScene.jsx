import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { BarkShader } from './shaders';
import InfiniteParticles from './InfiniteParticles';
import NavigationNodes from './NavigationNodes';

const TreeTrunk = () => {
    const mesh = useRef();

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    const shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: BarkShader.vertexShader,
        fragmentShader: BarkShader.fragmentShader,
        uniforms: {
            uTime: { value: 0 },
            uColorBase: { value: new THREE.Color('#022C22') },
            uColorHighlight: { value: new THREE.Color('#1E6F4F') }
        },
        side: THREE.DoubleSide
    });

    return (
        <mesh ref={mesh} position={[0, -5, 0]}>
            {/* Tall cylinder for trunk */}
            <cylinderGeometry args={[1.5, 2.5, 20, 32, 10]} />
            <primitive object={shaderMaterial} attach="material" />
        </mesh>
    );
};

const CameraController = () => {
    useFrame((state) => {
        // Subtle breathing motion
        const time = state.clock.getElapsedTime();
        state.camera.position.y = Math.sin(time * 0.2) * 0.5;
        state.camera.lookAt(0, 0, 0); // Always look at tree center
    });
    return null;
};

const NatureScene = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: '#0F172A' }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <fog attach="fog" args={['#0F172A', 5, 25]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#4ADE80" />

                {/* Core Elements */}
                <TreeTrunk />
                <InfiniteParticles count={300} color="#FACC15" />
                <InfiniteParticles count={200} color="#4ADE80" area={[15, 25, 15]} />
                <NavigationNodes />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* Controls & Camera */}
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.5} />
                <CameraController />
            </Canvas>

            {/* Optional Overlay Vignette */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'radial-gradient(circle, transparent 40%, #0F172A 100%)',
                pointerEvents: 'none'
            }} />
        </div>
    );
};

export default NatureScene;
