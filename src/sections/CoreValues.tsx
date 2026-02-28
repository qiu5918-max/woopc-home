import { useEffect, useRef, useState } from 'react';
import { TrendingDown, TrendingUp, Award, RefreshCw, Settings, Sparkles, User, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TiltCard } from '@/components/TiltCard';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: TrendingDown,
    title: '降本增效',
    description: '零代码建站，自动化处理咨询、线索管理，节省时间与人力成本',
    color: '#10b981',
    glowColor: '16, 185, 129'
  },
  {
    icon: TrendingUp,
    title: '提升转化',
    description: '专业展示+智能匹配，缩短转化链路，增强客户信任，提升转化效率',
    color: '#f97316',
    glowColor: '249, 115, 22'
  },
  {
    icon: Award,
    title: '打造品牌',
    description: '个性化微网站，助力 OPC 打造差异化专业品牌，增强核心竞争力',
    color: '#8b5cf6',
    glowColor: '139, 92, 246'
  },
  {
    icon: RefreshCw,
    title: '全链路闭环',
    description: '打通"品牌展示-智能咨询-线索留存-转化-裂变-协同"完整链路',
    color: '#06b6d4',
    glowColor: '6, 182, 212'
  },
  {
    icon: Settings,
    title: '平台管控',
    description: '为 SaaS 运营方提供全局管控能力，助力平台规模化、规范化运营',
    color: '#ec4899',
    glowColor: '236, 72, 153'
  },
  {
    icon: Sparkles,
    title: 'AI 智能曝光',
    description: '依托 AI 能力打通 GEO 智能检索渠道，让 AI 精准识别 OPC 服务能力',
    color: '#1770f7',
    glowColor: '23, 112, 247'
  }
];

export function CoreValues() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      const cards = cardsRef.current?.querySelectorAll('.value-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="values"
      ref={sectionRef}
      className="section relative"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Background Elements */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top center, rgba(255, 124, 1, 0.1), transparent 60%)'
        }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20"
            style={{
              background: values[i % values.length].color,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
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
              background: 'rgba(255, 124, 1, 0.1)',
              color: '#ff7c01',
              border: '1px solid rgba(255, 124, 1, 0.2)'
            }}
          >
            核心价值
          </span>
          <h2 className="section-title" style={{ color: 'var(--text)' }}>
            赋能 OPC
            <span className="gradient-text"> 高效成长</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4" style={{ color: 'var(--text-secondary)' }}>
            六大核心价值，全方位助力个人创业者实现数字化转型与业务增长
          </p>
        </div>

        {/* Values Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          style={{ perspective: '1500px' }}
        >
          {values.map((value, index) => (
            <TiltCard
              key={index}
              className="value-card h-full"
              tiltAmount={8}
              glowColor={value.glowColor}
            >
              <div
                className="relative p-6 sm:p-8 rounded-2xl h-full transition-all duration-500 group"
                style={{ 
                  background: 'var(--card)',
                  border: '1px solid var(--border)'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Animated background */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${value.color}12, transparent 70%)`
                  }}
                />

                {/* Icon with animation */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 relative"
                  style={{ 
                    background: `${value.color}15`,
                    boxShadow: hoveredIndex === index ? `0 0 25px ${value.color}40` : 'none'
                  }}
                >
                  <value.icon 
                    className="w-7 h-7 transition-all duration-500 group-hover:rotate-12" 
                    style={{ color: value.color }} 
                  />
                  {/* Pulse effect */}
                  <div 
                    className="absolute inset-0 rounded-xl animate-ping opacity-20"
                    style={{ background: value.color, animationDuration: '2s' }}
                  />
                </div>

                {/* Content */}
                <h3 
                  className="text-xl font-bold mb-3 transition-colors duration-300"
                  style={{ color: 'var(--text)' }}
                >
                  {value.title}
                </h3>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {value.description}
                </p>

                {/* Bottom accent line */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"
                  style={{ background: `linear-gradient(90deg, ${value.color}, transparent)` }}
                />

                {/* Corner decoration */}
                <div 
                  className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ 
                    background: value.color,
                    boxShadow: `0 0 10px ${value.color}`
                  }}
                />
              </div>
            </TiltCard>
          ))}
        </div>

        {/* CTA Section */}
        <div 
          ref={ctaRef}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <div 
            className="p-8 sm:p-12 rounded-3xl relative overflow-hidden group"
            style={{ 
              background: 'linear-gradient(135deg, var(--card), var(--bg-secondary))',
              border: '1px solid var(--border)'
            }}
          >
            {/* Animated background glow */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-30 transition-all duration-1000 group-hover:opacity-50"
              style={{
                background: 'radial-gradient(circle, var(--accent), transparent 50%)'
              }}
            />

            {/* Animated rings */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-10"
                style={{
                  width: `${200 + i * 100}px`,
                  height: `${200 + i * 100}px`,
                  borderColor: 'var(--accent)',
                  animation: `ping ${3 + i}s cubic-bezier(0, 0, 0.2, 1) infinite`
                }}
              />
            ))}

            <div className="relative z-10">
              <h3 
                className="text-2xl sm:text-3xl font-bold mb-4"
                style={{ color: 'var(--text)' }}
              >
                开启您的 OPC 数字化之旅
              </h3>
              <p 
                className="text-base mb-8"
                style={{ color: 'var(--text-secondary)' }}
              >
                WooPC 以个人微网站（AI 获客名片）为起点，持续赋能 OPC 超级个体数字化转型，
                让每个个人公司，都能通过技术赋能实现高效获客、快速成长
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="http://admin.woopc.com/quick-start" className="btn-primary relative overflow-hidden group/btn">
                  <span className="relative z-10">免费开始使用</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </a>
                <a href="http://qxl.woopc.com/" className="btn-secondary">
                  邱小亮的微网站
                </a>
              </div>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 opacity-20" style={{ borderColor: 'var(--accent)' }} />
            <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 opacity-20" style={{ borderColor: 'var(--accent)' }} />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 opacity-20" style={{ borderColor: 'var(--accent)' }} />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 opacity-20" style={{ borderColor: 'var(--accent)' }} />
          </div>

          {/* Tagline */}
          <p
            className="mt-8 text-lg font-medium animate-pulse"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span className="gradient-text">一人一企，一站聚合</span>
          </p>

          {/* 典型案例 */}
          <div className="mt-12 w-full max-w-4xl mx-auto">
            <h3
              className="text-xl font-bold mb-6 text-center"
              style={{ color: 'var(--text)' }}
            >
              典型案例
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* 邱小亮案例 */}
              <a
                href="http://qxl.woopc.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                    }}
                  >
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold" style={{ color: 'var(--text)' }}>邱小亮</h4>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>AI Agent 实施专家</p>
                  </div>
                </div>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  专注于企业 AI Agent 实施与心血管健康数字化管理，展示专业服务与个人品牌。
                </p>
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--accent)' }}>
                  <span>访问微网站</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              {/* 恋恋案例 */}
              <a
                href="http://lianlian.woopc.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #ec4899, #f472b6)'
                    }}
                  >
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold" style={{ color: 'var(--text)' }}>恋恋</h4>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>个人微网站用户</p>
                  </div>
                </div>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  展示个人风采与专业服务，打造独特的个人品牌形象。
                </p>
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--accent)' }}>
                  <span>访问微网站</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
