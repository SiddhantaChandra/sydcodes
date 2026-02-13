'use client';

import { useEffect, useRef } from 'react';

export default function MeshGradient() {
  const canvasRef = useRef(null);

  const getColorVar = (varName) => {
    if (typeof window === 'undefined') return '#000000';
    const root = document.documentElement;
    const style = getComputedStyle(root);
    return style.getPropertyValue(varName).trim() || '#000000';
  };

  const parseColorToRgb = (color) => {
    if (!color) return { r: 0, g: 0, b: 0 };

    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      if (hex.length === 6) {
        return {
          r: parseInt(hex.slice(0, 2), 16),
          g: parseInt(hex.slice(2, 4), 16),
          b: parseInt(hex.slice(4, 6), 16),
        };
      }
      if (hex.length === 3) {
        return {
          r: parseInt(hex[0] + hex[0], 16),
          g: parseInt(hex[1] + hex[1], 16),
          b: parseInt(hex[2] + hex[2], 16),
        };
      }
    }

    const hslMatch = color.match(/([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/);
    if (hslMatch) {
      const h = parseFloat(hslMatch[1]);
      const s = parseFloat(hslMatch[2]) / 100;
      const l = parseFloat(hslMatch[3]) / 100;
      const k = (n) => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = (n) => l - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1));
      return {
        r: Math.round(255 * f(0)),
        g: Math.round(255 * f(8)),
        b: Math.round(255 * f(4)),
      };
    }

    return { r: 0, g: 0, b: 0 };
  };

  const toRgba = (rgb, alpha) => `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const primaryColor = getColorVar('--primary');
    const accentColor = getColorVar('--accent');

    const primaryRgb = parseColorToRgb(primaryColor);
    const accentRgb = parseColorToRgb(accentColor);

    const gradientPoints = [
      { x: 0.1, y: 0.1, vx: 0.0005, vy: 0.0003, color: primaryRgb },
      { x: 0.9, y: 0.2, vx: -0.0003, vy: 0.0007, color: accentRgb },
      { x: 0.8, y: 0.8, vx: -0.0006, vy: -0.0004, color: primaryRgb },
      { x: 0.2, y: 0.9, vx: 0.0004, vy: -0.0005, color: accentRgb },
      { x: 0.5, y: 0.5, vx: 0.0002, vy: 0.0006, color: primaryRgb },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      gradientPoints.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x <= 0 || point.x >= 1) point.vx *= -1;
        if (point.y <= 0 || point.y >= 1) point.vy *= -1;

        point.x = Math.max(0, Math.min(1, point.x));
        point.y = Math.max(0, Math.min(1, point.y));
      });

      gradientPoints.forEach(point => {
        const gradient = ctx.createRadialGradient(
          point.x * canvas.width,
          point.y * canvas.height,
          0,
          point.x * canvas.width,
          point.y * canvas.height,
          Math.min(canvas.width, canvas.height) * 0.6
        );

        gradient.addColorStop(0, toRgba(point.color, 0.16));
        gradient.addColorStop(0.5, toRgba(point.color, 0.08));
        gradient.addColorStop(1, toRgba(point.color, 0));

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
        background: 'linear-gradient(135deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35))',
        mixBlendMode: 'multiply',
        filter: 'blur(36px)',
      }}
    />
  );
} 