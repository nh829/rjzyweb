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
├── editor/                 # 【本地工具】可视化数据编辑器（不参与网站运行，可不上线）
├── push-data.bat           # 【本地工具】双击 = 校验语法并推送数据上线
├── 数据编辑器.bat           # 【本地工具】双击 = 启动可视化数据编辑器
├── a04ca71dde62d33bfbcf725d591b7ad8.txt   # 【勿动】微信平台域名归属校验文件，必须放在根目录且保持原文件名与内容
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
   {ver:'2024 v25.9.1', links:[
     {url:'https://pan.quark.cn/s/xxxx', label:'夸克网盘'},
     {url:'https://pan.xunlei.com/s/xxxx', label:'迅雷下载'},
     {url:'', label:'百度网盘'}          // url 留空 = 灰色「待更新」占位
   ]},
   {ver:'2023 v24.7.2', links:[
     {url:'https://pan.xunlei.com/s/xxxx', label:'迅雷下载'}   // 只有一个链接也行
   ]},
   {ver:'2022 v23.6',   links:[]}                              // 完全没链接就显示「待更新」
 ]}
```

| 字段 | 必填 | 说明 |
|---|---|---|
| `id` | ✅ | 唯一编号，**不能重复**；新增时取当前最大 id + 1 |
| `name` | ✅ | 软件名称（显示在卡片 / 弹窗标题） |
| `category` | ✅ | 分类名，必须和下方 `categories` 数组里的 `slug` **完全一致**（区分中英文，如 `'CAD'`、`'三维动画'`） |
| `platform` | ⭕ | 历史字段，**目前已不影响显示**（版本一律平铺展示，不再区分 Windows/macOS 分组），可留可删 |
| `icon` | ✅ | Font Awesome 免费版图标类名，如 `'fa-camera'`。**必须是 FA Free 存在的图标**（否则显示成方块） |
| `description` | ✅ | 卡片上的简短描述（约 1 行） |
| `detailDesc` | ⭕ | 弹窗里的详细介绍。**留空或省略时自动用 `description` 兜底**，所以不想写两遍可只填 `description` |
| `versions` | ✅ | 版本数组，结构见下 |

### 2. `platform` 字段说明

旧版本的平台字段（`'win'` / `'mac'` / `'cross'`）**目前已不影响任何显示**——弹窗里版本一律平铺、不分 Windows/macOS 分组。数据里残留的 `platform:'cross'` 之类的值可**留着不动**，也可删除，均无影响。

### 3. `versions` 版本数组

每个版本是一个对象：

| 字段 | 说明 |
|---|---|
| `ver` | 版本号，如 `'2024 v25.9.1'`、`'2025 SP4'` |
| `links` | 下载链接数组，**元素数量完全自由**（1 个 / 2 个 / 3 个…都行），每个元素是一个对象 |

`links` 里每个链接元素的两种写法：

| 写法 | 显示效果 |
|---|---|
| `{url:'https://...', label:'夸克网盘'}` | 绿色**可点击**下载按钮（label 是按钮文字） |
| `{url:'', label:'百度网盘'}` | 灰色「待更新」按钮（不可点，占位提醒） |

> **关键约定**
> 1. **想加几个链接就写几个** `{url, label}`，加第 4、第 5 个都行，不用再改任何代码；
> 2. **links 数组不要求从第 1 个写起**——某行 url 和 label 只要存在就会被如实显示；
> 3. **url 和 label 都不存在的那一行 = 完全隐藏**，所以随便删、随便留空都不会出现 `undefined`；
> 4. 暂时没有链接可整行不写，该版本会自动显示「待更新」。

### 4. 常见操作

**新增一个软件**：复制数组里任意一条，改 `id`（唯一）、`name`、`category`、`platform`、`icon`、描述、`versions` 即可。保存后刷新页面即出现。

**给某个版本加/删一个下载链接**：在该版本的 `links:[...]` 里加一行或删一行 `{url:'...', label:'...'}` 即可，**不用管它是第几个**。

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
