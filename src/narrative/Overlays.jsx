import React from 'react';
import { useUniverseState } from '../store/useUniverseState'; // NEW STORE

const Overlays = () => {
    const { mood } = useUniverseState(); // NEW STORE HOOK
    const language = 'en'; // Hardcoded for simplicity in this step, or fetch from store if added

    // Multilingual Narrative
    const narratives = {
        en: {
            calm: "The universe breathes...",
            focused: "Stars align with your gaze.",
            energetic: "Cosmic energy flows."
        },
        es: {
            calm: "El universo respira...",
            focused: "Las estrellas se alinean con tu mirada.",
            energetic: "La energía cósmica fluye."
        },
        hi: {
            calm: "ब्रह्मांड सांस ले रहा है...",
            focused: "तारे आपकी दृष्टि के साथ संरेखित हैं।",
            energetic: "ब्रह्मांडीय ऊर्जा बह रही है।"
        }
    };

    const text = narratives[language]?.[mood] || narratives.en[mood];

    return (
        <div style={{
            position: 'fixed',
            bottom: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '1.2rem',
            fontFamily: 'serif',
            fontStyle: 'italic',
            pointerEvents: 'none',
            textShadow: '0 0 10px rgba(74, 222, 128, 0.5)',
            transition: 'opacity 1s ease',
            whiteSpace: 'nowrap'
        }}>
            {text}
        </div>
    );
};

export default Overlays;
