import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavOverlay = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const links = [
        { label: 'HOME', path: '/' },
        { label: 'PROJECTS', path: '/projects' },
        { label: 'SKILLS', path: '/skills' },
        { label: 'EXPERIENCE', path: '/experience' },
        { label: 'CONTACT', path: '/contact' }
    ];

    const handleNav = (path) => {
        // Standard navigation, skipping the cinematic trigger
        navigate(path);
    };

    return (
        <nav style={{
            position: 'fixed', top: '2rem', right: '2rem', zIndex: 100,
            display: 'flex', flexDirection: 'column', gap: '1rem',
            alignItems: 'flex-end'
        }}>
            {links.map((link) => (
                <button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    style={{
                        color: location.pathname === link.path ? '#4ADE80' : 'white',
                        fontSize: '1rem', fontWeight: 'bold', letterSpacing: '2px',
                        textShadow: location.pathname === link.path ? '0 0 10px #4ADE80' : 'none',
                        transition: 'all 0.3s ease',
                        opacity: 0.8
                    }}
                    onMouseEnter={(e) => { e.target.style.opacity = 1; e.target.style.transform = 'translateX(-5px)'; }}
                    onMouseLeave={(e) => { e.target.style.opacity = 0.8; e.target.style.transform = 'none'; }}
                >
                    {link.label}
                </button>
            ))}
        </nav>
    );
};

export default NavOverlay;
