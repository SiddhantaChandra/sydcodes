'use client';

import { useEffect, useRef } from 'react';

export default function MeshGradient() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Gradient points
    const gradientPoints = [
      { x: 0.1, y: 0.1, vx: 0.0005, vy: 0.0003, color: '#0066FF' },
      { x: 0.9, y: 0.2, vx: -0.0003, vy: 0.0007, color: '#00FF88' },
      { x: 0.8, y: 0.8, vx: -0.0006, vy: -0.0004, color: '#0066FF' },
      { x: 0.2, y: 0.9, vx: 0.0004, vy: -0.0005, color: '#00FF88' },
      { x: 0.5, y: 0.5, vx: 0.0002, vy: 0.0006, color: '#0066FF' },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update gradient points
      gradientPoints.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x <= 0 || point.x >= 1) point.vx *= -1;
        if (point.y <= 0 || point.y >= 1) point.vy *= -1;

        // Keep within bounds
        point.x = Math.max(0, Math.min(1, point.x));
        point.y = Math.max(0, Math.min(1, point.y));
      });

      // Create radial gradients for each point
      gradientPoints.forEach(point => {
        const gradient = ctx.createRadialGradient(
          point.x * canvas.width,
          point.y * canvas.height,
          0,
          point.x * canvas.width,
          point.y * canvas.height,
          Math.min(canvas.width, canvas.height) * 0.6
        );

        gradient.addColorStop(0, point.color + '40'); // 25% opacity
        gradient.addColorStop(0.5, point.color + '20'); // 12.5% opacity
        gradient.addColorStop(1, point.color + '00'); // 0% opacity

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'multiply',
        filter: 'blur(40px)',
      }}
    />
  );
} 