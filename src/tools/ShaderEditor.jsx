import React, { useState } from 'react';
import { useMetaverseState } from '../store/useMetaverseState';

const ShaderEditor = () => {
    const { isCreatorMode, activeTool } = useMetaverseState();
    const [code, setCode] = useState('// Vertex Shader\nvoid main() { ... }');

    if (!isCreatorMode || activeTool !== 'shader') return null;

    return (
        <div style={{
            position: 'fixed', top: '10%', right: '2rem',
            width: '400px', height: '60%',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid #1E6F4F',
            borderRadius: '8px',
            color: '#eee',
            padding: '1rem',
            zIndex: 10000,
            display: 'flex', flexDirection: 'column'
        }}>
            <h4>⚡ Live Shader Editor</h4>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{
                    flex: 1, background: '#022C22', color: '#4ADE80',
                    fontFamily: 'monospace', border: 'none', padding: '0.5rem',
                    resize: 'none'
                }}
            />
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <button style={{ flex: 1, padding: '0.5rem', background: '#1E6F4F', color: 'white', border: 'none' }}>
                    Compile & Hot-Swap
                </button>
            </div>
        </div>
    );
};

export default ShaderEditor;
