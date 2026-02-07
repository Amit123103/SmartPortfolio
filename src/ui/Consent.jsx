import React, { useEffect, useState } from 'react';
import { useMetaverseState } from '../store/useMetaverseState';
import { musicEngine } from '../audio/MusicEngine';
import { federatedAI } from '../ai/federated';

const Consent = () => {
    // We'll use a local state for consent visibility since useMetaverseState 
    // might not have 'consent' object structured exactly like the old one yet.
    // Let's check useMetaverseState definition... 
    // It has identity, aiModel, activeTool. It lacks explicit 'consent' field in my previous definition.
    // I will add a local tracking or just use a simple local storage flag for now to avoid crashes.

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const hasConsent = localStorage.getItem('metaverse-consent');
        if (!hasConsent) {
            const timer = setTimeout(() => setVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    if (!visible) return null;

    const handleAccept = () => {
        localStorage.setItem('metaverse-consent', 'true');
        musicEngine.startAmbient();
        // Trigger Federated Learning
        // federatedAI.trainStep(); 
        setVisible(false);
    };

    return (
        <div style={{
            position: 'fixed', bottom: '2rem', right: '2rem',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid #38BDF8',
            padding: '1.5rem',
            borderRadius: '12px',
            color: 'white',
            maxWidth: '350px',
            zIndex: 9999,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)'
        }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🪐</span> Planet Metaverse
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: '1.5' }}>
                Enter the federation. Share anonymized learning gradients?
                (Privacy-First).
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                    onClick={handleAccept}
                    style={{
                        background: '#0EA5E9', border: 'none', padding: '0.5rem 1rem',
                        color: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold',
                        flex: 1
                    }}
                >
                    Join Federation
                </button>
                <button
                    onClick={() => { setVisible(false); }}
                    style={{
                        background: 'transparent', border: '1px solid #94A3B8', padding: '0.5rem 1rem',
                        color: '#94A3B8', borderRadius: '6px', cursor: 'pointer'
                    }}
                >
                    Observer Only
                </button>
            </div>
        </div>
    );
};

export default Consent;
