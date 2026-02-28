import { Zap, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const footerLinks = {
  product: {
    title: '产品',
    links: [
      { label: '个人微站', href: '#' },
      { label: 'AI 顾问', href: '#' },
      { label: '线索管理', href: '#' },
      { label: '数据分析', href: '#' },
    ]
  },
  solution: {
    title: '解决方案',
    links: [
      { label: 'B2B 销售', href: '#' },
      { label: '咨询顾问', href: '#' },
      { label: '行业专家', href: '#' },
      { label: '自由职业', href: '#' },
    ]
  },
  support: {
    title: '支持',
    links: [
      { label: '帮助中心', href: '#' },
      { label: '使用文档', href: '#' },
      { label: 'API 文档', href: '#' },
      { label: '联系我们', href: '#' },
    ]
  },
  company: {
    title: '公司',
    links: [
      { label: '关于我们', href: '#' },
      { label: '加入我们', href: '#' },
      { label: '新闻动态', href: '#' },
      { label: '合作伙伴', href: '#' },
    ]
  }
};

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer 
      className="relative pt-20 pb-8"
      style={{ 
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)'
      }}
    >
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom center, rgba(23, 112, 247, 0.1), transparent 70%)'
        }}
      />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-2 mb-6">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))'
                }}
              >
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">WooPC</span>
            </a>
            <p 
              className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              AI驱动的个人创业者微站赋能平台，聚焦 OPC 超级个体，用技术赋能每一位个人创业者实现高效获客与品牌成长。
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Mail className="w-4 h-4 text-[var(--accent)]" />
                <span>qxl5918@126.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Phone className="w-4 h-4 text-[var(--accent)]" />
                <span>13301005341</span>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <MapPin className="w-4 h-4 text-[var(--accent)]" />
                <span>杭州市萧山区建设一路中栋国际 2 期</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 
                className="font-semibold mb-4"
                style={{ color: 'var(--text)' }}
              >
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-300 hover:text-[var(--accent)]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div 
          className="h-px mb-8"
          style={{ background: 'var(--border)' }}
        />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p 
            className="text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            © 2025 富贵五车书咨询工作室，浙ICP备2026010360号 
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-[var(--accent)] transition-colors">隐私政策</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-[var(--accent)] transition-colors">服务条款</a>
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ 
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
