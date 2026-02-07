import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAnimating, setIsAnimating] = useState(false);
    const [transitionStage, setTransitionStage] = useState('idle'); // idle, briefing, warp, complete
    const [currentMission, setCurrentMission] = useState({
        text: 'MISSION: READY',
        color: '#00f0ff', // default cyan
        path: '/'
    });

    // Config for routes
    const routeConfig = {
        '/': { text: 'MISSION: RETURN TO BASE', color: '#00f0ff' }, // Cyan
        '/projects': { text: 'MISSION: ACCESS PROJECTS DATABASE', color: '#8A2BE2' }, // Purple
        '/skills': { text: 'MISSION: ANALYZE SKILL SYSTEMS', color: '#00f0ff' }, // Cyan
        '/certifications': { text: 'MISSION: VERIFY CERTIFICATIONS', color: '#00ff88' }, // Green
        '/achievements': { text: 'MISSION: REVIEW ACHIEVEMENTS', color: '#FFD700' }, // Gold
        '/journey': { text: 'MISSION: TRACE JOURNEY LOG', color: '#FF69B4' }, // Pink
        '/experience': { text: 'MISSION: SCAN EXPERIENCE FILES', color: '#FFA500' }, // Orange
        '/cv': { text: 'MISSION: LOAD CURRICULUM VITAE', color: '#008080' }, // Teal
        '/contact': { text: 'MISSION: INITIATE COMMUNICATION', color: '#FF0000' } // Red
    };

    const triggerTransition = (path) => {
        if (location.pathname === path) return; // Don't transition to same page

        const config = routeConfig[path] || { text: `MISSION: ACCESS ${path.replace('/', '').toUpperCase()}`, color: '#fff' };
        setCurrentMission({ ...config, path });

        setIsAnimating(true);
        setTransitionStage('briefing');

        // Sequence timing
        // 1. Briefing: 0s - 1.5s
        // 2. Warp Start: 1.5s

        setTimeout(() => {
            setTransitionStage('warp');
        }, 1500);

        // 3. Navigation happens slightly before end of warp for smoother load
        setTimeout(() => {
            navigate(path);
        }, 3500);

        // 4. End Animation
        setTimeout(() => {
            setIsAnimating(false);
            setTransitionStage('idle');
        }, 4500);
    };

    return (
        <TransitionContext.Provider value={{ isAnimating, transitionStage, currentMission, triggerTransition }}>
            {children}
        </TransitionContext.Provider>
    );
};

export const usePageTransition = () => useContext(TransitionContext);
