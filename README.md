# Walt 的个人主页

> 一个极客风格的个人网站，包含主页、博客、后台管理系统

## 🌐 在线访问

**主页：** https://waltxao.github.io/personal-homepage/

**博客：** https://waltxao.github.io/personal-homepage/blog.html

**后台管理：** https://waltxao.github.io/personal-homepage/admin.html

---

## 📁 项目结构

```
personal-homepage/
├── index.html       # 网站主页
├── blog.html       # 博客列表页
├── admin.html      # 后台管理系统
├── config.js      # 网站配置文件（由后台生成）
├── logo.svg       # 网站 Logo
└── blog/          # 博客文章目录
    ├── *.html     # 博客文章
    └── ...
```

---

## ⚙️ 功能特性

### 🏠 主页

- 极客风格终端设计
- 个人简介与技能展示
- 项目作品展示
- 博客预览
- 联系方式展示
- 响应式布局

### 📝 博客

- 分类筛选：全部 / AI大模型 / 工具技巧 / 财经分析
- 博客文章列表
- 返回导航

### 🔧 后台管理 (admin.html)

- 密码登录保护
- 博客管理：撰写、编辑、删除
- Markdown 编辑器（支持实时预览）
- 图片上传支持
- 个人简介设置
- 联系方式管理
- 登录密码修改

---

## 🔐 后台使用指南

### 1. 登录

- 访问 `admin.html`
- 默认密码：`Walt2026`

### 2. 修改个人简介

1. 点击「网站设置」
2. 修改头像、名称、简介等
3. 点击「💾 保存修改」
4. 浏览器会自动下载 `config.js`
5. 将 `config.js` 上传到 GitHub 仓库根目录

### 3. 修改联系方式

1. 点击「网站设置」
2. 修改邮箱、电话、微信等
3. 点击「💾 保存联系方式」
4. 下载新的 `config.js`
5. 上传到 GitHub

### 4. 写新博客

1. 点击「博客管理」→「撰写博客」
2. 填写标题、选择分类
3. 使用 Markdown 编辑器写文章
4. 点击「💾 保存文章」
5. 浏览器会弹出下载，保存 HTML 文件
6. 将下载的 HTML 文件上传到 `blog/` 目录

### 5. 修改密码

1. 点击「修改密码」
2. 输入当前密码、新密码
3. 点击「🔐 修改密码」

---

## 📤 上传 GitHub Pages

### 方法一：删除旧仓库，重新上传

1. 删除 GitHub 上的旧仓库
2. 重新创建仓库 `personal-homepage`
3. 上传整个文件夹

### 方法二：更新文件

1. 上传 `config.js` 到根目录
2. 上传新的博客 HTML 到 `blog/` 目录
3. 上传 `index.html`（如有个性化修改）

---

## 🎨 自定义修改

### 修改主页内容

直接编辑 `index.html` 中的对应部分：

- 技能标签：搜索 `skill-tag`
- 项目展示：搜索 `project-card`
- 博客列表：搜索 `blog-list`

### 修改样式

在 `index.html` 的 `<style>` 标签中修改 CSS 变量：

```css
:root {
    --bg-dark: #0a0a0f;      /* 背景色 */
    --accent-green: #00ff9f;  /* 主色调 */
    --accent-blue: #00d4ff;   /* 辅助色 */
}
```

---

## 📝 技术栈

- 纯 HTML + CSS + JavaScript
- 无需后端服务器
- GitHub Pages 托管
- 极客风格终端设计
- 响应式布局

---

## ⚠️ 注意事项

1. **配置文件**：后台修改的内容需要下载 `config.js` 并手动上传
2. **博客文章**：新写的博客需要导出 HTML 并上传到 `blog/` 目录
3. **密码安全**：首次登录后建议修改默认密码

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

*Walt 的个人主页 - 2026*
