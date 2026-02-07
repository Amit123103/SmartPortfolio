import React, { useState } from 'react';
import { useMetaverseState } from '../store/useMetaverseState';

const NarrativeEditor = () => {
    const { isCreatorMode, activeTool } = useMetaverseState();

    if (!isCreatorMode || activeTool !== 'narrative') return null;

    return (
        <div style={{
            position: 'fixed', top: '10%', right: '2rem',
            width: '350px',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid #8B5CF6',
            borderRadius: '8px',
            color: '#eee',
            padding: '1rem',
            zIndex: 10000
        }}>
            <h4>📜 Mythos Weaver</h4>
            <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Inject lore into the procedural engine.</p>

            <textarea
                placeholder="The ancient roots whispered if {key}..."
                style={{
                    width: '100%', height: '100px',
                    background: '#1E293B', color: 'white', border: 'none', padding: '0.5rem',
                    marginTop: '1rem'
                }}
            />

            <button style={{ width: '100%', marginTop: '1rem', padding: '0.5rem', background: '#8B5CF6', color: 'white', border: 'none' }}>
                Inject Lore Fragment
            </button>
        </div>
    );
};

export default NarrativeEditor;
