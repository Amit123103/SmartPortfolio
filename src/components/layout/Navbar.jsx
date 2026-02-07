import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navConfig } from './navConfig';
import styles from './Navbar.module.css';
import { useCinematic } from '../../context/CinematicContext';


const Navbar = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();
    const { triggerTransition } = useCinematic();

    const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
    const closeMobile = () => setIsMobileOpen(false);

    const handleNavigation = (e, path) => {
        e.preventDefault();
        if (location.pathname === path) return;
        closeMobile();
        triggerTransition(path);
    };

    // Animation variants
    const menuVariants = {
        closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
        open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
    };

    const itemVariants = {
        closed: { opacity: 0, x: 50 },
        open: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.05 + 0.2 }
        })
    };

    return (
        <>
            <nav className={styles.navbar}>
                <a href="/" className={styles.logo} onClick={(e) => handleNavigation(e, '/')}>
                    PORTFOLIO
                </a>

                {/* Desktop Menu */}
                <div className={styles.desktopMenu}>
                    {navConfig.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <a
                                key={item.path}
                                href={item.path}
                                className={`${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
                                style={isActive ? { borderColor: item.color, boxShadow: `0 0 10px ${item.color}40` } : {}}
                                onClick={(e) => handleNavigation(e, item.path)}
                            >
                                <motion.span
                                    className={styles.icon}
                                    animate={isActive ? { rotate: [0, -10, 10, 0], scale: 1.1 } : {}}
                                    style={{ color: isActive ? item.color : 'inherit' }}
                                >
                                    {item.icon}
                                </motion.span>
                                {item.name}
                            </a>
                        );
                    })}
                </div>

                {/* Mobile Toggle */}
                <button className={styles.mobileToggle} onClick={toggleMobile} aria-label="Toggle Menu">
                    {isMobileOpen ? '✕' : '☰'}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        {navConfig.map((item, i) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <motion.div
                                    key={item.path}
                                    custom={i}
                                    variants={itemVariants}
                                >
                                    <a
                                        href={item.path}
                                        className={styles.mobileLink}
                                        onClick={(e) => handleNavigation(e, item.path)}
                                        style={{ color: isActive ? item.color : '#fff' }}
                                    >
                                        <span style={{ color: item.color }}>{item.icon}</span>
                                        {item.name}
                                    </a>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
