import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Users, TrendingUp, Shield } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import gsap from 'gsap';
import { TypewriterText } from '@/components/TypewriterText';

export function Hero() {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Enhanced Particle Animation
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

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      pulsePhase: number;
      color: string;
    }

    const particles: Particle[] = [];
    const particleCount = theme === 'night' ? 120 : 80;
    const colors = theme === 'night' 
      ? ['177, 197, 255', '139, 92, 246', '6, 182, 212']
      : ['23, 112, 247', '255, 124, 1', '16, 185, 129'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 4 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Flowing waves
    const waves: { offset: number; speed: number; amplitude: number; y: number }[] = [];
    for (let i = 0; i < 5; i++) {
      waves.push({
        offset: i * 0.5,
        speed: 0.02 + i * 0.005,
        amplitude: 30 + i * 10,
        y: canvas.height * (0.3 + i * 0.1)
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isNight = theme === 'night';

      // Draw flowing waves
      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);
        
        for (let x = 0; x < canvas.width; x += 5) {
          const y = wave.y + Math.sin((x * 0.003) + time * wave.speed + wave.offset) * wave.amplitude;
          ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, wave.y + wave.amplitude);
        gradient.addColorStop(0, `rgba(23, 112, 247, ${isNight ? 0.03 : 0.05})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${isNight ? 0.02 : 0.03})`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.strokeStyle = `rgba(23, 112, 247, ${isNight ? 0.1 : 0.15})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw particles with enhanced effects
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Pulse size and alpha
        const pulseSize = particle.size + Math.sin(time * 3 + particle.pulsePhase) * 1;
        const pulseAlpha = particle.alpha + Math.sin(time * 2 + particle.pulsePhase) * 0.15;

        // Glow effect
        const glowRadius = pulseSize * 3;
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowRadius
        );
        glowGradient.addColorStop(0, `rgba(${particle.color}, ${Math.max(0, pulseAlpha * 0.5)})`);
        glowGradient.addColorStop(0.5, `rgba(${particle.color}, ${Math.max(0, pulseAlpha * 0.2)})`);
        glowGradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, Math.max(0.5, pulseSize), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${Math.max(0.1, pulseAlpha)})`;
        ctx.fill();

        // Connect nearby particles with gradient lines
        for (let j = i + 1; j < particles.length; j += 2) {
          const other = particles[j];
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const lineGradient = ctx.createLinearGradient(
              particle.x, particle.y,
              other.x, other.y
            );
            const opacity = (1 - distance / 150) * 0.2;
            lineGradient.addColorStop(0, `rgba(${particle.color}, ${opacity})`);
            lineGradient.addColorStop(1, `rgba(${other.color}, ${opacity})`);

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      // Animated rings
      for (let i = 0; i < 3; i++) {
        const ringRadius = ((time * 30 + i * 100) % 300);
        const ringAlpha = 1 - ringRadius / 300;
        const centerX = canvas.width / 2 + mousePos.x * 50;
        const centerY = canvas.height / 2 + mousePos.y * 50;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(23, 112, 247, ${ringAlpha * 0.15})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [theme, mousePos]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with character stagger
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );
      
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out', delay: 0.5 }
      );
      
      gsap.fromTo(buttonsRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.7 }
      );
      
      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.9 }
      );

      // Animate stats cards with stagger
      const statCards = statsRef.current?.querySelectorAll('.stat-card');
      if (statCards) {
        gsap.fromTo(statCards,
          { opacity: 0, y: 30, rotateY: -15 },
          { 
            opacity: 1, 
            y: 0, 
            rotateY: 0,
            duration: 0.8, 
            stagger: 0.15, 
            ease: 'power3.out',
            delay: 1.1 
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Users, value: '10,000+', label: '服务用户' },
    { icon: TrendingUp, value: '300%', label: '获客提升' },
    { icon: Shield, value: '99.9%', label: '系统稳定' },
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Animated Gradient Orbs with mouse parallax */}
      <div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-40"
        style={{ 
          background: 'radial-gradient(circle, var(--gradient-start), transparent 70%)',
          transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
          transition: 'transform 0.3s ease-out',
          animation: 'pulse-glow 4s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-30"
        style={{ 
          background: 'radial-gradient(circle, var(--accent-secondary), transparent 70%)',
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
          transition: 'transform 0.3s ease-out',
          animation: 'pulse-glow 5s ease-in-out infinite 1s'
        }}
      />
      <div 
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full blur-3xl opacity-20"
        style={{ 
          background: 'radial-gradient(circle, #8b5cf6, transparent 70%)',
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * -15}px)`,
          transition: 'transform 0.3s ease-out',
          animation: 'pulse-glow 6s ease-in-out infinite 0.5s'
        }}
      />

      {/* Grid Background with animation */}
      <div 
        className="absolute inset-0 grid-bg opacity-60"
        style={{ 
          zIndex: 0,
          transform: `perspective(1000px) rotateX(${mousePos.y * 2}deg) rotateY(${mousePos.x * 2}deg)`,
          transition: 'transform 0.5s ease-out'
        }}
      />

      {/* Scan line effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 50%, rgba(23, 112, 247, 0.1) 50%)',
          backgroundSize: '100% 4px',
          zIndex: 2
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge with glow */}
          <div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 animate-fade-in glow-pulse"
            style={{ 
              background: 'rgba(23, 112, 247, 0.1)',
              border: '1px solid rgba(23, 112, 247, 0.3)',
              boxShadow: '0 0 20px rgba(23, 112, 247, 0.2)'
            }}
          >
            <Sparkles className="w-4 h-4 text-[var(--accent)] animate-pulse" />
            <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
              <TypewriterText text="AI 驱动 · 一人一企 · 一站聚合" speed={40} delay={500} />
            </span>
          </div>

          {/* Title with enhanced styling */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            style={{ color: 'var(--text)' }}
          >
            <span className="block relative">
              WooPC
              <span 
                className="absolute -inset-1 blur-2xl opacity-30"
                style={{ background: 'linear-gradient(90deg, var(--gradient-start), var(--gradient-end))' }}
              />
            </span>
            <span className="block mt-2 gradient-text animate-gradient">
              AI驱动的个人创业者
            </span>
            <span className="block mt-2" style={{ color: 'var(--text)' }}>
              微站赋能平台
            </span>
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10"
            style={{ color: 'var(--text-secondary)' }}
          >
            聚焦 One Personal Company（OPC）超级个体，用技术赋能每一位个人创业者实现高效获客与品牌成长
          </p>

          {/* Buttons with enhanced hover */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="http://admin.woopc.com/quick-start"
              className="btn-primary flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <span className="relative z-10">立即开始</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#painpoints"
              className="btn-secondary group"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#painpoints')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10">了解更多</span>
            </a>
          </div>

          {/* Stats with 3D effect */}
          <div 
            ref={statsRef}
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
            style={{ perspective: '1000px' }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-110 relative group"
                style={{ 
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              >
                {/* Hover glow */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(23, 112, 247, 0.2), transparent 70%)'
                  }}
                />
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-[var(--accent)] relative z-10 group-hover:scale-110 transition-transform" />
                <div className="text-2xl sm:text-3xl font-bold gradient-text relative z-10">{stat.value}</div>
                <div className="text-xs sm:text-sm mt-1 relative z-10" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ 
          background: 'linear-gradient(to top, var(--bg), transparent)',
          zIndex: 5
        }}
      />

      {/* Corner decorations */}
      <div 
        className="absolute top-20 left-10 w-20 h-20 border-l-2 border-t-2 opacity-20"
        style={{ borderColor: 'var(--accent)', animation: 'pulse-glow 3s infinite' }}
      />
      <div 
        className="absolute bottom-20 right-10 w-20 h-20 border-r-2 border-b-2 opacity-20"
        style={{ borderColor: 'var(--accent)', animation: 'pulse-glow 3s infinite 1.5s' }}
      />
    </section>
  );
}
