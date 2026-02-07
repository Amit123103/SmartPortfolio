import React, { useEffect, useRef } from 'react';

const AIAvatar = ({ mood = 'neutral' }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Simple Sci-Fi Avatar Circle
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 80;

            // Glow
            ctx.shadowBlur = 20;
            ctx.shadowColor = mood === 'listening' ? '#00f0ff' : '#00ff88';

            // Base Circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = mood === 'listening' ? '#00f0ff' : '#00ff88';
            ctx.lineWidth = 4;
            ctx.stroke();

            // Inner "Eye" / Pulse
            ctx.beginPath();
            const pulse = 10 + Math.sin(Date.now() / 300) * 5;
            ctx.arc(centerX, centerY, pulse, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.fill();

            // Sound Waves (simulated)
            if (mood === 'listening') {
                // draws simple frequency bars
                // ...
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animationFrameId);
    }, [mood]);

    return (
        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
            <canvas ref={canvasRef} width={300} height={300} style={{ width: '100%', maxWidth: '300px' }} />
        </div>
    );
};

export default AIAvatar;
