# 软件资源库

日常收集 · 免费分享的设计软件 / 工程工具资源导航站，附带「安装教程库」。

纯原生 HTML + CSS + JavaScript 静态站点，零构建、零运行时依赖。

## 结构

```
├── index.html              # 软件库主页
├── tutorials.html          # 安装教程库列表页
├── tutorial.html           # 教程详情页（读取 ?id= 渲染）
├── css/site.css            # 共享样式
├── js/data.js              # 软件数据
├── js/tutorials-data.js    # 教程数据
└── vendor/font-awesome/    # 自托管图标（离线可用）
```

数据与页面分离：**软件库数据在 `js/data.js`，教程库数据在 `js/tutorials-data.js`**，互不干扰。

## 本地预览

双击 `index.html` 即可预览；或在本目录起静态服务后访问 `http://127.0.0.1:8123/index.html`。

## 部署

纯静态站点，推送至 GitHub 后由 Vercel 自动部署，无需构建步骤。

## 说明

- 站点内容（含下载链接）为公开内容，**请勿在数据文件中存放私密信息**。
- 公开仓库默认只读：他人可查看与克隆，但**无法向本仓库写入，也无法影响线上站点**。请妥善保管账号凭据。

## License

MIT
