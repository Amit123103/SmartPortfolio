import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

// Simple Components (No Stores)
import LivingTree from './LivingTree';
import FlowSystem from './FlowSystem';
import NavNodes from './NavNodes';
import CameraRig from './CameraRig';

const World = () => {
    // Navigate prop might fail if not in Router context, but App wrapper ensures it.
    // We pass it explicitly to NavNodes.

    // We use a wrapper component for Navigation to access hook inside Canvas if needed, 
    // but passing from parent is safer for now.

    const Wrapper = () => {
        const navigate = useNavigate();
        return <NavNodes navigate={navigate} />;
    };

    const RouterCheck = () => {
        try {
            const navigate = useNavigate();
            return <NavNodes navigate={navigate} />;
        } catch (e) {
            return <NavNodes />;
        }
    }

    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />

            <Suspense fallback={null}>
                <LivingTree />
                <FlowSystem />
                <RouterCheck />
            </Suspense>

            <Stars radius={150} depth={50} count={5000} factor={4} saturation={0} fade />
            <CameraRig />

            {/* Debug Controls */}
            <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
    );
};

export default World;
