import React, { useState } from 'react';
import { useMetaverseState } from '../store/useMetaverseState';

const BiomeDesigner = () => {
    const { isCreatorMode, activeTool, currentBiome, setBiome } = useMetaverseState();

    if (!isCreatorMode || activeTool !== 'biome') return null;

    return (
        <div style={{
            position: 'fixed', top: '10%', right: '2rem',
            width: '300px',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid #F59E0B',
            borderRadius: '8px',
            color: '#eee',
            padding: '1rem',
            zIndex: 10000
        }}>
            <h4>🌿 Biome Designer</h4>

            <div style={{ marginBottom: '1rem' }}>
                <label>Current Biome</label>
                <select
                    value={currentBiome}
                    onChange={(e) => setBiome(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', background: '#0F172A', color: 'white', border: '1px solid #1E293B' }}
                >
                    <option value="emerald_forest">Emerald Forest</option>
                    <option value="bioluminescent_grove">Bioluminescent Grove</option>
                    <option value="sakura_highlands">Sakura Highlands</option>
                    <option value="arctic_canopy">Arctic Canopy</option>
                </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label>Atmosphere Density</label>
                <input type="range" min="0" max="1" step="0.1" style={{ width: '100%' }} />
            </div>

            <button style={{ width: '100%', padding: '0.5rem', background: '#F59E0B', color: '#000', border: 'none', fontWeight: 'bold' }}>
                Publish Biome Shard
            </button>
        </div>
    );
};

export default BiomeDesigner;
