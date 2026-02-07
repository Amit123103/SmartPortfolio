import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { XR, createXRStore } from '@react-three/xr';
import { useNavigate } from 'react-router-dom';
import LivingTree from './LivingTree';
import FlowSystem from './FlowSystem';
import NavNodes from './NavNodes';
import CameraRig from './CameraRig';
import { WebXRManager } from './WebXR';

const store = createXRStore();

const TreeScene = () => {
    const navigate = useNavigate();

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: '#0F172A' }}>
            <button
                onClick={() => store.enterAR()}
                style={{
                    position: 'absolute', top: 10, right: 10, zIndex: 1000,
                    padding: '8px 16px', background: 'rgba(30, 111, 79, 0.8)',
                    color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                }}>
                Enter AR
            </button>

            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <XR store={store}>
                    <WebXRManager />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#A7F3D0" />

                    <Suspense fallback={null}>
                        <LivingTree />
                        <FlowSystem />
                        <NavNodes navigate={navigate} />
                    </Suspense>

                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
                    <CameraRig />
                </XR>
            </Canvas>
        </div>
    );
};

export default TreeScene;
