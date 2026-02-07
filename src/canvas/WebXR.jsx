import React, { useEffect } from 'react';
import { useXR, Interactive } from '@react-three/xr';
import { useUniverseState } from '../store/useUniverseState';

export const WebXRManager = () => {
    const { player, isPresenting } = useXR();
    const { setConsent } = useUniverseState();

    useEffect(() => {
        if (isPresenting) {
            console.log('🕶️ [WebXR] Entering Immersive Mode');
            setConsent('xr', true);
        }
    }, [isPresenting]);

    // Eye Tracking Hook (Mock/Polyfill for now as standard API is experimental)
    // In production, use 'useHitTest' with gaze source

    return null;
};

// Wrapper for interactive objects in XR
export const XRInteractable = ({ children, onSelect }) => {
    return (
        <Interactive onSelect={onSelect}>
            {children}
        </Interactive>
    );
};
