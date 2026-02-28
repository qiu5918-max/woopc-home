import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export function AnimatedBackground() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      pulsePhase: number;
    }

    const particles: Particle[] = [];
    const particleCount = theme === 'night' ? 100 : 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Flowing lines
    const lines: { x: number; y: number; angle: number; speed: number; length: number }[] = [];
    for (let i = 0; i < 15; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.2,
        length: Math.random() * 100 + 50
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.016;
      ctx.fillStyle = theme === 'night' 
        ? 'rgba(10, 10, 15, 0.15)' 
        : 'rgba(248, 249, 252, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const isNight = theme === 'night';
      const primaryColor = isNight ? '23, 112, 247' : '23, 112, 247';
      const secondaryColor = isNight ? '139, 92, 246' : '255, 124, 1';

      // Draw flowing lines
      lines.forEach((line, i) => {
        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;

        if (line.x < -line.length) line.x = canvas.width + line.length;
        if (line.x > canvas.width + line.length) line.x = -line.length;
        if (line.y < -line.length) line.y = canvas.height + line.length;
        if (line.y > canvas.height + line.length) line.y = -line.length;

        const gradient = ctx.createLinearGradient(
          line.x - Math.cos(line.angle) * line.length,
          line.y - Math.sin(line.angle) * line.length,
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        );
        gradient.addColorStop(0, `rgba(${primaryColor}, 0)`);
        gradient.addColorStop(0.5, `rgba(${primaryColor}, ${0.15 + Math.sin(time + i) * 0.05})`);
        gradient.addColorStop(1, `rgba(${primaryColor}, 0)`);

        ctx.beginPath();
        ctx.moveTo(
          line.x - Math.cos(line.angle) * line.length,
          line.y - Math.sin(line.angle) * line.length
        );
        ctx.lineTo(
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Draw particles with pulse effect
      particles.forEach((particle, i) => {
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx -= (dx / distance) * force * 0.02;
          particle.vy -= (dy / distance) * force * 0.02;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Pulse size
        const pulseSize = particle.size + Math.sin(time * 2 + particle.pulsePhase) * 0.5;
        const pulseAlpha = particle.alpha + Math.sin(time * 1.5 + particle.pulsePhase) * 0.1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, Math.max(0.5, pulseSize), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${i % 3 === 0 ? secondaryColor : primaryColor}, ${Math.max(0.1, pulseAlpha)})`;
        ctx.fill();

        // Glow effect for larger particles
        if (particle.size > 2) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, pulseSize * 2, 0, Math.PI * 2);
          const glowGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, pulseSize * 2
          );
          glowGradient.addColorStop(0, `rgba(${primaryColor}, ${pulseAlpha * 0.3})`);
          glowGradient.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j += 2) {
          const other = particles[j];
          const pdx = other.x - particle.x;
          const pdy = other.y - particle.y;
          const pDistance = Math.sqrt(pdx * pdx + pdy * pdy);

          if (pDistance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            const opacity = (1 - pDistance / 120) * 0.15;
            ctx.strokeStyle = `rgba(${primaryColor}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      // Draw mouse ripple
      const rippleRadius = (time * 50) % 200;
      const rippleAlpha = 1 - rippleRadius / 200;
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, rippleRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${primaryColor}, ${rippleAlpha * 0.3})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
