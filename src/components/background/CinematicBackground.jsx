import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * CINEMATIC FUTURE BACKGROUND
 * 
 * A high-performance, native Three.js background system.
 * Features:
 * - Infinite vertical scrolling loop
 * - Multi-layer depth (Fog, Particles, Holographic Panels)
 * - Mouse-reactive parallax
 * - Scroll-synced integration
 * - GPU-optimized shaders
 */
const CinematicBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        // -------------------------------------------------------------------------
        // 1. SCENE SETUP
        // -------------------------------------------------------------------------
        const scene = new THREE.Scene();
        // Deep cinematic fog for volumetric feel
        scene.fog = new THREE.FogExp2(0x050505, 0.002);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
        mount.appendChild(renderer.domElement);

        // -------------------------------------------------------------------------
        // 2. STATE & INTERACTION
        // -------------------------------------------------------------------------
        const state = {
            time: 0,
            scrollY: 0,
            mouse: new THREE.Vector2(0, 0),
            targetMouse: new THREE.Vector2(0, 0)
        };

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const handleMouseMove = (e) => {
            // Normalize mouse -1 to 1
            state.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            state.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        const handleScroll = () => {
            // Map scroll to infinite space logic if needed, 
            // for now we just capture normalized scroll progress roughly
            state.scrollY = window.scrollY;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        // -------------------------------------------------------------------------
        // 3. SHADERS (GLSL)
        // -------------------------------------------------------------------------

        // COMMON VERTEX SHADER FOR PARTICLES
        const particleVertexShader = `
            uniform float uTime;
            uniform float uScroll;
            uniform float uSpeed;
            attribute float aSize;
            attribute float aRandom;
            
            varying float vAlpha;
            varying vec3 vColor;

            void main() {
                // Initial position
                vec3 pos = position;
                
                // Infinite Vertical Scroll Logic
                // We move y based on time and scroll, then wrap it modulo height
                float scrollOffset = uTime * uSpeed + uScroll * 0.05;
                float height = 200.0; // The defined bounding box height
                
                // Apply movement
                pos.y -= scrollOffset;
                
                // Wrap around (Modulo logic in shader)
                // Offset by height/2 to center, mod, then un-offset
                pos.y = mod(pos.y + height * 0.5, height) - height * 0.5;
                
                // Add some wave x movement
                pos.x += sin(uTime * 0.5 + pos.y * 0.05) * 0.5;

                // Parallax depth effect based on Z
                float zFactor = (50.0 - pos.z) / 50.0; // tighter parallax for closer objects
                
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_Position = projectionMatrix * mvPosition;
                
                // Size attenuation
                gl_PointSize = aSize * (300.0 / -mvPosition.z);
                
                // Fade out at edges of vertical range
                float edge = 1.0 - smoothstep(0.0, 0.2, abs(pos.y) / (height * 0.5));
                
                vAlpha = edge;
            }
        `;

        // COMMON FRAGMENT SHADER FOR PARTICLES
        const particleFragmentShader = `
            uniform vec3 uColor;
            varying float vAlpha;

            void main() {
                // Soft circle glow
                float r = distance(gl_PointCoord, vec2(0.5));
                if (r > 0.5) discard;
                
                // Soft glow falloff
                float glow = 1.0 - (r * 2.0);
                glow = pow(glow, 1.5);

                gl_FragColor = vec4(uColor, vAlpha * glow);
            }
        `;

        // -------------------------------------------------------------------------
        // 4. PARTICLE SYSTEMS CREATION
        // -------------------------------------------------------------------------

        const createParticleSystem = (count, color, sizeRange, speed, zRange) => {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(count * 3);
            const sizes = new Float32Array(count);
            const randoms = new Float32Array(count);

            for (let i = 0; i < count; i++) {
                // X: Wide spread
                positions[i * 3] = (Math.random() - 0.5) * 150;
                // Y: Full height for looping (height set to 200 in shader)
                positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
                // Z: Depth range
                positions[i * 3 + 2] = zRange.min + Math.random() * (zRange.max - zRange.min);

                sizes[i] = sizeRange.min + Math.random() * (sizeRange.max - sizeRange.min);
                randoms[i] = Math.random();
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
            geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

            const material = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uScroll: { value: 0 },
                    uSpeed: { value: speed },
                    uColor: { value: new THREE.Color(color) }
                },
                vertexShader: particleVertexShader,
                fragmentShader: particleFragmentShader,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });

            const points = new THREE.Points(geometry, material);
            scene.add(points);
            return { mesh: points, material: material };
        };

        // --- LAYER 1: Background Dust (Dense, slow, deep) ---
        const bgParams = window.innerWidth < 768
            ? { count: 1000, size: { min: 0.1, max: 0.5 } } // Mobile
            : { count: 4000, size: { min: 0.2, max: 0.8 } }; // Desktop

        const bgLayer = createParticleSystem(
            bgParams.count,
            0x004455, // Deep Teal
            bgParams.size,
            2.0,      // Slow speed
            { min: -50, max: 0 }
        );

        // --- LAYER 2: Foreground Embers (Sparse, fast, close) ---
        const fgParams = window.innerWidth < 768
            ? { count: 200, size: { min: 0.2, max: 0.6 } }
            : { count: 800, size: { min: 0.4, max: 1.2 } };

        const fgLayer = createParticleSystem(
            fgParams.count,
            0x00ffff, // Cyan/Bright
            fgParams.size,
            6.0,      // Fast speed
            { min: 10, max: 40 }
        );

        // --- LAYER 3: Holographic Panels (Midground Geometry) ---
        // Replacing this with simple floating plane mechanics for better performance than complex geometry
        const panelGeometry = new THREE.PlaneGeometry(2, 4);
        const panelMaterial = new THREE.MeshBasicMaterial({
            color: 0x0088aa,
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const panels = [];
        const panelCount = 15;

        for (let i = 0; i < panelCount; i++) {
            const mesh = new THREE.Mesh(panelGeometry, panelMaterial);

            // Random initial placement
            mesh.position.x = (Math.random() - 0.5) * 80;
            mesh.position.y = (Math.random() - 0.5) * 200;
            mesh.position.z = (Math.random() - 0.5) * 20;

            // Random properties for animation
            mesh.userData = {
                speed: 1 + Math.random() * 2,
                rotSpeed: (Math.random() - 0.5) * 0.02,
                initialX: mesh.position.x
            };

            scene.add(mesh);
            panels.push(mesh);
        }

        // -------------------------------------------------------------------------
        // 5. ANIMATION LOOP
        // -------------------------------------------------------------------------
        let animationId;
        const clock = new THREE.Clock();

        const animate = () => {
            const delta = clock.getDelta();
            state.time += delta;

            // 1. Mouse Smooth Interpolation (Lerp)
            state.mouse.x += (state.targetMouse.x - state.mouse.x) * 0.05;
            state.mouse.y += (state.targetMouse.y - state.mouse.y) * 0.05;

            // 2. Camera Parallax
            // Subtle movement based on mouse
            camera.position.x = state.mouse.x * 2;
            camera.position.y = state.mouse.y * 2;
            camera.lookAt(0, 0, 0);

            // 3. Update Particle Uniforms
            bgLayer.material.uniforms.uTime.value = state.time;
            bgLayer.material.uniforms.uScroll.value = state.scrollY;

            fgLayer.material.uniforms.uTime.value = state.time;
            fgLayer.material.uniforms.uScroll.value = state.scrollY;

            // 4. Update Panels (Manual CPU looping for these few objects)
            const height = 200; // Same as shader height
            const currentScrollY = state.scrollY * 0.05;

            panels.forEach(p => {
                // Vertical Flow
                // We calculate a y position that moves down over time
                const moveY = (state.time * p.userData.speed) + currentScrollY;

                // Wrap logic similar to shader
                // The 'initial' y plus movement, wrapped
                let y = p.position.y - (delta * p.userData.speed * 5); // Simple move down

                if (y < -100) y = 100; // Reset to top

                p.position.y = y;

                // Rotate
                p.rotation.y += p.userData.rotSpeed;
                p.rotation.z += p.userData.rotSpeed * 0.5;

                // Simple opacity fade at edges
                const distY = Math.abs(p.position.y);
                const alpha = 1.0 - THREE.MathUtils.smoothstep(distY, 50, 90);
                p.material.opacity = 0.1 * alpha;
            });

            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };

        animate();

        // -------------------------------------------------------------------------
        // 6. CLEANUP
        // -------------------------------------------------------------------------
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animationId);

            mount.removeChild(renderer.domElement);

            // Dispose Three.js resources
            bgLayer.mesh.geometry.dispose();
            bgLayer.material.dispose();
            fgLayer.mesh.geometry.dispose();
            fgLayer.material.dispose();

            panels.forEach(p => {
                p.geometry.dispose();
                // Material is shared, dispose once if needed, or rely on garbage collection
            });
            panelGeometry.dispose();
            panelMaterial.dispose();

            renderer.dispose();
        };

    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1, // Behind everything
                background: '#050505', // Base dark color
                pointerEvents: 'none' // Allow clicks to pass through
            }}
        />
    );
};

export default CinematicBackground;
