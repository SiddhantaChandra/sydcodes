'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function MeshGradient() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const { theme } = useTheme();

  // Helper to get CSS variable value
  const getColorVar = (varName) => {
    if (typeof window === 'undefined') return '#000000';
    const root = document.documentElement;
    const style = getComputedStyle(root);
    return style.getPropertyValue(varName).trim() || '#000000';
  };

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

    // Get current colors from CSS variables
    const primaryColor = getColorVar('--primary');
    const accentColor = getColorVar('--accent');

    // Helper: Convert hex or hsl to rgba string with alpha
    function colorToRgba(color, alpha) {
      // If color is hex
      if (color.startsWith('#')) {
        let r = 0, g = 0, b = 0;
        if (color.length === 7) {
          r = parseInt(color.slice(1, 3), 16);
          g = parseInt(color.slice(3, 5), 16);
          b = parseInt(color.slice(5, 7), 16);
        } else if (color.length === 4) {
          r = parseInt(color[1] + color[1], 16);
          g = parseInt(color[2] + color[2], 16);
          b = parseInt(color[3] + color[3], 16);
        }
        return `rgba(${r},${g},${b},${alpha})`;
      }
      // If color is hsl
      if (color.match(/\d+\s+\d+%\s+\d+%/)) {
        // hsl: '221.2 83.2% 53.3%'
        const [h, s, l] = color.split(/\s|%/).filter(Boolean).map(Number);
        // Convert HSL to RGB
        const a = s / 100;
        const b = l / 100;
        const k = n => (n + h / 30) % 12;
        const f = b - a * Math.min(b, 1 - b);
        const rgb = [0, 8, 4].map(n => {
          const color = b - f * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);
          return Math.round(255 * color);
        });
        return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
      }
      // fallback
      return color;
    }

    // If the color is in hsl, convert to hex, else use as is
    const parseColor = (color) => {
      if (color.match(/\d+\s+\d+%\s+\d+%/)) {
        return colorToRgba(color, 1);
      }
      return colorToRgba(color, 1);
    };

    const primaryHex = parseColor(primaryColor);
    const accentHex = parseColor(accentColor);

    // Gradient points
    const gradientPoints = [
      { x: 0.1, y: 0.1, vx: 0.0005, vy: 0.0003, color: primaryHex },
      { x: 0.9, y: 0.2, vx: -0.0003, vy: 0.0007, color: accentHex },
      { x: 0.8, y: 0.8, vx: -0.0006, vy: -0.0004, color: primaryHex },
      { x: 0.2, y: 0.9, vx: 0.0004, vy: -0.0005, color: accentHex },
      { x: 0.5, y: 0.5, vx: 0.0002, vy: 0.0006, color: primaryHex },
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

        gradient.addColorStop(0, colorToRgba(point.color, 0.25)); // 25% opacity
        gradient.addColorStop(0.5, colorToRgba(point.color, 0.125)); // 12.5% opacity
        gradient.addColorStop(1, colorToRgba(point.color, 0)); // 0% opacity

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