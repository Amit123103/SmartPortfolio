import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const HeroLimb = ({ position, args, color, rotation }) => {
    return (
        <mesh position={position} rotation={rotation}>
            <boxGeometry args={args} />
            <meshStandardMaterial color={color} roughness={0.4} metalness={0.5} />
        </mesh>
    );
};

const SpiderHero = ({ action }) => {
    const group = useRef();
    const headRef = useRef();
    const leftArmRef = useRef();
    const rightArmRef = useRef();
    const leftLegRef = useRef();
    const rightLegRef = useRef();

    useFrame((state) => {
        if (!group.current) return;
        const t = state.clock.getElapsedTime();

        // General Float
        group.current.position.y = Math.sin(t * 3) * 0.1;

        // ANIMATION STATE MACHINE
        if (action === 'JUMP') {
            // SKYDIVE POSE
            group.current.rotation.x = Math.PI / 2; // Flat on stomach

            // Arms out
            leftArmRef.current.rotation.z = 0.5;
            leftArmRef.current.rotation.y = 0.5;
            rightArmRef.current.rotation.z = -0.5;
            rightArmRef.current.rotation.y = -0.5;

            // Legs back
            leftLegRef.current.rotation.x = 0.5;
            leftLegRef.current.rotation.z = 0.2;
            rightLegRef.current.rotation.x = 0.5;
            rightLegRef.current.rotation.z = -0.2;

            // Head up looking forward
            headRef.current.rotation.x = -Math.PI / 3;

        } else if (action === 'WEB') {
            // SHOOTING POSE
            group.current.rotation.x = Math.PI / 4; // Angled Up

            // Right arm shoots
            rightArmRef.current.rotation.x = -Math.PI / 2;
            rightArmRef.current.rotation.z = 0;

            // Left arm stabilizes
            leftArmRef.current.rotation.z = 0.5;

            // Legs Action
            leftLegRef.current.rotation.x = 0.5;
            rightLegRef.current.rotation.x = -0.5; // One knee up

            headRef.current.rotation.x = 0;
        } else {
            // IDLE / SWING (Crouch)
            group.current.rotation.x = 0;
            leftArmRef.current.rotation.z = 0.2;
            rightArmRef.current.rotation.z = -0.2;
            leftLegRef.current.rotation.x = -0.2;
            rightLegRef.current.rotation.x = -0.2;
        }
    });

    const red = "#ef233c";
    const blue = "#0077b6";
    const eyeWhite = "#ffffff";
    const eyeBlack = "#111111";

    return (
        <group ref={group}>
            {/* TORSO GROUP */}
            <group position={[0, 0, 0]}>
                {/* Upper Chest (Red) */}
                <HeroLimb position={[0, 0.4, 0]} args={[0.5, 0.5, 0.3]} color={red} />
                {/* Spider Symbol (Front) */}
                <mesh position={[0, 0.4, 0.16]}>
                    <circleGeometry args={[0.1, 32]} />
                    <meshBasicMaterial color="black" />
                </mesh>
                {/* Abdomen (Blue) */}
                <HeroLimb position={[0, 0, 0]} args={[0.45, 0.4, 0.28]} color={blue} />
                {/* Belt (Red) */}
                <HeroLimb position={[0, -0.25, 0]} args={[0.46, 0.1, 0.3]} color={red} />
            </group>

            {/* HEAD */}
            <group ref={headRef} position={[0, 0.8, 0]}>
                <mesh>
                    <sphereGeometry args={[0.25, 32, 32]} />
                    <meshStandardMaterial color={red} roughness={0.3} metalness={0.1} />
                </mesh>
                {/* EYES */}
                <group position={[0, 0.05, 0.2]} rotation={[0, 0, 0]}>
                    {/* Left Eye */}
                    <mesh position={[0.1, 0, 0]} rotation={[0, 0.3, -0.2]}>
                        <planeGeometry args={[0.15, 0.2]} />
                        <meshBasicMaterial color={eyeWhite} side={THREE.DoubleSide} />
                    </mesh>
                    {/* Right Eye */}
                    <mesh position={[-0.1, 0, 0]} rotation={[0, -0.3, 0.2]}>
                        <planeGeometry args={[0.15, 0.2]} />
                        <meshBasicMaterial color={eyeWhite} side={THREE.DoubleSide} />
                    </mesh>
                </group>
            </group>

            {/* ARMS */}
            <group ref={leftArmRef} position={[0.35, 0.5, 0]}>
                {/* Shoulder (Red) */}
                <HeroLimb position={[0.1, -0.1, 0]} args={[0.2, 0.3, 0.2]} color={red} />
                {/* Forearm (Blue) */}
                <HeroLimb position={[0.15, -0.4, 0]} args={[0.15, 0.35, 0.15]} color={blue} />
                {/* Glove (Red) */}
                <HeroLimb position={[0.15, -0.65, 0]} args={[0.18, 0.2, 0.18]} color={red} />
            </group>

            <group ref={rightArmRef} position={[-0.35, 0.5, 0]}>
                <HeroLimb position={[-0.1, -0.1, 0]} args={[0.2, 0.3, 0.2]} color={red} />
                <HeroLimb position={[-0.15, -0.4, 0]} args={[0.15, 0.35, 0.15]} color={blue} />
                <HeroLimb position={[-0.15, -0.65, 0]} args={[0.18, 0.2, 0.18]} color={red} />
            </group>

            {/* LEGS */}
            <group ref={leftLegRef} position={[0.15, -0.3, 0]}>
                {/* Thigh (Blue) */}
                <HeroLimb position={[0, -0.3, 0]} args={[0.2, 0.6, 0.2]} color={blue} />
                {/* Boot (Red) */}
                <HeroLimb position={[0, -0.7, 0]} args={[0.22, 0.4, 0.25]} color={red} />
            </group>

            <group ref={rightLegRef} position={[-0.15, -0.3, 0]}>
                <HeroLimb position={[0, -0.3, 0]} args={[0.2, 0.6, 0.2]} color={blue} />
                <HeroLimb position={[0, -0.7, 0]} args={[0.22, 0.4, 0.25]} color={red} />
            </group>
        </group>
    );
};

export default SpiderHero;
