import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import styles from './ProfileSection.module.css';

// TODO: To use your own image:
// 1. Place your image file (e.g., 'profile.png') in src/assets/
// 2. Uncomment the line below:
import profileImg from '../../assets/profile.jpg';
// ...
// src={profileImg}

const ProfileSection = () => {
    // Refs
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    // Mouse Interaction State (Framer Motion Values for performance)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // 3D Tilt Logic
    // We map mouse position (-1 to 1) to rotation degrees
    const rotateX = useTransform(y, [-1, 1], [15, -15]); // Inverted for natural tilt
    const rotateY = useTransform(x, [-1, 1], [-15, 15]);

    // Smooth Transition (Spring)
    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    // Mouse Move Handler
    const handleMouseMove = (e) => {
        const rect = containerRef.current.getBoundingClientRect();

        // Calculate normalized position -1 to 1 (relative to center of image)
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width - 0.5) * 2;
        const yPct = (mouseY / height - 0.5) * 2;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Scroll Interaction
    const { scrollYProgress } = useScroll(); // Global scroll
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // Particle Halo Effect (Canvas)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.offsetWidth + 100; // Extra padding
        let height = canvas.height = canvas.parentElement.offsetHeight + 100;

        const particles = [];
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.1,
                angle: Math.random() * Math.PI * 2, // Orbit angle
                radius: 120 + Math.random() * 40 // Orbit radius
            });
        }

        let animationFrame;

        const render = () => {
            // Resize check
            if (canvas.width !== canvas.parentElement.offsetWidth + 100) {
                width = canvas.width = canvas.parentElement.offsetWidth + 100;
                height = canvas.height = canvas.parentElement.offsetHeight + 100;
            }

            ctx.clearRect(0, 0, width, height);

            // Mouse Influence
            const centerX = width / 2;
            const centerY = height / 2;
            const mouseOffsetX = x.get() * 20; // React to framer motion value
            const mouseOffsetY = y.get() * 20;

            particles.forEach(p => {
                // Orbit logic
                p.angle += 0.005;

                // Position calc: Center + Orbit + Mouse Influence
                const targetX = centerX + Math.cos(p.angle) * p.radius - mouseOffsetX;
                const targetY = centerY + Math.sin(p.angle) * p.radius - mouseOffsetY;

                // Ease particle to position
                p.x += (targetX - p.x) * 0.05;
                p.y += (targetY - p.y) * 0.05;

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 255, ${p.alpha})`; // Cyan theme
                ctx.fill();
            });

            animationFrame = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrame);
    }, []); // Run once on mount

    return (
        <motion.div
            className={styles.profileContainer}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                scale,
                opacity,
                rotateX: rotateXSpring,
                rotateY: rotateYSpring
            }}
        >
            {/* Animated Gradient Background */}
            <div className={styles.gradientBackground} />

            {/* Particle Canvas Layer */}
            <canvas ref={canvasRef} className={styles.particleCanvas} />

            {/* Main Image Wrapper */}
            <motion.div
                className={styles.imageWrapper}
                style={{
                    transformStyle: "preserve-3d",
                    z: 50 // Pop out effect
                }}
            >
                <img
                    src={profileImg}
                    alt="Profile"
                    className={styles.profileImage}
                />
            </motion.div>

            {/* Decorative Glow Ring */}
            <div className={styles.glowRing} />
        </motion.div>
    );
};

export default ProfileSection;
