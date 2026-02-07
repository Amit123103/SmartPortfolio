import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CinematicContext = createContext();

export const CinematicProvider = ({ children }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [phase, setPhase] = useState('IDLE');
    // Phases: IDLE -> BRIEFING -> LOCK_ON -> LAUNCH -> WARP -> EXIT
    const [targetRoute, setTargetRoute] = useState(null);
    const [missionText, setMissionText] = useState('');
    const [sectionColor, setSectionColor] = useState('#ffffff');

    const navigate = useNavigate();
    const location = useLocation();

    const SECTION_CONFIG = {
        '/': { text: 'SYSTEM: HOMEBASE', color: '#10B981' }, // Green
        '/projects': { text: 'MISSION: ACCESS PROJECTS', color: '#8B5CF6' }, // Purple
        '/skills': { text: 'MISSION: ANALYZE SKILLS', color: '#06B6D4' }, // Cyan
        '/certifications': { text: 'MISSION: VERIFY CERTS', color: '#10B981' }, // Green
        '/achievements': { text: 'MISSION: REVIEW DATA', color: '#F59E0B' }, // Gold
        '/journey': { text: 'MISSION: TRACE PATH', color: '#EC4899' }, // Pink
        '/experience': { text: 'MISSION: SCAN EXPERIENCE', color: '#F97316' }, // Orange
        '/cv': { text: 'MISSION: LOAD CV', color: '#14B8A6' }, // Teal
        '/contact': { text: 'MISSION: OPEN CHANNEL', color: '#EF4444' } // Red
    };

    const triggerTransition = (to) => {
        if (location.pathname === to) return;

        const config = SECTION_CONFIG[to] || { text: 'MISSION: UNKNOWN', color: '#FFFFFF' };
        setMissionText(config.text);
        setSectionColor(config.color);
        setTargetRoute(to);
        setIsTransitioning(true);

        // --- CINEMATIC SEQUENCE ---
        setPhase('BRIEFING'); // Text appears, Jet flies in slowly

        setTimeout(() => setPhase('LOCK_ON'), 1500); // Radar locks, engine spools

        setTimeout(() => setPhase('LAUNCH'), 2500); // Massive acceleration, fire

        setTimeout(() => setPhase('WARP'), 3000); // Stars stretch, tunnel effect

        setTimeout(() => {
            navigate(to);
            setPhase('EXIT'); // Fade out, Jet flies away
        }, 5000); // 2 seconds of Warp

        setTimeout(() => {
            setIsTransitioning(false);
            setPhase('IDLE');
        }, 6000);
    };

    return (
        <CinematicContext.Provider value={{
            isTransitioning,
            phase,
            missionText,
            sectionColor,
            triggerTransition
        }}>
            {children}
        </CinematicContext.Provider>
    );
};

export const useCinematic = () => useContext(CinematicContext);
