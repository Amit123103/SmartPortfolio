import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const CameraRig = () => {
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        state.camera.position.y = Math.sin(time * 0.1) * 0.5;
        state.camera.lookAt(0, 0, 0);
    });
    return null;
};

export default CameraRig;
