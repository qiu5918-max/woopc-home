# WooPC 官网首页项目说明书

## 项目概述

WooPC 是一个 AI 驱动的个人创业者微站赋能平台，聚焦 One Personal Company（OPC）超级个体。本项目是 WooPC 的官网首页，用于展示产品功能、核心价值和获取用户线索。

- **项目名称**: woopc-home
- **仓库地址**: https://github.com/qiu5918-max/woopc-home
- **技术栈**: React 19 + TypeScript + Vite 7 + TailwindCSS 3

---

## 功能模块

### 1. 导航栏 (Navbar)
- 固定顶部，滚动时背景模糊效果
- 平滑滚动到页面各区块
- 响应式设计，支持移动端菜单
- 深色/浅色主题切换

### 2. 英雄区 (Hero)
- Canvas 粒子动画背景
- 鼠标视差效果
- GSAP 入场动画
- 打字机效果标语
- 统计数据展示（10,000+ 用户、300% 获客提升、99.9% 系统稳定）
- **CTA 按钮**：
  - 「立即开始」→ http://admin.woopc.com/quick-start
  - 「了解更多」→ 平滑滚动到痛点区块

### 3. 痛点展示 (PainPoints)
展示 OPC 超级个体面临的五大困境：
- 品牌无展示
- 获客效率低
- 线索难管理
- 运营成本高
- 数字化薄弱

### 4. 核心功能 (CoreFeatures)
展示六大核心赋能工具：
1. **个人品牌展示** - AI 零代码一键搭建专属微网站
2. **AI 智能顾问** - 7×24 小时智能答疑、咨询
3. **深度资讯匹配** - 根据客户需求智能推送
4. **线索管理与裂变** - 多级裂变追踪，全流程管控
5. **多角色协同** - 适配个体、团队、运营方
6. **全局管控** - SaaS 运营方数据统计与权限管理

### 5. 多平台支持 (MultiPlatform)
- 微信小程序
- H5 浏览
- PC 网页
- 数据实时同步展示

### 6. 核心价值 (CoreValues)
六大核心价值：
- 降本增效
- 提升转化
- 打造品牌
- 全链路闭环
- 平台管控
- AI 智能曝光

**典型案例展示**：
- 邱小亮 - http://qxl.woopc.com/ （AI Agent 实施专家）
- 恋恋 - http://lianlian.woopc.com/

### 7. 留言合作 (Contact)
- 表单字段：姓名、电话、邮箱、留言内容
- 表单验证：姓名和电话必填
- 提交状态：加载动画、成功反馈
- 联系信息展示：
  - 电话：13301005341
  - 邮箱：qxl5918@126.com

### 8. 页脚 (Footer)
- 品牌介绍
- 产品链接（个人微站、AI 顾问、线索管理、数据分析）
- 解决方案（B2B 销售、咨询顾问、行业专家、自由职业）
- 支持链接（帮助中心、使用文档、API 文档、联系我们）
- 公司信息（关于我们、加入我们、新闻动态、合作伙伴）
- 联系方式
- 版权信息：© 2025 富贵五车书咨询工作室，浙ICP备2026010360号

---

## 外部链接汇总

| 链接 | 用途 |
|------|------|
| http://admin.woopc.com/quick-start | 用户注册/快速开始 |
| http://qxl.woopc.com/ | 邱小亮的个人微网站（案例展示） |
| http://lianlian.woopc.com/ | 恋恋的个人微网站（案例展示） |

---

## API 接口

**注意**：当前项目为纯前端展示页面，**没有后端 API 调用**。

留言表单 (Contact) 目前使用模拟提交：
```typescript
// 模拟提交 - 实际项目中替换为真实 API 调用
await new Promise(resolve => setTimeout(resolve, 1500));
```

如需接入真实后端，需要实现以下接口：

### 留言提交接口（待实现）
```
POST /api/contact
Content-Type: application/json

Request:
{
  "name": "string",
  "phone": "string",
  "email": "string (optional)",
  "message": "string"
}

Response:
{
  "success": boolean,
  "message": "string"
}
```

---

## 技术栈详情

### 核心框架
- **React**: 19.2.0
- **TypeScript**: 5.9.3
- **Vite**: 7.2.4

### 样式
- **TailwindCSS**: 3.4.19
- **tailwindcss-animate**: 1.0.7
- CSS 变量主题系统（深色/浅色模式）

### 动画
- **GSAP**: 3.14.2（滚动触发动画、入场动画）
- **@studio-freight/lenis**: 1.0.42（平滑滚动）

### UI 组件
- **Radix UI**: 无障碍组件库（Dialog、Dropdown、Select 等）
- **Lucide React**: 0.562.0（图标库）
- **class-variance-authority**: 样式变体管理
- **tailwind-merge**: 类名合并

### 表单
- **react-hook-form**: 7.70.0
- **zod**: 4.3.5（表单验证）
- **@hookform/resolvers**: 5.2.2

### 3D/可视化
- **Three.js**: 0.183.0
- **@react-three/fiber**: 9.5.0
- **@react-three/drei**: 10.7.7
- **Recharts**: 2.15.4

---

## 项目结构

```
woopc/
├── src/
│   ├── components/          # 通用组件
│   │   ├── ui/              # UI 基础组件（Radix UI 封装）
│   │   ├── AnimatedBackground.tsx
│   │   ├── FloatingElements.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── TiltCard.tsx
│   │   └── TypewriterText.tsx
│   ├── contexts/            # React Context
│   │   └── ThemeContext.tsx
│   ├── hooks/               # 自定义 Hooks
│   │   └── use-mobile.ts
│   ├── lib/                 # 工具函数
│   │   └── utils.ts
│   ├── sections/            # 页面区块组件
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── PainPoints.tsx
│   │   ├── CoreFeatures.tsx
│   │   ├── MultiPlatform.tsx
│   │   ├── CoreValues.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── App.tsx              # 主应用组件
│   ├── App.css              # 应用样式
│   ├── main.tsx             # 入口文件
│   └── index.css            # 全局样式
├── public/                  # 静态资源
├── index.html               # HTML 模板
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint
```

---

## 主题系统

项目使用 CSS 变量实现深色/浅色主题切换：

```css
/* 浅色主题 */
--bg: #f8f9fc
--text: #1a1a2e
--accent: #1770f7

/* 深色主题 */
--bg: #0a0a0f
--text: #f0f0f5
--accent: #b1c5ff
```

---

## 联系信息

- **电话**: 13301005341
- **邮箱**: qxl5918@126.com
- **地址**: 杭州市萧山区建设一路中栋国际 2 期
- **公司**: 富贵五车书咨询工作室
- **备案号**: 浙ICP备2026010360号

---

## 更新日志

### 2025-02-28
- 初始化项目
- 完成首页所有区块开发
- 实现深色/浅色主题切换
- 添加 GSAP 滚动动画
- 集成留言表单（模拟提交）
- 推送到 GitHub 仓库
