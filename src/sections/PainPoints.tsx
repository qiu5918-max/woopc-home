import { useEffect, useRef } from 'react';
import { MonitorX, Target, UserX, Wallet, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TiltCard } from '@/components/TiltCard';

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
  {
    icon: MonitorX,
    title: '品牌无展示',
    description: '缺乏专业数字化载体，无法清晰传递专业能力、服务优势，难以建立客户信任',
    color: '#ef4444',
    glowColor: '239, 68, 68'
  },
  {
    icon: Target,
    title: '获客效率低',
    description: '依赖传统模式，获客成本高、精准度低，线索获取困难，增长乏力',
    color: '#f97316',
    glowColor: '249, 115, 22'
  },
  {
    icon: UserX,
    title: '线索难管理',
    description: '客户信息分散，无全流程追踪体系，易造成客户流失，转化受阻',
    color: '#eab308',
    glowColor: '234, 179, 8'
  },
  {
    icon: Wallet,
    title: '运营成本高',
    description: '缺乏轻量化工具，投入大量时间处理咨询、协同事务，效率低下',
    color: '#8b5cf6',
    glowColor: '139, 92, 246'
  },
  {
    icon: Cpu,
    title: '数字化薄弱',
    description: '无技术支撑，无法快速搭建适配多场景的数字化工具，错失潜在机会',
    color: '#06b6d4',
    glowColor: '6, 182, 212'
  }
];

export function PainPoints() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Cards animation with 3D flip
      const cards = cardsRef.current?.querySelectorAll('.pain-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 60, rotateX: 30, transformOrigin: 'center bottom' },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="painpoints"
      ref={sectionRef}
      className="section relative"
      style={{ background: 'var(--bg)' }}
    >
      {/* Background Elements */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(239, 68, 68, 0.08), transparent 60%)'
        }}
      />
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${20 + i * 15}%`,
              background: 'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.1), transparent)',
              animation: `slide-right ${8 + i * 2}s linear infinite`
            }}
          />
        ))}
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span 
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 animate-pulse"
            style={{ 
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}
          >
            成长困境
          </span>
          <h2 className="section-title" style={{ color: 'var(--text)' }}>
            OPC 超级个体，正面临这些
            <span className="gradient-text"> 成长困境</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4" style={{ color: 'var(--text-secondary)' }}>
            对于 B2B 销售、咨询顾问、行业专家等想要打造个人公司（OPC）的超级个体而言，数字化转型与商业增长面临多重瓶颈
          </p>
        </div>

        {/* Pain Points Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          style={{ perspective: '1500px' }}
        >
          {painPoints.map((point, index) => (
            <TiltCard 
              key={index} 
              className="pain-card h-full"
              tiltAmount={8}
              glowColor={point.glowColor}
            >
              <div
                className="relative p-6 sm:p-8 rounded-2xl h-full transition-all duration-500 group"
                style={{ 
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  transformStyle: 'preserve-3d'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = point.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                {/* Animated background gradient */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${point.color}15, transparent 60%)`
                  }}
                />

                {/* Icon with animation */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 relative"
                  style={{ 
                    background: `${point.color}15`,
                    boxShadow: `0 0 20px ${point.color}20`
                  }}
                >
                  <point.icon 
                    className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" 
                    style={{ color: point.color }} 
                  />
                  {/* Pulse ring */}
                  <div 
                    className="absolute inset-0 rounded-xl animate-ping opacity-30"
                    style={{ background: point.color, animationDuration: '2s' }}
                  />
                </div>

                {/* Content */}
                <h3 
                  className="text-xl font-bold mb-3 transition-colors duration-300"
                  style={{ color: 'var(--text)' }}
                >
                  {point.title}
                </h3>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {point.description}
                </p>

                {/* Bottom accent line */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"
                  style={{ background: point.color }}
                />

                {/* Corner accent */}
                <div 
                  className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: point.color, boxShadow: `0 0 10px ${point.color}` }}
                />
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Add keyframes for slide animation */}
      <style>{`
        @keyframes slide-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
