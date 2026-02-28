import { useEffect, useRef, useState } from 'react';
import { Smartphone, Globe, Monitor, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TiltCard } from '@/components/TiltCard';

gsap.registerPlugin(ScrollTrigger);

const platforms = [
  {
    icon: Smartphone,
    title: '微信小程序',
    description: '一键分享，社交裂变，触达10亿微信用户',
    features: ['无需下载', '即用即走', '社交分享'],
    color: '#07c160',
    glowColor: '7, 193, 96'
  },
  {
    icon: Globe,
    title: 'H5 浏览',
    description: '跨平台适配，任何设备都能完美展示',
    features: ['跨平台', '响应式', '快速加载'],
    color: '#1770f7',
    glowColor: '23, 112, 247'
  },
  {
    icon: Monitor,
    title: 'PC 网页',
    description: '专业大屏展示，后台管理更高效',
    features: ['大屏展示', '数据可视', '管理便捷'],
    color: '#8b5cf6',
    glowColor: '139, 92, 246'
  }
];

export function MultiPlatform() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [activeDevice, setActiveDevice] = useState(0);

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

      const cards = cardsRef.current?.querySelectorAll('.platform-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      gsap.fromTo(visualRef.current,
        { opacity: 0, x: 50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    // Auto-rotate active device
    const interval = setInterval(() => {
      setActiveDevice(prev => (prev + 1) % 3);
    }, 3000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="platform"
      ref={sectionRef}
      className="section relative"
      style={{ background: 'var(--bg)' }}
    >
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(23, 112, 247, 0.1), transparent 70%)'
        }}
      />

      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1770f7" stopOpacity="0" />
            <stop offset="50%" stopColor="#1770f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1770f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(3)].map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={`${30 + i * 20}%`}
            x2="100%"
            y2={`${30 + i * 20}%`}
            stroke="url(#lineGrad)"
            strokeWidth="1"
            strokeDasharray="10 10"
            style={{ animation: `dash 20s linear infinite`, animationDelay: `${i * 2}s` }}
          />
        ))}
      </svg>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span 
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 animate-pulse"
            style={{ 
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}
          >
            多场景访问
          </span>
          <h2 className="section-title" style={{ color: 'var(--text)' }}>
            随时随地
            <span className="gradient-text"> 获客</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4" style={{ color: 'var(--text-secondary)' }}>
            支持三种访问形式，数据互通、功能协同，适配外出拓展、客户浏览、后台管理等所有场景，打破时间空间限制
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Platform Cards */}
          <div ref={cardsRef} className="space-y-4">
            {platforms.map((platform, index) => (
              <TiltCard
                key={index}
                className="platform-card"
                tiltAmount={5}
                glowColor={platform.glowColor}
              >
                <div
                  className={`p-6 rounded-2xl transition-all duration-500 group cursor-pointer ${
                    activeDevice === index ? 'ring-2' : ''
                  }`}
                  style={{ 
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    '--tw-ring-color': platform.color
                  } as React.CSSProperties}
                  onClick={() => setActiveDevice(index)}
                  onMouseEnter={() => setActiveDevice(index)}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110"
                      style={{ 
                        background: `linear-gradient(135deg, ${platform.color}20, ${platform.color}10)`,
                        boxShadow: activeDevice === index ? `0 0 20px ${platform.color}30` : 'none'
                      }}
                    >
                      <platform.icon 
                        className="w-6 h-6 transition-transform duration-500 group-hover:rotate-12" 
                        style={{ color: platform.color }} 
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 
                        className="text-lg font-bold mb-2 transition-colors duration-300"
                        style={{ color: 'var(--text)' }}
                      >
                        {platform.title}
                      </h3>
                      <p 
                        className="text-sm mb-3"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {platform.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {platform.features.map((feature, fIndex) => (
                          <span
                            key={fIndex}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all duration-300 group-hover:scale-105"
                            style={{ 
                              background: `${platform.color}15`,
                              color: platform.color
                            }}
                          >
                            <Check className="w-3 h-3" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Active indicator */}
                  <div 
                    className="absolute bottom-0 left-0 h-1 rounded-b-2xl transition-all duration-500"
                    style={{ 
                      width: activeDevice === index ? '100%' : '0%',
                      background: `linear-gradient(90deg, ${platform.color}, transparent)`
                    }}
                  />
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Visual Representation */}
          <div ref={visualRef} className="relative">
            <div 
              className="relative p-8 rounded-3xl"
              style={{ 
                background: 'var(--card)',
                border: '1px solid var(--border)'
              }}
            >
              {/* Device Mockups */}
              <div className="relative h-80 flex items-center justify-center">
                {/* PC */}
                <div 
                  className={`absolute left-0 bottom-0 w-48 h-32 rounded-lg border-2 transition-all duration-700 ${
                    activeDevice === 2 ? 'scale-110 z-20' : 'scale-100 opacity-60'
                  }`}
                  style={{ 
                    background: 'var(--bg-secondary)',
                    borderColor: activeDevice === 2 ? platforms[2].color : 'var(--border)',
                    boxShadow: activeDevice === 2 ? `0 0 30px ${platforms[2].color}40` : 'none'
                  }}
                >
                  <div className="p-3">
                    <div className="w-full h-2 rounded bg-[var(--border)] mb-2" />
                    <div className="w-3/4 h-2 rounded bg-[var(--border)] mb-2" />
                    <div className="flex gap-2 mt-3">
                      <div 
                        className="w-8 h-8 rounded transition-all duration-500"
                        style={{ background: activeDevice === 2 ? platforms[2].color : 'var(--border)' }} 
                      />
                      <div 
                        className="w-8 h-8 rounded transition-all duration-500"
                        style={{ background: activeDevice === 2 ? `${platforms[2].color}80` : 'var(--border)' }} 
                      />
                    </div>
                  </div>
                  <div 
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-3 rounded-b-lg"
                    style={{ background: activeDevice === 2 ? platforms[2].color : 'var(--border)' }}
                  />
                </div>

                {/* Tablet */}
                <div 
                  className={`absolute right-8 bottom-4 w-28 h-36 rounded-lg border-2 transition-all duration-700 ${
                    activeDevice === 1 ? 'scale-110 z-20' : 'scale-100 opacity-60'
                  }`}
                  style={{ 
                    background: 'var(--bg-secondary)',
                    borderColor: activeDevice === 1 ? platforms[1].color : 'var(--border)',
                    boxShadow: activeDevice === 1 ? `0 0 30px ${platforms[1].color}40` : 'none'
                  }}
                >
                  <div className="p-2">
                    <div className="w-full h-1.5 rounded bg-[var(--border)] mb-1.5" />
                    <div className="w-2/3 h-1.5 rounded bg-[var(--border)]" />
                    <div className="mt-2 space-y-1">
                      <div 
                        className="w-full h-8 rounded transition-all duration-500"
                        style={{ background: activeDevice === 1 ? platforms[1].color : 'var(--border)' }}
                      />
                      <div 
                        className="w-full h-8 rounded transition-all duration-500"
                        style={{ background: activeDevice === 1 ? `${platforms[1].color}80` : 'var(--border)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div 
                  className={`absolute left-1/2 top-0 -translate-x-1/2 w-16 h-28 rounded-xl border-2 transition-all duration-700 z-10 ${
                    activeDevice === 0 ? 'scale-125' : 'scale-100 opacity-60'
                  }`}
                  style={{ 
                    background: 'var(--bg-secondary)',
                    borderColor: activeDevice === 0 ? platforms[0].color : 'var(--border)',
                    boxShadow: activeDevice === 0 ? `0 0 30px ${platforms[0].color}40` : 'none'
                  }}
                >
                  <div className="p-1.5">
                    <div className="w-full h-1 rounded bg-[var(--border)] mb-1" />
                    <div className="space-y-1">
                      <div 
                        className="w-full h-6 rounded transition-all duration-500"
                        style={{ background: activeDevice === 0 ? platforms[0].color : 'var(--border)' }}
                      />
                      <div 
                        className="w-full h-4 rounded transition-all duration-500"
                        style={{ background: activeDevice === 0 ? `${platforms[0].color}80` : 'var(--border)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Connection Lines */}
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 5 }}
                >
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <circle 
                    cx="50%" 
                    cy="20%" 
                    r="4" 
                    fill={platforms[activeDevice].color}
                    className="animate-pulse"
                  />
                  <line 
                    x1="50%" 
                    y1="20%" 
                    x2="25%" 
                    y2="70%" 
                    stroke="url(#lineGradient)" 
                    strokeWidth="1" 
                    strokeDasharray="4 4"
                    style={{ animation: 'dash 2s linear infinite' }}
                  />
                  <line 
                    x1="50%" 
                    y1="20%" 
                    x2="75%" 
                    y2="60%" 
                    stroke="url(#lineGradient)" 
                    strokeWidth="1" 
                    strokeDasharray="4 4"
                    style={{ animation: 'dash 2s linear infinite reverse' }}
                  />
                </svg>
              </div>

              {/* Data Sync Indicator */}
              <div 
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full flex items-center gap-2 animate-pulse"
                style={{ 
                  background: 'var(--card)',
                  border: '1px solid var(--accent)',
                  boxShadow: '0 0 20px rgba(23, 112, 247, 0.3)'
                }}
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>
                  数据实时同步
                </span>
              </div>
            </div>

            {/* Floating decoration */}
            <div 
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-30"
              style={{ background: 'var(--accent)' }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
      `}</style>
    </section>
  );
}
