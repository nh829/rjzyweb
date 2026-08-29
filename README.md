# 软件资源库

日常收集 · 免费分享的设计软件 / 工程工具资源导航站，附带「安装教程库」。

## 项目结构

```
├── index.html              # 软件库主页（布局 + 样式内联，含左侧导航）
├── tutorials.html          # 安装教程库列表页（左侧导航同款）
├── tutorial.html           # 教程详情页（读取 ?id= 渲染，左侧导航同款）
├── css/
│   └── site.css            # 教程库 / 详情页 / 共享导航布局样式
├── js/
│   ├── data.js             # 【软件数据层】增删改软件只看这里
│   ├── app.js              # 软件库逻辑（搜索 / 收藏 / 弹窗 / 暗色，无需改）
│   ├── tutorials-data.js   # 【教程数据层】增删改教程只看这里
│   └── tutorials.js        # 教程库逻辑（列表渲染 / 详情渲染，无需改）
├── vendor/
│   └── font-awesome/       # 自托管的 Font Awesome 6.5.0（离线可用）
├── favicon.svg
├── .gitignore
├── LICENSE
└── README.md
```

> 两个页面的数据完全分离：**软件库数据在 `js/data.js`，教程库数据在 `js/tutorials-data.js`**，互不干扰。

---

## 快速开始

- **最简单**：双击 `index.html` / `tutorials.html` 即可在浏览器打开预览，无需任何服务端。
- **推荐（避免个别浏览器对 `file://` 的限制）**：在项目根目录起一个本地静态服务，例如
  ```bash
  python -m http.server 8123
  ```
  然后访问 `http://127.0.0.1:8123/index.html`。

---

## 一、如何更新软件数据（改 `js/data.js`）

所有软件集中在 `js/data.js` 的 `softwareData` 数组中。你**只需修改这一个文件**，其他文件不用动。

### 1. 一条软件的完整字段

```js
{id:1, name:'Adobe Photoshop 2024', category:'Adobe', platform:'cross', icon:'fa-paint-brush',
 description:'卡片上显示的简短描述',
 detailDesc:'弹窗里的详细介绍（留空会自动回退用 description）',
 versions:[
   {ver:'2024 v25.9.1', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
   {ver:'2023 v24.7.2', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
   {ver:'2022 v23.6',   url1:'', label1:'夸克网盘'}
 ]}
```

| 字段 | 必填 | 说明 |
|---|---|---|
| `id` | ✅ | 唯一编号，**不能重复**；新增时取当前最大 id + 1 |
| `name` | ✅ | 软件名称（显示在卡片 / 弹窗标题） |
| `category` | ✅ | 分类名，必须和下方 `categories` 数组里的 `slug` **完全一致**（区分中英文，如 `'CAD'`、`'三维动画'`） |
| `platform` | ✅ | 平台标识，决定弹窗里出现哪些「Windows 电脑 / macOS 电脑 / Linux 电脑」分组，取值见下表 |
| `icon` | ✅ | Font Awesome 免费版图标类名，如 `'fa-camera'`。**必须是 FA Free 存在的图标**（否则显示成方块） |
| `description` | ✅ | 卡片上的简短描述（约 1 行） |
| `detailDesc` | ⭕ | 弹窗里的详细介绍。**留空或省略时自动用 `description` 兜底**，所以不想写两遍可只填 `description` |
| `versions` | ✅ | 版本数组，结构见下 |

### 2. `platform` 取值（控制弹窗版本分组）

| 值 | 弹窗里显示的版本分组 |
|---|---|
| `'win'` | 仅「Windows 电脑」分组（如 SolidWorks、3ds Max、AutoCAD 等纯 Windows 软件） |
| `'mac'` | 仅「macOS 电脑」分组（该站目前极少，多为跨平台软件） |
| `'linux'` | 仅「Linux 电脑」分组 |
| `'cross'`（默认） | 同时显示「Windows 电脑」+「macOS 电脑」两个分组（如 Photoshop、Blender、AutoCAD 等跨平台软件） |

> 每个分组下，会列出该软件 `versions` 数组里的**全部版本**。即：**版本号不分平台**，一套版本号对 Windows / macOS 都适用；平台字段只决定"要不要显示某个系统的标题"。

### 3. `versions` 版本数组

每个版本是一个对象：

| 字段 | 说明 |
|---|---|
| `ver` | 版本号，如 `'2024 v25.9.1'`、`'2025 SP4'` |
| `url1` | 下载链接 1。暂时没有就填 `''`（空字符串），按钮会显示为灰色「待更新」不可点状态 |
| `label1` | 下载按钮 1 的文字，如 `'夸克网盘'`、`'官方下载'` |
| `url2` | 下载链接 2（可选）。留空则只显示一个下载按钮 |
| `label2` | 下载按钮 2 的文字，如 `'迅雷下载'` |

> **关键约定**：下载链接由你后续自行补全，现在全部留 `''` 即可，页面会自动把空链接渲染成"不可用"样式，不会让用户点到空白页。

### 4. 常见操作

**新增一个软件**：复制数组里任意一条，改 `id`（唯一）、`name`、`category`、`platform`、`icon`、描述、`versions` 即可。保存后刷新页面即出现。

**删除一个软件**：直接删掉对应的 `{...}` 整条（注意删除后移除多余的逗号，保持数组语法合法）。

**新增一个分类**：
1. 在 `categories` 数组里加一行 `{slug:'新分类英文slug', name:'显示名', icon:'fa-xxx'}`；
2. 在 `catIcons` 对象里加一对 `'新分类slug':'fa-xxx'`（卡片顶用到的图标）；
3. 软件里把 `category` 填成这个 `slug` 即可自动归类、侧栏自动出现该分类并带数量角标。

**换图标**：图标类名去 [fontawesome.com/icons](https://fontawesome.com/icons) 搜索，确认是 **Free** 版本（Solid / Regular / Brands 均可），复制类名（带 `fa-` 前缀）填到 `icon` 或 `catIcons` 对应位置。

> ⚠️ 注意：本项目图标已**自托管**在 `vendor/font-awesome/`，只含 Font Awesome 免费版图标。例如 `fa-statistics` 是 Pro 专属、免费版没有，会被显示成方块——这类一律换免费替代（如 `fa-chart-simple`）。

---

## 二、如何更新安装教程库（改 `js/tutorials-data.js`）

所有教程集中在 `js/tutorials-data.js` 的 `tutorialData` 数组中，同样**只改这一个文件**。教程库列表页 `tutorials.html` 与详情页 `tutorial.html` 会自动读取。

### 1. 一篇教程的完整字段

```js
{
  id: 1,
  title: "AutoCAD 2026.0 中文高级版图文安装教程",
  category: "CAD",                 // 用于列表页筛选 chips，建议与软件分类 slug 一致
  catIcon: "fa-drafting-compass",  // 分类图标（FA Free 类名）
  date: "2026-02-10",              // 发布日期 YYYY-MM-DD
  views: 1820,                     // 浏览量（示例数字）
  excerpt: "列表页显示的摘要文字",
  steps: [                         // 正文结构化块数组（见下表）
    {t:'p', x:'开头段落文字'},
    {t:'h2', x:'安装前准备'},
    {t:'quote', x:'注意事项 / 警告（红框）'},
    {t:'ol', x:['步骤1','步骤2','步骤3']},
    {t:'img', alt:'截图说明', cap:'截图下方说明文字'},   // 占位图
    {t:'note', x:'提示信息（蓝框）'}
  ]
}
```

### 2. `steps` 正文块类型

| 类型 `t` | 字段 | 渲染效果 |
|---|---|---|
| `'h2'` | `x`：小标题 | 二级标题（分节用） |
| `'p'` | `x`：段落 | 普通段落 |
| `'quote'` | `x`：文字 | 红色警告 / 注意事项框 |
| `'note'` | `x`：文字 | 蓝色提示框 |
| `'ol'` | `x`：字符串数组 | 有序步骤列表（1. 2. 3.） |
| `'img'` | `alt` / `cap` / `src` | 截图占位框（`src` 省略时显示占位，填了 `src` 显示真实图片） |

### 3. 常见操作

**新增一篇教程**：复制数组里任意一篇，改 `id`（唯一）、`title`、`category`、`date`、摘要和 `steps`。保存刷新后，列表页会出现新卡片，点「阅读教程」进入详情页（`tutorial.html?id=新id`）。

**删除一篇教程**：删掉对应的 `{...}` 整条即可（注意逗号）。

**换上真实截图**：把占位块
```js
{t:'img', alt:'说明', cap:'说明'}
```
改为
```js
{t:'img', src:'图片地址或相对路径', alt:'说明', cap:'说明'}
```
填写 `src` 后占位框会自动变成真实图片，支持相对路径（如 `'images/autocad-1.png'`）或外链。

**调整分类筛选**：列表页顶部的分类筛选 chips 会根据所有教程的 `category` 字段**自动生成**，无需手动维护。新增 / 修改 `category` 后筛选项自动同步。

---

## 三、页面导航与特性说明

- **左侧导航**：软件库首页（`index.html`）与教程库（`tutorials.html`、`tutorial.html`）共用同一套左侧深色导航栏。
  - 「软件库」→ 回到 `index.html`；
  - 「安装教程库」→ 进入 `tutorials.html`（位于侧栏**最底部**）；
  - 下方是软件分类列表（带数量角标）与「我的收藏」。
- **暗色模式**：侧栏底部的月亮 / 太阳按钮切换，偏好会记住（localStorage）。
- **收藏**：软件卡片右上角星标、弹窗内星标，可一键收藏；侧栏「我的收藏」查看。
- **搜索快捷键**：在任意页面按 `/` 或 `Ctrl/Cmd+K` 聚焦搜索框。
- **返回顶部**：滚动后右下角出现箭头按钮。
- **移动端**：窗口 ≤768px 时左侧导航变为抽屉（点汉堡按钮 + 遮罩打开）。

---

## 四、技术栈

- 纯原生 HTML + CSS + JavaScript，**零运行时依赖**。
- 图标：Font Awesome 6.5.0 **自托管**（`vendor/font-awesome/`），离线可用。
- 数据：软件 / 教程分别内联在 `js/data.js` 与 `js/tutorials-data.js`，无后端、无构建步骤。

---

## 五、部署建议

纯静态站点，把整个目录上传到任意静态托管（GitHub Pages / Vercel / 对象存储 / 自己的 Nginx）即可，无需服务端环境。

---

## License

MIT
