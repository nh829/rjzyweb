// ============================================================
//  数据层 - 你要修改的只有这个文件
//  用法：添加/删除/修改下方 softwareData 数组即可
//  无需改动其他任何文件
// ============================================================

// ---- 分类配置 ----
var categories = [
  {slug:'all', name:'全部资源', icon:'fa-layer-group'},
  {slug:'Adobe', name:'Adobe', icon:'fa-pen-fancy'},
  {slug:'CAD', name:'CAD', icon:'fa-drafting-compass'},
  {slug:'三维动画', name:'三维动画', icon:'fa-cubes'},
  {slug:'办公软件', name:'办公软件', icon:'fa-file-alt'},
  {slug:'工业工程', name:'工业工程', icon:'fa-cogs'},
  {slug:'数据分析', name:'数据分析', icon:'fa-chart-bar'},
  {slug:'建筑设计', name:'建筑设计', icon:'fa-building'},
  {slug:'视频后期', name:'视频后期', icon:'fa-film'},
  {slug:'电子电路', name:'电子电路', icon:'fa-microchip'},
  {slug:'渲染引擎', name:'渲染引擎', icon:'fa-sun'},
  {slug:'图像绘图', name:'图像绘图', icon:'fa-paint-brush'},
  {slug:'编程开发', name:'编程开发', icon:'fa-code'},
  {slug:'装机必备', name:'装机必备', icon:'fa-desktop'},
];

// 分类对应的卡片图标
var catIcons = {
  Adobe:'fa-paint-brush', CAD:'fa-drafting-compass', 三维动画:'fa-cubes',
  办公软件:'fa-file-word', 工业工程:'fa-cogs', 数据分析:'fa-chart-bar',
  建筑设计:'fa-building', 视频后期:'fa-video', 电子电路:'fa-microchip',
  渲染引擎:'fa-sun', 图像绘图:'fa-palette', 编程开发:'fa-terminal', 装机必备:'fa-cog'
};

// ---- 软件数据 ----
// 每条数据的各个字段：
//   id:         唯一编号（不能重复）
//   name:       软件名称
//   category:   分类名，必须与上面的 slug 完全一致（中文英文都行）
//   icon:       FontAwesome 图标类名，如 'fa-camera'
//   description: 卡片上显示的简短描述
//   detailDesc: 弹窗里的详细介绍
//   versions:   版本数组。每个版本可包含：
//      ver:     版本号
//      url1:    下载链接1（没有就留空字符串 ''）
//      label1:  下载1的按钮文字（如 '夸克网盘'）
//      url2:    下载链接2（没有就留空字符串 ''）
//      label2:  下载2的按钮文字（如 '迅雷下载'）

var softwareData = [
  // ---- Adobe ----
  {id:1, name:'Adobe Photoshop 2024', category:'Adobe', icon:'fa-paint-brush',
   description:'专业图像处理与设计软件，广泛应用于平面设计、摄影修图、UI/UX 设计、数字绘画等领域。2024 版本带来了 AI 智能填充、神经网络滤镜等革命性功能。',
   detailDesc:'Photoshop 是 Adobe 旗下最著名的图像处理软件，广泛应用于平面设计、摄影修图、UI/UX 设计、数字绘画等领域。2024 版本带来了 AI 智能填充、神经网络滤镜等革命性功能。',
   versions:[
     {ver:'2024 v25.9.1', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'2023 v24.7.2', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'2022 v23.6',   url1:'', label1:'夸克网盘'}
   ]},
  {id:2, name:'Adobe Illustrator 2024', category:'Adobe', icon:'fa-vector-square',
   description:'矢量图形与插画设计',
   detailDesc:'Illustrator 是行业标准的矢量图形设计软件，用于创建徽标、图标、插图、排版和复杂的图形设计。2024 版本增强了对 3D 效果和协作流程的支持。',
   versions:[
     {ver:'2024 v28.5', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'2023 v27.8', url1:'', label1:'夸克网盘'}
   ]},
  {id:3, name:'Adobe Premiere Pro 2024', category:'Adobe', icon:'fa-video',
   description:'专业视频剪辑与后期',
   detailDesc:'Premiere Pro 是 Adobe 旗下的专业非线性视频编辑软件，广泛应用于影视剪辑、短视频制作、广告制作等领域，支持几乎所有的视频格式。',
   versions:[
     {ver:'2024 v24.6.1', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'2023 v23.5', url1:'', label1:'夸克网盘'},
     {ver:'2022 v22.9', url1:'', label1:'夸克网盘'}
   ]},
  {id:4, name:'Adobe After Effects 2024', category:'Adobe', icon:'fa-film',
   description:'动态图形与视觉特效',
   detailDesc:'After Effects 是行业标准的动态图形和视觉特效软件，用于影视后期合成、MG 动画、特效制作、动态图形设计等创意工作。',
   versions:[
     {ver:'2024 v24.6', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'2023 v23.4', url1:'', label1:'夸克网盘'}
   ]},
  {id:5, name:'Adobe Lightroom 2024', category:'Adobe', icon:'fa-camera',
   description:'专业摄影后期调色',
   detailDesc:'Lightroom 专为摄影师设计，提供强大的照片组织、管理和后期调色功能，支持 RAW 格式处理和一键预设调色。',
   versions:[
     {ver:'2024 v7.5', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'2023 v6.4', url1:'', label1:'夸克网盘'}
   ]},
  // ---- CAD ----
  {id:6, name:'AutoCAD 2025', category:'CAD', icon:'fa-drafting-compass',
   description:'计算机辅助设计',
   detailDesc:'AutoCAD 是 Autodesk 的旗舰 CAD 软件，广泛应用于建筑、机械、电气、土木等领域的二维绘图和三维建模。',
   versions:[
     {ver:'2025 v1.0', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'2024 v24.3', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'2023 v23.7', url1:'', label1:'夸克网盘'}
   ]},
  {id:7, name:'SolidWorks 2024', category:'CAD', icon:'fa-cube',
   description:'三维机械设计',
   detailDesc:'SolidWorks 是达索系统旗下主流的三维机械 CAD 软件，集设计、仿真、数据管理于一体，广泛应用于机械制造和工业设计。',
   versions:[
     {ver:'2024 SP4', url1:'', label1:'夸克网盘'},
     {ver:'2023 SP5', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'}
   ]},
  {id:8, name:'CATIA V5-6R2024', category:'CAD', icon:'fa-industry',
   description:'高端三维设计工程',
   detailDesc:'CATIA 是达索系统的旗舰产品，提供从概念设计到制造的全流程解决方案，广泛应用于航空、汽车、船舶等高端制造业。',
   versions:[
     {ver:'V5-6R2024', url1:'', label1:'夸克网盘'},
     {ver:'V5-6R2023', url1:'', label1:'夸克网盘'}
   ]},
  {id:9, name:'NX 2306', category:'CAD', icon:'fa-cogs',
   description:'集成化产品设计',
   detailDesc:'Siemens NX 是高端集成化 CAD/CAM/CAE 软件，提供从设计到制造的全数字化产品开发流程。',
   versions:[
     {ver:'2306 Series', url1:'', label1:'夸克网盘'},
     {ver:'2212 Series', url1:'', label1:'夸克网盘'}
   ]},
  // ---- 三维动画 ----
  {id:10, name:'Blender 4.2', category:'三维动画', icon:'fa-cubes',
   description:'开源三维创作套件',
   detailDesc:'Blender 是功能全面的开源三维创作软件，支持建模、雕刻、动画、渲染、合成、视频编辑、VFX 等全流程创作。',
   versions:[
     {ver:'4.2 LTS', url1:'', label1:'夸克网盘', url2:'', label2:'官方下载'},
     {ver:'4.1', url1:'', label1:'夸克网盘'},
     {ver:'3.6 LTS', url1:'', label1:'夸克网盘'}
   ]},
  {id:11, name:'3ds Max 2025', category:'三维动画', icon:'fa-cube',
   description:'三维建模与渲染',
   detailDesc:'3ds Max 是 Autodesk 旗下的专业三维建模、动画和渲染软件，广泛用于游戏开发、建筑可视化和影视特效。',
   versions:[
     {ver:'2025.1', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'2024.2', url1:'', label1:'夸克网盘'},
     {ver:'2023.3', url1:'', label1:'夸克网盘'}
   ]},
  {id:12, name:'Maya 2025', category:'三维动画', icon:'fa-cube',
   description:'三维动画与特效',
   detailDesc:'Maya 是 Autodesk 旗下业界领先的三维动画软件，在影视和游戏行业被广泛用于角色动画、特效模拟和场景构建。',
   versions:[
     {ver:'2025', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'2024.1', url1:'', label1:'夸克网盘'}
   ]},
  {id:13, name:'Cinema 4D 2025', category:'三维动画', icon:'fa-cube',
   description:'三维运动图形',
   detailDesc:'Cinema 4D 以直观的工作流程和强大的运动图形功能著称，广泛应用于电视广告、动态设计、游戏和建筑可视化。',
   versions:[
     {ver:'2025.0', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'2024.4', url1:'', label1:'夸克网盘'}
   ]},
  // ---- 办公软件 ----
  {id:14, name:'Microsoft Office 2024', category:'办公软件', icon:'fa-file-word',
   description:'办公软件套件',
   detailDesc:'Microsoft Office 包含 Word、Excel、PowerPoint、Outlook、Access 等核心办公应用，是最主流的办公软件套件。',
   versions:[
     {ver:'2024 专业增强版', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'2021 专业增强版', url1:'', label1:'夸克网盘'},
     {ver:'2019 专业增强版', url1:'', label1:'夸克网盘'}
   ]},
  {id:15, name:'WPS Office 2024', category:'办公软件', icon:'fa-file',
   description:'国产办公软件',
   detailDesc:'WPS Office 是金山软件开发的办公软件套件，完美兼容 Office 格式，个人版免费使用。',
   versions:[
     {ver:'2024 专业版', url1:'', label1:'夸克网盘'},
     {ver:'2023 专业版', url1:'', label1:'夸克网盘'}
   ]},
  {id:16, name:'LibreOffice 24.8', category:'办公软件', icon:'fa-file-alt',
   description:'开源办公套件',
   detailDesc:'LibreOffice 是免费开源的办公软件套件，包含 Writer、Calc、Impress 等组件，完全兼容 Office 格式。',
   versions:[
     {ver:'24.8', url1:'', label1:'夸克网盘', url2:'', label2:'官方下载'},
     {ver:'24.2', url1:'', label1:'夸克网盘'}
   ]},
  // ---- 工业工程 ----
  {id:17, name:'MATLAB R2024b', category:'工业工程', icon:'fa-cogs',
   description:'科学计算与仿真',
   detailDesc:'MATLAB 是 MathWorks 开发的高性能数值计算和可视化软件，广泛应用于数据分析、算法开发、信号处理和控制系统设计。',
   versions:[
     {ver:'R2024b', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'R2024a', url1:'', label1:'夸克网盘'},
     {ver:'R2023b', url1:'', label1:'夸克网盘'}
   ]},
  {id:18, name:'Ansys 2024 R2', category:'工业工程', icon:'fa-chart-line',
   description:'有限元分析仿真',
   detailDesc:'Ansys 是全球领先的工程仿真软件，提供结构、流体、热、电磁等多物理场仿真分析能力。',
   versions:[
     {ver:'2024 R2', url1:'', label1:'夸克网盘'},
     {ver:'2024 R1', url1:'', label1:'夸克网盘'}
   ]},
  {id:19, name:'LabVIEW 2024', category:'工业工程', icon:'fa-microchip',
   description:'测试测量与自动化',
   detailDesc:'LabVIEW 是 NI 开发的图形化编程环境，专为测试、测量和自动化控制应用设计。',
   versions:[
     {ver:'2024', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'}
   ]},
  // ---- 数据分析 ----
  {id:20, name:'Tableau 2024.2', category:'数据分析', icon:'fa-chart-bar',
   description:'数据可视化与BI',
   detailDesc:'Tableau 是业界领先的数据可视化分析平台，帮助用户通过交互式仪表盘快速理解和分享数据洞察。',
   versions:[
     {ver:'2024.2', url1:'', label1:'夸克网盘'},
     {ver:'2024.1', url1:'', label1:'夸克网盘'},
     {ver:'2023.4', url1:'', label1:'夸克网盘'}
   ]},
  {id:21, name:'Power BI Desktop', category:'数据分析', icon:'fa-chart-pie',
   description:'微软商业智能工具',
   detailDesc:'Power BI 是 Microsoft 推出的商业分析服务，提供交互式可视化和商业智能功能，支持海量数据源连接。',
   versions:[
     {ver:'2024.07', url1:'', label1:'夸克网盘'},
     {ver:'2023.12', url1:'', label1:'夸克网盘'}
   ]},
  {id:22, name:'SPSS 29', category:'数据分析', icon:'fa-statistics',
   description:'统计分析软件',
   detailDesc:'SPSS 是 IBM 开发的统计分析软件，广泛应用于社会科学、市场调研、医疗研究等领域的统计分析工作。',
   versions:[
     {ver:'v29.0', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'v28.0', url1:'', label1:'夸克网盘'}
   ]},
  {id:23, name:'Python 3.12', category:'数据分析', icon:'fa-code',
   description:'数据科学编程语言',
   detailDesc:'Python 是数据科学和机器学习领域最流行的编程语言，拥有 pandas、numpy、matplotlib 等强大的数据分析生态。',
   versions:[
     {ver:'3.12.4', url1:'', label1:'夸克网盘', url2:'', label2:'官方下载'},
     {ver:'3.11.9', url1:'', label1:'夸克网盘'},
     {ver:'3.10.14', url1:'', label1:'夸克网盘'}
   ]},
  // ---- 建筑设计 ----
  {id:24, name:'Revit 2025', category:'建筑设计', icon:'fa-building',
   description:'BIM 建筑设计',
   detailDesc:'Revit 是 Autodesk 旗下的 BIM（建筑信息建模）软件，专为建筑结构设计、MEP 工程和施工提供全生命周期支持。',
   versions:[
     {ver:'2025', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'2024.2', url1:'', label1:'夸克网盘'},
     {ver:'2023.3', url1:'', label1:'夸克网盘'}
   ]},
  {id:25, name:'SketchUp 2024', category:'建筑设计', icon:'fa-draw-polygon',
   description:'概念三维建模',
   detailDesc:'SketchUp 是一款直观易用的三维建模软件，深受建筑师、室内设计师和景观设计师的喜爱。',
   versions:[
     {ver:'2024', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'2023', url1:'', label1:'夸克网盘'}
   ]},
  {id:26, name:'ArchiCAD 27', category:'建筑设计', icon:'fa-building',
   description:'BIM 建筑设计',
   detailDesc:'ArchiCAD 是 Graphisoft 开发的 BIM 建筑设计软件，以出色的协作功能和直观的建模方式闻名。',
   versions:[
     {ver:'v27', url1:'', label1:'夸克网盘'},
     {ver:'v26', url1:'', label1:'夸克网盘'}
   ]},
  {id:27, name:'Rhino 8', category:'建筑设计', icon:'fa-shapes',
   description:'三维自由造型',
   detailDesc:'Rhino（犀牛）在建筑设计和工业设计领域广泛使用，以其强大的 NURBS 曲面建模能力著称。',
   versions:[
     {ver:'v8.8', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'v7.34', url1:'', label1:'夸克网盘'}
   ]},
  // ---- 视频后期 ----
  {id:28, name:'DaVinci Resolve 19', category:'视频后期', icon:'fa-video',
   description:'专业调色与剪辑',
   detailDesc:'DaVinci Resolve 是 Blackmagic Design 开发的专业视频调色、编辑、视觉特效和音频后期制作一体化软件。',
   versions:[
     {ver:'19.0', url1:'', label1:'夸克网盘', url2:'', label2:'官方下载'},
     {ver:'18.6', url1:'', label1:'夸克网盘'},
     {ver:'17.4', url1:'', label1:'夸克网盘'}
   ]},
  {id:29, name:'Final Cut Pro 10.8', category:'视频后期', icon:'fa-cut',
   description:'Mac 视频编辑',
   detailDesc:'Final Cut Pro 是 Apple 为 Mac 开发的专业非线性视频编辑软件，以卓越的磁性时间线和极致性能著称。',
   versions:[
     {ver:'10.8', url1:'', label1:'夸克网盘'},
     {ver:'10.7', url1:'', label1:'夸克网盘'}
   ]},
  {id:30, name:'Vegas Pro 22', category:'视频后期', icon:'fa-film',
   description:'视频编辑与后期',
   detailDesc:'Vegas Pro 是流行的非线性视频编辑软件，以直观的时间线编辑和强大的音频处理功能受到视频创作者喜爱。',
   versions:[
     {ver:'22.0', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'21.0', url1:'', label1:'夸克网盘'}
   ]},
  // ---- 电子电路 ----
  {id:31, name:'Altium Designer 24', category:'电子电路', icon:'fa-microchip',
   description:'PCB 设计软件',
   detailDesc:'Altium Designer 是专业的 PCB 设计软件，提供原理图捕获、3D PCB 布局布线和 FPGA 开发功能。',
   versions:[
     {ver:'24.6', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'24.0', url1:'', label1:'夸克网盘'},
     {ver:'23.5', url1:'', label1:'夸克网盘'}
   ]},
  {id:32, name:'KiCad 8.0', category:'电子电路', icon:'fa-bolt',
   description:'开源 EDA 套件',
   detailDesc:'KiCad 是一款功能完善的开源电子设计自动化（EDA）套件，支持原理图设计和 PCB 布局布线。',
   versions:[
     {ver:'8.0.5', url1:'', label1:'夸克网盘', url2:'', label2:'官方下载'},
     {ver:'7.0.11', url1:'', label1:'夸克网盘'}
   ]},
  {id:33, name:'EAGLE 9.6', category:'电子电路', icon:'fa-microchip',
   description:'PCB 设计工具',
   detailDesc:'EAGLE 是 Autodesk 开发的 PCB 设计工具，拥有庞大的元件库和活跃的社区支持。',
   versions:[
     {ver:'9.6.2', url1:'', label1:'夸克网盘'},
     {ver:'9.5.1', url1:'', label1:'夸克网盘'}
   ]},
  // ---- 渲染引擎 ----
  {id:34, name:'V-Ray 6', category:'渲染引擎', icon:'fa-sun',
   description:'光线追踪渲染器',
   detailDesc:'V-Ray 是 Chaos 开发的业界标准光线追踪渲染引擎，广泛用于建筑可视化、影视广告和产品渲染。',
   versions:[
     {ver:'v6.2', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'v6.1', url1:'', label1:'夸克网盘'},
     {ver:'v5.2', url1:'', label1:'夸克网盘'}
   ]},
  {id:35, name:'Octane Render 2024', category:'渲染引擎', icon:'fa-gem',
   description:'GPU 渲染器',
   detailDesc:'Octane Render 是首款完全基于 GPU 的渲染器，以极快的渲染速度和物理级真实感著称。',
   versions:[
     {ver:'2024.1', url1:'', label1:'夸克网盘'},
     {ver:'2023.1', url1:'', label1:'夸克网盘'}
   ]},
  {id:36, name:'Redshift 3.6', category:'渲染引擎', icon:'fa-star',
   description:'GPU/CPU 混合渲染',
   detailDesc:'Redshift 是 Maxon 开发的 GPU 加速渲染器，支持 GPU 和 CPU 混合渲染方式，性能出色。',
   versions:[
     {ver:'3.6.01', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'3.5.04', url1:'', label1:'夸克网盘'}
   ]},
  {id:37, name:'Corona Renderer 12', category:'渲染引擎', icon:'fa-fire',
   description:'物理真实感渲染',
   detailDesc:'Corona Renderer 以物理级真实感和易于上手的操作界面著称，特别适合建筑可视化和产品渲染。',
   versions:[
     {ver:'12.0', url1:'', label1:'夸克网盘'},
     {ver:'11.0', url1:'', label1:'夸克网盘'}
   ]},
  // ---- 图像绘图 ----
  {id:38, name:'CorelDRAW 2024', category:'图像绘图', icon:'fa-paint-brush',
   description:'矢量图形设计',
   detailDesc:'CorelDRAW 是专业的矢量图形设计和排版软件，在广告设计、标签包装和印刷出版领域有大量用户。',
   versions:[
     {ver:'2024 v25', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'2023 v24', url1:'', label1:'夸克网盘'},
     {ver:'2022 v23', url1:'', label1:'夸克网盘'}
   ]},
  {id:39, name:'Affinity Designer 2', category:'图像绘图', icon:'fa-pen-nib',
   description:'专业矢量/位图设计',
   detailDesc:'Affinity Designer 是 Serif 推出的专业设计软件，融合了矢量与位图设计能力，性价比极高。',
   versions:[
     {ver:'v2.5', url1:'', label1:'夸克网盘'},
     {ver:'v2.4', url1:'', label1:'夸克网盘'}
   ]},
  {id:40, name:'Paint.NET 5.1', category:'图像绘图', icon:'fa-palette',
   description:'轻量图像编辑',
   detailDesc:'Paint.NET 是 Windows 平台上一款免费的轻量级图像编辑软件，功能丰富且性能优秀。',
   versions:[
     {ver:'5.1.0', url1:'', label1:'夸克网盘'},
     {ver:'5.0.13', url1:'', label1:'夸克网盘'}
   ]},
  {id:41, name:'GIMP 2.10', category:'图像绘图', icon:'fa-paint-brush',
   description:'开源图像编辑',
   detailDesc:'GIMP 是 GNU 开源图像处理软件，功能可媲美 Photoshop，支持各种插件扩展。',
   versions:[
     {ver:'2.10.36', url1:'', label1:'夸克网盘', url2:'', label2:'官方下载'},
     {ver:'2.10.34', url1:'', label1:'夸克网盘'}
   ]},
  // ---- 编程开发 ----
  {id:42, name:'Visual Studio 2024', category:'编程开发', icon:'fa-code',
   description:'集成开发环境',
   detailDesc:'Visual Studio 是微软的旗舰级 IDE，支持 C#、C++、Python、JavaScript 等多种语言，适合企业级开发。',
   versions:[
     {ver:'2024 v17.10', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'2022 v17.8', url1:'', label1:'夸克网盘'},
     {ver:'2019 v16.11', url1:'', label1:'夸克网盘'}
   ]},
  {id:43, name:'VS Code', category:'编程开发', icon:'fa-code',
   description:'轻量级代码编辑器',
   detailDesc:'VS Code 是微软开发的免费开源代码编辑器，拥有丰富的扩展生态，是目前最流行的开发工具之一。',
   versions:[
     {ver:'1.92', url1:'', label1:'夸克网盘', url2:'', label2:'官方下载'},
     {ver:'1.90', url1:'', label1:'夸克网盘'},
     {ver:'1.88', url1:'', label1:'夸克网盘'}
   ]},
  {id:44, name:'IntelliJ IDEA 2024', category:'编程开发', icon:'fa-brain',
   description:'Java 开发IDE',
   detailDesc:'IntelliJ IDEA 是 JetBrains 开发的 Java/Kotlin 开发 IDE，以智能代码补全和强大的重构功能著称。',
   versions:[
     {ver:'2024.2', url1:'', label1:'夸克网盘'},
     {ver:'2024.1', url1:'', label1:'夸克网盘'}
   ]},
  {id:45, name:'Git 2.45', category:'编程开发', icon:'fa-branch',
   description:'版本控制工具',
   detailDesc:'Git 是目前最流行的分布式版本控制系统，几乎所有的软件开发项目都在使用 Git 进行代码管理。',
   versions:[
     {ver:'2.45.2', url1:'', label1:'夸克网盘', url2:'', label2:'官方下载'},
     {ver:'2.43.0', url1:'', label1:'夸克网盘'}
   ]},
  // ---- 装机必备 ----
  {id:46, name:'7-Zip 24.08', category:'装机必备', icon:'fa-file-archive',
   description:'文件压缩解压',
   detailDesc:'7-Zip 是免费开源的压缩解压软件，支持 7z、ZIP、RAR 等多种格式，压缩率高且无广告。',
   versions:[
     {ver:'24.08', url1:'', label1:'夸克网盘', url2:'', label2:'官方下载'},
     {ver:'23.01', url1:'', label1:'夸克网盘'}
   ]},
  {id:47, name:'Everything 1.4', category:'装机必备', icon:'fa-search',
   description:'极速文件搜索',
   detailDesc:'Everything 是 Windows 上最快的文件搜索工具，基于 NTFS 索引实现秒级搜索。',
   versions:[
     {ver:'1.4.1.1026', url1:'', label1:'夸克网盘'},
     {ver:'1.4.1.1018', url1:'', label1:'夸克网盘'}
   ]},
  {id:48, name:'PotPlayer 2407', category:'装机必备', icon:'fa-play-circle',
   description:'全能视频播放',
   detailDesc:'PotPlayer 是 Windows 上最强大的视频播放器之一，支持几乎所有视频格式，画质优异且资源占用低。',
   versions:[
     {ver:'240701', url1:'', label1:'夸克网盘', url2:'', label2:'迅雷下载'},
     {ver:'240618', url1:'', label1:'夸克网盘'}
   ]},
  {id:49, name:'Chrome 126', category:'装机必备', icon:'fa-globe',
   description:'网页浏览器',
   detailDesc:'Google Chrome 是目前全球最流行的网页浏览器，以快速、安全、扩展丰富著称。',
   versions:[
     {ver:'126.0', url1:'', label1:'夸克网盘', url2:'', label2:'官方下载'},
     {ver:'125.0', url1:'', label1:'夸克网盘'}
   ]},
  {id:50, name:'Notepad++ 8.7', category:'装机必备', icon:'fa-edit',
   description:'文本编辑器',
   detailDesc:'Notepad++ 是 Windows 上最受欢迎的代码和文本编辑器，支持语法高亮、多标签、插件扩展等。',
   versions:[
     {ver:'8.7.1', url1:'', label1:'夸克网盘'},
     {ver:'8.6.9', url1:'', label1:'夸克网盘'}
   ]},
];
