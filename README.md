# 软件资源库

日常收集 · 免费分享的设计软件与工具资源导航站。

## 项目结构

```
├── index.html        # 主页面（HTML + CSS）
├── js/
│   ├── data.js       # 数据层 — 编辑此文件增删改软件
│   └── app.js        # 应用逻辑（无需修改）
├── README.md
├── .gitignore
└── LICENSE
```

## 使用方式

双击 `index.html` 即可在浏览器中打开预览，无需任何服务端环境。

## 如何修改数据

所有软件数据集中在 `js/data.js` 的 `softwareData` 数组中。每一条的结构：

```js
{id:1, name:'软件名称', category:'分类名', icon:'fa-icon-name',
 description:'卡片简述',
 detailDesc:'弹窗详细介绍',
 versions:[
   {ver:'版本号', url1:'下载链接1', label1:'夸克网盘',
                  url2:'下载链接2', label2:'迅雷下载'}
 ]}
```

**注意事项：**
- `id` 不能重复，新增时取当前最大 id + 1
- `category` 必须与 `categories` 数组中的 `slug` 完全一致
- 下载链接暂时为空时，`url1: ''` 留空字符串即可

## 分类列表

Adobe · CAD · 三维动画 · 办公软件 · 工业工程 · 数据分析 · 建筑设计 · 视频后期 · 电子电路 · 渲染引擎 · 图像绘图 · 编程开发 · 装机必备

## 技术栈

纯原生 HTML + CSS + JavaScript，零依赖。图标使用 Font Awesome CDN。

## License

MIT
