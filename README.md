# Walt 的个人主页

一个面向个人品牌展示的现代主页项目，包含首页、博客、文章页与后台管理模块。  
技术栈保持轻量：`HTML + CSS + Vanilla JS + Vite`，并支持 GitHub Pages 部署。

## 在线访问

- 主页：https://waltxao.github.io/personal-homepage/
- 博客：https://waltxao.github.io/personal-homepage/blog.html

## 项目结构

```
personal-homepage/
├─ src/
│  ├─ index.html          # 首页
│  ├─ blog.html           # 博客列表页
│  ├─ admin.html          # 后台管理页
│  ├─ 404.html            # 404 页
│  ├─ styles/             # 样式与设计 token
│  ├─ scripts/            # 前端脚本
│  ├─ assets/             # 静态资源
│  ├─ blog/               # 已有博客文章
│  ├─ data/site.json      # 站点数据主配置
│  ├─ data/blog.json      # 博客索引（由脚本生成）
│  └─ public/             # 直接复制到产物的静态文件
├─ scripts/               # 构建期脚本
├─ vite.config.js
└─ package.json
```

## 本地开发

```bash
npm install
npm run dev
```

打开终端输出的本地地址即可预览。

## 构建与预览产物

```bash
npm run build
npm run preview
```

构建后会生成 `dist/`，其中包含可直接部署到 GitHub Pages 的静态文件。

## 数据说明

- `src/data/site.json`：站点主配置，包含个人简介、技能、项目、联系方式、社交链接与后台密码。
- `src/data/blog.json`：由 `npm run build` 自动从 `src/blog/` 生成。
- `src/blog/`：存放已有博客文章，保持原始 HTML 文件名。

## 后台管理使用方式

1. 打开 `admin.html`
2. 输入管理密码（若 `site.json` 中未配置密码，可直接进入）
3. 修改资料、技能、联系信息
4. 点击「导出 site.json」并替换 `src/data/site.json`
5. 重新执行构建与发布流程

## 新增文章流程

1. 在后台生成文章模板
2. 将模板保存到 `src/blog/`
3. 执行 `npm run build`
4. 发布新的构建产物到 GitHub Pages

## 部署建议

推荐使用 GitHub Actions 自动化：

1. 推送代码到 `main`
2. 安装依赖并执行 `npm run build`
3. 将 `dist/` 部署到 GitHub Pages

## 注意事项

- 本项目默认不再在仓库中保留明文默认密码。
- 如需更安全的后台访问，建议仅在本地或受保护环境下使用后台功能。
- 博客文章保留原始文件名，避免外部链接失效。

## License

仅用于个人站点展示，可按需修改。
