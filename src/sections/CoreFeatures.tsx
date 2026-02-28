import { useEffect, useRef, useState } from 'react';
import { Layout, Bot, Newspaper, GitBranch, Users2, Settings2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TiltCard } from '@/components/TiltCard';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Layout,
    title: '个人品牌展示',
    description: 'AI 零代码一键搭建专属微网站，呈现个人简介、服务项目、成功案例，快速建立专业形象',
    color: '#1770f7',
    glowColor: '23, 112, 247',
    gradient: 'from-blue-500 to-cyan-400'
  },
  {
    icon: Bot,
    title: 'AI 智能顾问',
    description: '7×24小时智能答疑、咨询，降低人工成本，提升客户体验',
    color: '#8b5cf6',
    glowColor: '139, 92, 246',
    gradient: 'from-violet-500 to-purple-400'
  },
  {
    icon: Newspaper,
    title: '深度资讯匹配',
    description: '根据客户需求智能推送行业资讯、服务详情，精准触达需求',
    color: '#06b6d4',
    glowColor: '6, 182, 212',
    gradient: 'from-cyan-500 to-teal-400'
  },
  {
    icon: GitBranch,
    title: '线索管理与裂变',
    description: '多级裂变追踪，线索留存、分类、跟进全流程管控，减少客户流失',
    color: '#f97316',
    glowColor: '249, 115, 22',
    gradient: 'from-orange-500 to-amber-400'
  },
  {
    icon: Users2,
    title: '多角色协同',
    description: '适配个体、团队、运营方多角色，权限分级，高效协同办公',
    color: '#10b981',
    glowColor: '16, 185, 129',
    gradient: 'from-emerald-500 to-green-400'
  },
  {
    icon: Settings2,
    title: '全局管控',
    description: '为 SaaS 运营方提供数据统计、权限管理、模板配置，实现规范化运营',
    color: '#ec4899',
    glowColor: '236, 72, 153',
    gradient: 'from-pink-500 to-rose-400'
  }
];

export function CoreFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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

      const cards = cardsRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 60, rotateY: 25, transformOrigin: 'center top' },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.9,
            stagger: 0.1,
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
      id="features"
      ref={sectionRef}
      className="section relative"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Background Elements */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(23, 112, 247, 0.1), transparent 50%)'
        }}
      />
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(139, 92, 246, 0.08), transparent 50%)'
        }}
      />

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 rounded-full blur-3xl opacity-20"
            style={{
              background: `linear-gradient(135deg, ${features[i % features.length].color}, transparent)`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${5 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
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
              background: 'rgba(23, 112, 247, 0.1)',
              color: 'var(--accent)',
              border: '1px solid rgba(23, 112, 247, 0.2)'
            }}
          >
            核心赋能工具
          </span>
          <h2 className="section-title" style={{ color: 'var(--text)' }}>
            个人微网站
            <span className="gradient-text">（AI 获客名片）</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4" style={{ color: 'var(--text-secondary)' }}>
            针对 OPC 核心痛点，WooPC 首个推出智能数字化赋能工具，既是个人品牌展示窗口，也是获客、管理、协同一体化平台
          </p>
        </div>

        {/* Features Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          style={{ perspective: '1500px' }}
        >
          {features.map((feature, index) => (
            <TiltCard
              key={index}
              className="feature-card h-full"
              tiltAmount={10}
              glowColor={feature.glowColor}
            >
              <div
                className="relative p-6 sm:p-8 rounded-2xl h-full transition-all duration-500 group"
                style={{ 
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  transformStyle: 'preserve-3d'
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Animated gradient border */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}40, transparent)`,
                    padding: '1px',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMaskComposite: 'xor'
                  }}
                />

                {/* Background glow on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${feature.color}15, transparent 70%)`
                  }}
                />

                {/* Icon with enhanced animation */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 relative"
                  style={{ 
                    background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                    boxShadow: hoveredCard === index ? `0 0 30px ${feature.color}40` : 'none'
                  }}
                >
                  <feature.icon 
                    className="w-7 h-7 transition-all duration-500 group-hover:rotate-12" 
                    style={{ color: feature.color }} 
                  />
                  {/* Rotating ring */}
                  <div 
                    className="absolute inset-0 rounded-xl border-2 border-dashed opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{ borderColor: feature.color, animation: 'spin 8s linear infinite' }}
                  />
                </div>

                {/* Content */}
                <h3 
                  className="text-xl font-bold mb-3 transition-colors duration-300"
                  style={{ color: 'var(--text)' }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {feature.description}
                </p>

                {/* Animated bottom line */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"
                  style={{ background: `linear-gradient(90deg, ${feature.color}, transparent)` }}
                />

                {/* Number badge with glow */}
                <div 
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    background: `${feature.color}15`,
                    color: feature.color,
                    boxShadow: hoveredCard === index ? `0 0 15px ${feature.color}40` : 'none'
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Particle dots */}
                <div className="absolute bottom-4 left-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ 
                        background: feature.color,
                        animation: `pulse 1s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Tool Positioning CTA */}
        <div 
          ref={ctaRef}
          className="mt-16 p-8 rounded-2xl max-w-4xl mx-auto text-center relative overflow-hidden group"
          style={{ 
            background: 'var(--card)',
            border: '1px solid var(--border)'
          }}
        >
          {/* Animated background */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(23, 112, 247, 0.05), rgba(139, 92, 246, 0.05))'
            }}
          />
          
          <h3 className="text-xl font-bold mb-4 relative z-10" style={{ color: 'var(--text)' }}>
            工具定位
          </h3>
          <p className="text-base leading-relaxed relative z-10" style={{ color: 'var(--text-secondary)' }}>
            面向 <span className="font-semibold px-2 py-0.5 rounded" style={{ color: 'var(--accent)', background: 'rgba(23, 112, 247, 0.1)' }}>B2B 销售、咨询顾问、行业专家</span> 等专业人士（企业/超级个体），
            打造智能数字化获客与客户管理平台，兼顾个体获客需求与 SaaS 运营方管控需求
          </p>

          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 opacity-20" style={{ borderColor: 'var(--accent)' }} />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 opacity-20" style={{ borderColor: 'var(--accent)' }} />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 opacity-20" style={{ borderColor: 'var(--accent)' }} />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 opacity-20" style={{ borderColor: 'var(--accent)' }} />
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
