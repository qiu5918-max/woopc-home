import { useState } from 'react';
import { Send, CheckCircle, User, Mail, Phone, MessageSquare } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 模拟提交 - 实际项目中替换为真实 API 调用
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', phone: '', email: '', message: '' });

    // 3秒后重置成功状态
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(23, 112, 247, 0.15), transparent 70%)'
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: 'var(--text)' }}
            >
              开启<span className="gradient-text">合作之旅</span>
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              无论您是想要打造个人品牌，还是寻求商业合作，我们都期待与您交流
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Info */}
            <div className="space-y-8">
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)'
                }}
              >
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: 'var(--text)' }}
                >
                  为什么选择 WooPC？
                </h3>
                <ul className="space-y-4">
                  {[
                    { title: '零代码建站', desc: '无需技术背景，轻松拥有专业微网站' },
                    { title: 'AI 智能获客', desc: '24小时智能接待，永不遗漏商机' },
                    { title: '一站式管理', desc: '线索、客户、数据统一管理' },
                    { title: '专业服务', desc: '一对一技术支持，全程陪伴成长' },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium" style={{ color: 'var(--text)' }}>{item.title}</span>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact info */}
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)'
                }}
              >
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ color: 'var(--text)' }}
                >
                  直接联系
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
                    >
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>电话咨询</p>
                      <p className="font-medium" style={{ color: 'var(--text)' }}>13301005341</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                    >
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>邮箱联系</p>
                      <p className="font-medium" style={{ color: 'var(--text)' }}>qxl5918@126.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div
              className="p-8 rounded-2xl relative overflow-hidden"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)'
              }}
            >
              {/* Decorative gradient */}
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-20"
                style={{
                  background: 'radial-gradient(circle, var(--accent), transparent 70%)',
                  transform: 'translate(30%, -30%)'
                }}
              />

              <h3
                className="text-xl font-bold mb-6 relative z-10"
                style={{ color: 'var(--text)' }}
              >
                留下您的需求
              </h3>

              {isSuccess ? (
                <div className="text-center py-12 relative z-10">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                  >
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
                    提交成功！
                  </h4>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    我们会尽快与您联系，感谢您的关注
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        您的姓名 *
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                          style={{ color: 'var(--text-secondary)' }}
                        />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="请输入姓名"
                          className="w-full pl-11 pr-4 py-3 rounded-xl transition-all duration-300 focus:outline-none"
                          style={{
                            background: 'var(--bg)',
                            border: '1px solid var(--border)',
                            color: 'var(--text)'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border)';
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        联系电话 *
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                          style={{ color: 'var(--text-secondary)' }}
                        />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="请输入电话"
                          className="w-full pl-11 pr-4 py-3 rounded-xl transition-all duration-300 focus:outline-none"
                          style={{
                            background: 'var(--bg)',
                            border: '1px solid var(--border)',
                            color: 'var(--text)'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border)';
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      邮箱地址
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                        style={{ color: 'var(--text-secondary)' }}
                      />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="请输入邮箱（选填）"
                        className="w-full pl-11 pr-4 py-3 rounded-xl transition-all duration-300 focus:outline-none"
                        style={{
                          background: 'var(--bg)',
                          border: '1px solid var(--border)',
                          color: 'var(--text)'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border)';
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      留言内容 *
                    </label>
                    <div className="relative">
                      <MessageSquare
                        className="absolute left-4 top-4 w-4 h-4"
                        style={{ color: 'var(--text-secondary)' }}
                      />
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="请描述您的需求或合作意向..."
                        className="w-full pl-11 pr-4 py-3 rounded-xl transition-all duration-300 focus:outline-none resize-none"
                        style={{
                          background: 'var(--bg)',
                          border: '1px solid var(--border)',
                          color: 'var(--text)'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border)';
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        提交中...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        提交留言
                      </>
                    )}
                  </button>

                  <p
                    className="text-xs text-center"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    提交即表示您同意我们的隐私政策和服务条款
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
