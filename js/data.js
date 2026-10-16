// ============================================================
//  软件库数据层
//  说明：本文件由「数据编辑器」自动生成（双击 数据编辑器.bat）
//  含三部分：categories 分类配置 / catIcons 分类图标 / softwareData 软件数据
//  如需手改：请保持逗号、括号成对；保存后可运行 push-data.bat 自动查错
// ============================================================

var categories = [
  {slug: 'all', name: '全部资源', icon: 'fa-layer-group'},
  {slug: '编程开发', name: '编程开发', icon: 'fa-code'},
  {slug: '数据分析', name: '数据分析', icon: 'fa-chart-bar'},
  {slug: '装机必备', name: '装机必备', icon: 'fa-desktop'},
  {slug: 'Adobe', name: 'Adobe', icon: 'fa-pen-fancy'},
  {slug: 'CAD', name: 'CAD', icon: 'fa-drafting-compass'},
  {slug: '三维动画', name: '三维动画', icon: 'fa-cubes'},
  {slug: '办公软件', name: '办公软件', icon: 'fa-file-alt'},
  {slug: '工业工程', name: '工业工程', icon: 'fa-cogs'},
  {slug: '建筑设计', name: '建筑设计', icon: 'fa-building'},
  {slug: '视频后期', name: '视频后期', icon: 'fa-film'},
  {slug: '电子电路', name: '电子电路', icon: 'fa-microchip'},
  {slug: '渲染引擎', name: '渲染引擎', icon: 'fa-sun'},
  {slug: '图像绘图', name: '图像绘图', icon: 'fa-paint-brush'}
];

// 分类对应的卡片图标
var catIcons = {
  编程开发: 'fa-terminal',
  装机必备: 'fa-cog',
  Adobe: 'fa-paint-brush',
  CAD: 'fa-drafting-compass',
  三维动画: 'fa-cubes',
  办公软件: 'fa-file-word',
  工业工程: 'fa-cogs',
  数据分析: 'fa-chart-bar',
  建筑设计: 'fa-building',
  视频后期: 'fa-video',
  电子电路: 'fa-microchip',
  渲染引擎: 'fa-sun',
  图像绘图: 'fa-palette'
};

// ---- 软件数据 ----
var softwareData = [
  {
    id: 60,
    name: 'Python',
    category: '编程开发',
    platform: 'cross',
    icon: 'fa-code',
    description: 'python安装包支持windows电脑和macOS电脑',
    detailDesc: 'Python 是数据科学和机器学习领域最流行的编程语言，拥有 pandas、numpy、matplotlib 等强大的数据分析生态。',
    versions: [
      {
        ver: '3.10.11（win）',
        links: [
          {url: 'https://pan.quark.cn/s/49c947ac8800?pwd=VT1U', label: '夸克网盘'},
          {url: 'https://pan.xunlei.com/s/VP0VojT1LdY80ugfM4zWBpqeA1?pwd=gycp', label: '迅雷下载'}
        ]
      },
      {
        ver: '3.10.11（macOS）',
        links: [
          {url: 'https://pan.xunlei.com/s/VP0VodMDbhEl6yni2Wo1GLOzA1?pwd=er3r', label: '迅雷下载'}
        ]
      }
    ]
  },
  {
    id: 62,
    name: 'Pycharm',
    category: '编程开发',
    platform: 'cross',
    icon: 'fa-code',
    description: '安装包支持windows电脑和macOS电脑',
    detailDesc: 'PyCharm：专为Python开发设计的智能代码编辑器, 提供智能代码补全、调试和重构的高效IDE。',
    versions: [
      {
        ver: '25.1.4（win）',
        links: [
          {url: 'https://pan.xunlei.com/s/VP0VoQ6lWUHX21WYhEApOmVjA1?pwd=g35b', label: '迅雷下载'}
        ]
      },
      {
        ver: '25.1.4（macOS）',
        links: [
          {url: 'https://pan.xunlei.com/s/VP0VoSrTLdY80ugfM4zWBRpvA1?pwd=3ihm', label: '迅雷下载'}
        ]
      }
    ]
  },
  {
    id: 42,
    name: 'Visual Studio',
    category: '编程开发',
    platform: 'cross',
    icon: 'fa-code',
    description: '集成开发环境',
    detailDesc: 'Visual Studio 是微软的旗舰级 IDE，支持 C#、C++、Python、JavaScript 等多种语言，适合企业级开发。',
    versions: [
      {
        ver: '2022',
        links: [
          {url: 'https://pan.quark.cn/s/477e2040a2e6?pwd=qaue', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 43,
    name: 'VS Code',
    category: '编程开发',
    platform: 'cross',
    icon: 'fa-code',
    description: '轻量级代码编辑器',
    detailDesc: 'VS Code 是微软开发的免费开源代码编辑器，拥有丰富的扩展生态，是目前最流行的开发工具之一。',
    versions: [
      {
        ver: '1.130(window)',
        links: [
          {url: 'https://pan.quark.cn/s/d0f42fdf3e3b?pwd=3d4J', label: '夸克网盘'}
        ]
      },
      {
        ver: '1.130 (macOS)',
        links: [
          {url: 'https://pan.quark.cn/s/46ffb697fbab?pwd=RhgB', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 44,
    name: 'IntelliJ IDEA 2025',
    category: '编程开发',
    platform: 'cross',
    icon: 'fa-brain',
    description: 'Java 开发IDE',
    detailDesc: 'IntelliJ IDEA 是 JetBrains 开发的 Java/Kotlin 开发 IDE，以智能代码补全和强大的重构功能著称。',
    versions: [
      {
        ver: '2025.1（win）',
        links: [
          {url: 'https://pan.xunlei.com/s/VP0q4QBztbi2WvGpoB_NCSimA1?pwd=divd', label: '迅雷下载'}
        ]
      },
      {
        ver: '2025.1(macOS Apple Silicon)',
        links: [
          {url: 'https://pan.xunlei.com/s/VP0q3WFbtFtkebQGFT804GcjA1?pwd=jfua', label: '迅雷下载'}
        ]
      },
      {
        ver: '2025.1(macOS)',
        links: [
          {url: 'https://pan.xunlei.com/s/VP0q4BgJ0K2igf0cvE2WmvebA1?pwd=ichz', label: '迅雷下载'}
        ]
      }
    ]
  },
  {
    id: 45,
    name: 'Git 2.55',
    category: '编程开发',
    platform: 'cross',
    icon: 'fa-branch',
    description: '版本控制工具',
    detailDesc: 'Git 是目前最流行的分布式版本控制系统，几乎所有的软件开发项目都在使用 Git 进行代码管理。',
    versions: [
      {
        ver: '2.55',
        links: [
          {url: 'https://pan.quark.cn/s/527bf05dab3e?pwd=sDsn', label: '夸克网盘'},
          {url: 'https://pan.xunlei.com/s/VP0pxU0rwU8unbBSXABrr3V4A1?pwd=6bx7', label: '迅雷下载'}
        ]
      }
    ]
  },
  {
    id: 70,
    name: 'MinGW-w64',
    category: '编程开发',
    platform: 'cross',
    icon: 'fa-branch',
    description: 'Windows原生C/C++编译工具链，支持64位应用开发。',
    detailDesc: 'MinGW-w64 是一款在Windows平台上原生支持GCC编译器的开发工具集，提供完整的运行时环境和头文件库，支持生成32位和64位Windows可执行程序，是跨平台C/C++开发的重要基础组件。',
    versions: [
      {
        ver: 'MinGW-W64',
        links: [
          {url: 'https://pan.quark.cn/s/4e9bbb76f8e4?pwd=ZMEk', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 69,
    name: 'DEV C++',
    category: '编程开发',
    platform: 'cross',
    icon: 'fa-branch',
    description: '轻量级C/C++集成开发环境，适合初学者学习编程。',
    detailDesc: 'DEV C++ 是一款免费、开源的C/C++集成开发环境（IDE），基于MinGW编译器。它体积小巧、界面简洁，内置代码编辑、编译调试和项目管理功能，非常适合编程入门学习和中小型项目开发。',
    versions: [
      {
        ver: 'DEV C++',
        links: [
          {url: 'https://pan.quark.cn/s/a93f13dd0ba8?pwd=umHx', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 23,
    name: 'MySQL',
    category: '数据分析',
    platform: 'cross',
    icon: 'fa-code',
    description: '轻量易用的关系型数据库',
    detailDesc: 'MySQL是一款开源、稳定、高效的关系型数据库管理系统，广泛用于网站和应用程序的数据存储与管理。',
    versions: [
      {
        ver: 'mysql 8.0.36 zip',
        links: [
          {url: 'https://pan.xunlei.com/s/VP0Vnu3sWGP2dDcH3msVc0R6A1?pwd=b7xj', label: '迅雷下载'}
        ]
      },
      {
        ver: 'mysql 9.3.0 msi',
        links: [
          {url: 'https://pan.xunlei.com/s/VP0Vnxxe5xcOQo19hfUWZnrXA1?pwd=mis9', label: '迅雷下载'}
        ]
      }
    ]
  },
  {
    id: 61,
    name: 'MySQLworkbench',
    category: '数据分析',
    platform: 'cross',
    icon: 'fa-code',
    description: 'Mysql管理工具',
    detailDesc: 'MySQL是一款开源、稳定、高效的关系型数据库管理系统，广泛用于网站和应用程序的数据存储与管理。',
    versions: [
      {
        ver: 'mysqlworkbench',
        links: [
          {url: 'https://pan.xunlei.com/s/VP0Vno5kEBTgAC6p1Qv4OUTDA1?pwd=4sdr', label: '迅雷下载'}
        ]
      }
    ]
  },
  {
    id: 65,
    name: 'Navicat',
    category: '数据分析',
    platform: 'cross',
    icon: 'fa-code',
    description: 'Mysql管理工具',
    detailDesc: 'MySQL是一款开源、稳定、高效的关系型数据库管理系统，广泛用于网站和应用程序的数据存储与管理。',
    versions: [
      {
        ver: 'Navicat 17 (win)',
        links: [
          {url: 'https://pan.xunlei.com/s/VP0VnFgGqPOVzLzgDdVzVE0PA1?pwd=9ixf', label: '迅雷下载'}
        ]
      },
      {
        ver: 'Navicat 17 (macOS)',
        links: [
          {url: 'https://pan.xunlei.com/s/VP0VnjHXFfXHbuo64Ja9jii2A1?pwd=e8d9', label: '迅雷下载'}
        ]
      },
      {
        ver: 'Navicat 16 (win)',
        links: [
          {url: 'https://pan.xunlei.com/s/VP0Vne0fDRcmG2AjUBVyXuEvA1?pwd=hsgc', label: '迅雷下载'}
        ]
      }
    ]
  },
  {
    id: 20,
    name: 'Tableau 2024.2',
    category: '数据分析',
    platform: 'cross',
    icon: 'fa-chart-bar',
    description: '数据可视化与BI',
    detailDesc: 'Tableau 是业界领先的数据可视化分析平台，帮助用户通过交互式仪表盘快速理解和分享数据洞察。',
    versions: [
      {
        ver: '2024.2',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: '2024.1',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: '2023.4',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 21,
    name: 'Origin',
    category: '数据分析',
    platform: 'win',
    icon: 'fa-chart-pie',
    description: 'ORIGIN是一款专业的科学绘图与数据分析软件',
    detailDesc: '处理数据、制作高质量图表，并支持复杂的数据分析，在学术界和工业界应用广泛',
    versions: [
      {
        ver: '2024',
        links: [
          {url: '', label: '夸克网盘'},
          {url: 'https://pan.xunlei.com/s/VP0Zw62Wh7wgGlBVlVyWlVk3A1?pwd=fpza', label: '迅雷下载'}
        ]
      }
    ]
  },
  {
    id: 22,
    name: 'SPSS 27',
    category: '数据分析',
    platform: 'cross',
    icon: 'fa-chart-simple',
    description: '统计分析软件',
    detailDesc: 'SPSS 是 IBM 开发的统计分析软件，广泛应用于社会科学、市场调研、医疗研究等领域的统计分析工作。',
    versions: [
      {
        ver: 'v27.0',
        links: [
          {url: 'https://pan.quark.cn/s/560b05db54bf?pwd=Wu22', label: '夸克网盘'}
        ]
      },
      {
        ver: 'v28.0',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 1,
    name: 'Adobe Photoshop',
    category: 'Adobe',
    platform: 'cross',
    icon: 'fa-paint-brush',
    description: '专业图像处理与设计软件，广泛应用于平面设计、摄影修图、UI/UX 设计、数字绘画等领域。2024 版本带来了 AI 智能填充、神经网络滤镜等革命性功能。',
    detailDesc: 'Photoshop 是 Adobe 旗下最著名的图像处理软件，广泛应用于平面设计、摄影修图、UI/UX 设计、数字绘画等领域。2024 版本带来了 AI 智能填充、神经网络滤镜等革命性功能。',
    versions: [
      {
        ver: '2025',
        links: [
          {url: 'https://pan.quark.cn/s/5f2f785ad5e9?pwd=Qmrr', label: '夸克网盘'}
        ]
      },
      {
        ver: '2024',
        links: [
          {url: 'https://pan.quark.cn/s/cc3e866bd798?pwd=JhXw', label: '夸克网盘'}
        ]
      },
      {
        ver: '2023',
        links: [
          {url: 'https://pan.quark.cn/s/794f52c13937?pwd=CYbC', label: '夸克网盘'}
        ]
      },
      {
        ver: '2022',
        links: [
          {url: 'https://pan.quark.cn/s/d0df410e4deb?pwd=48kY', label: '夸克网盘'}
        ]
      },
      {
        ver: '2021',
        links: [
          {url: 'https://pan.quark.cn/s/70463e3acd88?pwd=zhE2', label: '夸克网盘'}
        ]
      },
      {
        ver: '2020',
        links: [
          {url: 'https://pan.quark.cn/s/b8f9047f95d5?pwd=TUcM', label: '夸克网盘'}
        ]
      },
      {
        ver: '2019',
        links: [
          {url: 'https://pan.quark.cn/s/6945f4526b1b?pwd=QRFv', label: '夸克网盘'}
        ]
      },
      {
        ver: '2018',
        links: [
          {url: 'https://pan.quark.cn/s/2dce90773afb?pwd=nEWL', label: '夸克网盘'}
        ]
      },
      {
        ver: '2017',
        links: [
          {url: 'https://pan.quark.cn/s/9443fc1fc125?pwd=CTpp', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Adobe Illustrator 2024',
    category: 'Adobe',
    platform: 'cross',
    icon: 'fa-vector-square',
    description: '矢量图形与插画设计',
    detailDesc: 'Illustrator 是行业标准的矢量图形设计软件，用于创建徽标、图标、插图、排版和复杂的图形设计。2024 版本增强了对 3D 效果和协作流程的支持。',
    versions: [
      {
        ver: '2024 v28.5',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '迅雷下载'}
        ]
      },
      {
        ver: '2023 v27.8',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Adobe Premiere',
    category: 'Adobe',
    platform: 'cross',
    icon: 'fa-video',
    description: '专业视频剪辑与后期',
    detailDesc: 'Premiere Pro 是 Adobe 旗下的专业非线性视频编辑软件，广泛应用于影视剪辑、短视频制作、广告制作等领域，支持几乎所有的视频格式。',
    versions: [
      {
        ver: '2020',
        links: [
          {url: 'https://pan.quark.cn/s/8c8eaf4b156f?pwd=fEUY', label: '夸克网盘'},
          {url: 'https://pan.xunlei.com/s/VP42dFFWcZuIo3LoeMMlLonNA1?pwd=x46e', label: '迅雷下载'}
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Adobe After Effects 2023',
    category: 'Adobe',
    platform: 'cross',
    icon: 'fa-film',
    description: '动态图形与视觉特效',
    detailDesc: 'After Effects 是行业标准的动态图形和视觉特效软件，用于影视后期合成、MG 动画、特效制作、动态图形设计等创意工作。',
    versions: [
      {
        ver: '2023',
        links: [
          {url: 'https://pan.quark.cn/s/1e7e10619add?pwd=gTji', label: '夸克网盘'},
          {url: 'https://pan.xunlei.com/s/VP42ZjNUuFl_80nT5rSYWP7nA1?pwd=ah76', label: '迅雷下载'}
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Adobe Lightroom 2024',
    category: 'Adobe',
    platform: 'cross',
    icon: 'fa-camera',
    description: '专业摄影后期调色',
    detailDesc: 'Lightroom 专为摄影师设计，提供强大的照片组织、管理和后期调色功能，支持 RAW 格式处理和一键预设调色。',
    versions: [
      {
        ver: '2024 v7.5',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '迅雷下载'}
        ]
      },
      {
        ver: '2023 v6.4',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 6,
    name: 'AutoCAD',
    category: 'CAD',
    platform: 'cross',
    icon: 'fa-drafting-compass',
    description: '计算机辅助设计',
    detailDesc: 'AutoCAD 是 Autodesk 的旗舰 CAD 软件，广泛应用于建筑、机械、电气、土木等领域的二维绘图和三维建模。',
    versions: [
      {
        ver: 'CAD2018',
        links: [
          {url: 'https://pan.quark.cn/s/aafc7d93d163?pwd=7UMw', label: '夸克网盘'}
        ]
      },
      {
        ver: 'CAD2024',
        links: [
          {url: 'https://pan.xunlei.com/s/VP0b2gbj4NYSZJmZMGaYg3xgA1?pwd=yf5j', label: '迅雷下载'}
        ]
      }
    ]
  },
  {
    id: 7,
    name: 'SolidWorks 2024',
    category: 'CAD',
    platform: 'win',
    icon: 'fa-cube',
    description: '三维机械设计',
    detailDesc: 'SolidWorks 是达索系统旗下主流的三维机械 CAD 软件，集设计、仿真、数据管理于一体，广泛应用于机械制造和工业设计。',
    versions: [
      {
        ver: '2024 SP4',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: '2023 SP5',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '迅雷下载'}
        ]
      }
    ]
  },
  {
    id: 8,
    name: 'CATIA V5-6R2024',
    category: 'CAD',
    platform: 'win',
    icon: 'fa-industry',
    description: '高端三维设计工程',
    detailDesc: 'CATIA 是达索系统的旗舰产品，提供从概念设计到制造的全流程解决方案，广泛应用于航空、汽车、船舶等高端制造业。',
    versions: [
      {
        ver: 'V5-6R2024',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: 'V5-6R2023',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 9,
    name: 'NX 2306',
    category: 'CAD',
    platform: 'cross',
    icon: 'fa-cogs',
    description: '集成化产品设计',
    detailDesc: 'Siemens NX 是高端集成化 CAD/CAM/CAE 软件，提供从设计到制造的全数字化产品开发流程。',
    versions: [
      {
        ver: '2306 Series',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: '2212 Series',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 10,
    name: 'Blender 4.2',
    category: '三维动画',
    platform: 'cross',
    icon: 'fa-cubes',
    description: '开源三维创作套件',
    detailDesc: 'Blender 是功能全面的开源三维创作软件，支持建模、雕刻、动画、渲染、合成、视频编辑、VFX 等全流程创作。',
    versions: [
      {
        ver: '4.2 LTS',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '官方下载'}
        ]
      },
      {
        ver: '4.1',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: '3.6 LTS',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 11,
    name: '3ds Max 2025',
    category: '三维动画',
    platform: 'win',
    icon: 'fa-cube',
    description: '三维建模与渲染',
    detailDesc: '3ds Max 是 Autodesk 旗下的专业三维建模、动画和渲染软件，广泛用于游戏开发、建筑可视化和影视特效。',
    versions: [
      {
        ver: '2025.1',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '迅雷下载'}
        ]
      },
      {
        ver: '2024.2',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: '2023.3',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 12,
    name: 'Maya 2025',
    category: '三维动画',
    platform: 'cross',
    icon: 'fa-cube',
    description: '三维动画与特效',
    detailDesc: 'Maya 是 Autodesk 旗下业界领先的三维动画软件，在影视和游戏行业被广泛用于角色动画、特效模拟和场景构建。',
    versions: [
      {
        ver: '2025',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '迅雷下载'}
        ]
      },
      {
        ver: '2024.1',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 13,
    name: 'Cinema 4D 2025',
    category: '三维动画',
    platform: 'cross',
    icon: 'fa-cube',
    description: '三维运动图形',
    detailDesc: 'Cinema 4D 以直观的工作流程和强大的运动图形功能著称，广泛应用于电视广告、动态设计、游戏和建筑可视化。',
    versions: [
      {
        ver: '2025.0',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '迅雷下载'}
        ]
      },
      {
        ver: '2024.4',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 14,
    name: 'Microsoft Office',
    category: '办公软件',
    platform: 'cross',
    icon: 'fa-file-word',
    description: '办公软件套件',
    detailDesc: 'Microsoft Office 包含 Word、Excel、PowerPoint、Outlook、Access 等核心办公应用，是最主流的办公软件套件。',
    versions: [
      {
        ver: '2021 专业增强版',
        links: [
          {url: 'https://pan.xunlei.com/s/VP0aY3haSfyPOYNtZv4c2ntLA1?pwd=mri7', label: '迅雷下载'}
        ]
      }
    ]
  },
  {
    id: 15,
    name: 'WPS Office',
    category: '办公软件',
    platform: 'cross',
    icon: 'fa-file',
    description: '国产办公软件',
    detailDesc: 'WPS Office 是金山软件开发的办公软件套件，完美兼容 Office 格式，个人版免费使用。',
    versions: [
      {
        ver: '2025 专业版',
        links: [
          {url: 'https://pan.xunlei.com/s/VP0VoH6Mb4m7gVf5IXsiaf7zA1?pwd=vfym', label: '迅雷下载'}
        ]
      }
    ]
  },
  {
    id: 17,
    name: 'MATLAB R2024b',
    category: '工业工程',
    platform: 'cross',
    icon: 'fa-cogs',
    description: '科学计算与仿真',
    detailDesc: 'MATLAB 是 MathWorks 开发的高性能数值计算和可视化软件，广泛应用于数据分析、算法开发、信号处理和控制系统设计。',
    versions: [
      {
        ver: 'R2024b',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '迅雷下载'}
        ]
      },
      {
        ver: 'R2024a',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: 'R2023b',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 18,
    name: 'Ansys 2024 R2',
    category: '工业工程',
    platform: 'cross',
    icon: 'fa-chart-line',
    description: '有限元分析仿真',
    detailDesc: 'Ansys 是全球领先的工程仿真软件，提供结构、流体、热、电磁等多物理场仿真分析能力。',
    versions: [
      {
        ver: '2024 R2',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: '2024 R1',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 19,
    name: 'LabVIEW 2024',
    category: '工业工程',
    platform: 'cross',
    icon: 'fa-microchip',
    description: '测试测量与自动化',
    detailDesc: 'LabVIEW 是 NI 开发的图形化编程环境，专为测试、测量和自动化控制应用设计。',
    versions: [
      {
        ver: '2024',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '迅雷下载'}
        ]
      }
    ]
  },
  {
    id: 24,
    name: 'Revit',
    category: '建筑设计',
    platform: 'win',
    icon: 'fa-building',
    description: 'BIM 建筑设计',
    detailDesc: 'Revit  是 Autodesk 专为建筑信息模型 (BIM) 构建的设计工具，单一应用程序集成建筑、结构、机电三大专业功能',
    versions: [
      {
        ver: '2018',
        links: [
          {url: 'https://pan.quark.cn/s/88dec53a4279?pwd=4T23', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 25,
    name: 'SketchUp 2024',
    category: '建筑设计',
    platform: 'cross',
    icon: 'fa-draw-polygon',
    description: '概念三维建模',
    detailDesc: 'SketchUp 是一款直观易用的三维建模软件，深受建筑师、室内设计师和景观设计师的喜爱。',
    versions: [
      {
        ver: '2024',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '迅雷下载'}
        ]
      },
      {
        ver: '2023',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 26,
    name: 'ArchiCAD 27',
    category: '建筑设计',
    platform: 'cross',
    icon: 'fa-building',
    description: 'BIM 建筑设计',
    detailDesc: 'ArchiCAD 是 Graphisoft 开发的 BIM 建筑设计软件，以出色的协作功能和直观的建模方式闻名。',
    versions: [
      {
        ver: 'v27',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: 'v26',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 27,
    name: 'Rhino 8',
    category: '建筑设计',
    platform: 'cross',
    icon: 'fa-shapes',
    description: '三维自由造型',
    detailDesc: 'Rhino（犀牛）在建筑设计和工业设计领域广泛使用，以其强大的 NURBS 曲面建模能力著称。',
    versions: [
      {
        ver: 'v8.8',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '迅雷下载'}
        ]
      },
      {
        ver: 'v7.34',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 28,
    name: 'DaVinci Resolve 19',
    category: '视频后期',
    platform: 'cross',
    icon: 'fa-video',
    description: '专业调色与剪辑',
    detailDesc: 'DaVinci Resolve 是 Blackmagic Design 开发的专业视频调色、编辑、视觉特效和音频后期制作一体化软件。',
    versions: [
      {
        ver: '19.0',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '官方下载'}
        ]
      },
      {
        ver: '18.6',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: '17.4',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 29,
    name: 'Final Cut Pro 10.8',
    category: '视频后期',
    platform: 'mac',
    icon: 'fa-cut',
    description: 'Mac 视频编辑',
    detailDesc: 'Final Cut Pro 是 Apple 为 Mac 开发的专业非线性视频编辑软件，以卓越的磁性时间线和极致性能著称。',
    versions: [
      {
        ver: '10.8',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: '10.7',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 30,
    name: 'Vegas Pro 22',
    category: '视频后期',
    platform: 'win',
    icon: 'fa-film',
    description: '视频编辑与后期',
    detailDesc: 'Vegas Pro 是流行的非线性视频编辑软件，以直观的时间线编辑和强大的音频处理功能受到视频创作者喜爱。',
    versions: [
      {
        ver: '22.0',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '迅雷下载'}
        ]
      },
      {
        ver: '21.0',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 31,
    name: 'Altium Designer 24',
    category: '电子电路',
    platform: 'win',
    icon: 'fa-microchip',
    description: 'PCB 设计软件',
    detailDesc: 'Altium Designer 是专业的 PCB 设计软件，提供原理图捕获、3D PCB 布局布线和 FPGA 开发功能。',
    versions: [
      {
        ver: '24.6',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '迅雷下载'}
        ]
      },
      {
        ver: '24.0',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: '23.5',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 32,
    name: 'KiCad 8.0',
    category: '电子电路',
    platform: 'cross',
    icon: 'fa-bolt',
    description: '开源 EDA 套件',
    detailDesc: 'KiCad 是一款功能完善的开源电子设计自动化（EDA）套件，支持原理图设计和 PCB 布局布线。',
    versions: [
      {
        ver: '8.0.5',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '官方下载'}
        ]
      },
      {
        ver: '7.0.11',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 33,
    name: 'EAGLE 9.6',
    category: '电子电路',
    platform: 'cross',
    icon: 'fa-microchip',
    description: 'PCB 设计工具',
    detailDesc: 'EAGLE 是 Autodesk 开发的 PCB 设计工具，拥有庞大的元件库和活跃的社区支持。',
    versions: [
      {
        ver: '9.6.2',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: '9.5.1',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 34,
    name: 'V-Ray 6',
    category: '渲染引擎',
    platform: 'cross',
    icon: 'fa-sun',
    description: '光线追踪渲染器',
    detailDesc: 'V-Ray 是 Chaos 开发的业界标准光线追踪渲染引擎，广泛用于建筑可视化、影视广告和产品渲染。',
    versions: [
      {
        ver: 'v6.2',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '迅雷下载'}
        ]
      },
      {
        ver: 'v6.1',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: 'v5.2',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 35,
    name: 'Octane Render 2024',
    category: '渲染引擎',
    platform: 'cross',
    icon: 'fa-gem',
    description: 'GPU 渲染器',
    detailDesc: 'Octane Render 是首款完全基于 GPU 的渲染器，以极快的渲染速度和物理级真实感著称。',
    versions: [
      {
        ver: '2024.1',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: '2023.1',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 36,
    name: 'Redshift 3.6',
    category: '渲染引擎',
    platform: 'cross',
    icon: 'fa-star',
    description: 'GPU/CPU 混合渲染',
    detailDesc: 'Redshift 是 Maxon 开发的 GPU 加速渲染器，支持 GPU 和 CPU 混合渲染方式，性能出色。',
    versions: [
      {
        ver: '3.6.01',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '迅雷下载'}
        ]
      },
      {
        ver: '3.5.04',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 37,
    name: 'Corona Renderer 12',
    category: '渲染引擎',
    platform: 'cross',
    icon: 'fa-fire',
    description: '物理真实感渲染',
    detailDesc: 'Corona Renderer 以物理级真实感和易于上手的操作界面著称，特别适合建筑可视化和产品渲染。',
    versions: [
      {
        ver: '12.0',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: '11.0',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 38,
    name: 'CorelDRAW 2024',
    category: '图像绘图',
    platform: 'cross',
    icon: 'fa-paint-brush',
    description: '矢量图形设计',
    detailDesc: 'CorelDRAW 是专业的矢量图形设计和排版软件，在广告设计、标签包装和印刷出版领域有大量用户。',
    versions: [
      {
        ver: '2024 v25',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '迅雷下载'}
        ]
      },
      {
        ver: '2023 v24',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: '2022 v23',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 39,
    name: 'Affinity Designer 2',
    category: '图像绘图',
    platform: 'cross',
    icon: 'fa-pen-nib',
    description: '专业矢量/位图设计',
    detailDesc: 'Affinity Designer 是 Serif 推出的专业设计软件，融合了矢量与位图设计能力，性价比极高。',
    versions: [
      {
        ver: 'v2.5',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: 'v2.4',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 40,
    name: 'Paint.NET 5.1',
    category: '图像绘图',
    platform: 'win',
    icon: 'fa-palette',
    description: '轻量图像编辑',
    detailDesc: 'Paint.NET 是 Windows 平台上一款免费的轻量级图像编辑软件，功能丰富且性能优秀。',
    versions: [
      {
        ver: '5.1.0',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: '5.0.13',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 41,
    name: 'GIMP 2.10',
    category: '图像绘图',
    platform: 'cross',
    icon: 'fa-paint-brush',
    description: '开源图像编辑',
    detailDesc: 'GIMP 是 GNU 开源图像处理软件，功能可媲美 Photoshop，支持各种插件扩展。',
    versions: [
      {
        ver: '2.10.36',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '官方下载'}
        ]
      },
      {
        ver: '2.10.34',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 46,
    name: '7-Zip',
    category: '装机必备',
    platform: 'win',
    icon: 'fa-file-archive',
    description: '文件压缩解压',
    detailDesc: '7-Zip 是免费开源的压缩解压软件，支持 7z、ZIP、RAR 等多种格式，压缩率高且无广告。',
    versions: [
      {
        ver: '22.01',
        links: [
          {url: 'https://pan.quark.cn/s/f59f6bd0c280?pwd=ETjG', label: '夸克网盘'}
        ]
      },
      {
        ver: '21.05',
        links: [
          {url: 'https://pan.quark.cn/s/3f721fcf489e?pwd=FwzE', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 47,
    name: 'Everything 1.4',
    category: '装机必备',
    platform: 'win',
    icon: 'fa-search',
    description: '极速文件搜索',
    detailDesc: 'Everything 是 Windows 上最快的文件搜索工具，基于 NTFS 索引实现秒级搜索。',
    versions: [
      {
        ver: '1.4.1.1026',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      },
      {
        ver: '1.4.1.1018',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 48,
    name: 'PotPlayer 2407',
    category: '装机必备',
    platform: 'win',
    icon: 'fa-play-circle',
    description: '全能视频播放',
    detailDesc: 'PotPlayer 是 Windows 上最强大的视频播放器之一，支持几乎所有视频格式，画质优异且资源占用低。',
    versions: [
      {
        ver: '240701',
        links: [
          {url: '', label: '夸克网盘'},
          {url: '', label: '迅雷下载'}
        ]
      },
      {
        ver: '240618',
        links: [
          {url: '', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 49,
    name: 'Chrome',
    category: '装机必备',
    platform: 'cross',
    icon: 'fa-globe',
    description: '网页浏览器',
    detailDesc: 'Google Chrome 是目前全球最流行的网页浏览器，以快速、安全、扩展丰富著称。',
    versions: [
      {
        ver: 'chorme',
        links: [
          {url: 'https://pan.quark.cn/s/5fec92c8f588?pwd=LvuF', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 50,
    name: 'Notepad++ ',
    category: '装机必备',
    platform: 'win',
    icon: 'fa-edit',
    description: '文本编辑器',
    detailDesc: 'Notepad++ 是 Windows 上最受欢迎的代码和文本编辑器，支持语法高亮、多标签、插件扩展等。',
    versions: [
      {
        ver: '8.6.4',
        links: [
          {url: 'https://pan.quark.cn/s/8e4b0312501c?pwd=xHC5', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 72,
    name: 'R',
    category: '数据分析',
    platform: 'cross',
    icon: 'fa-chart-bar',
    description: '开源统计计算与数据分析编程语言',
    detailDesc: 'R 是一种专为统计计算和数据分析设计的开源编程语言，提供强大的数据处理、统计建模和可视化功能，广泛应用于学术研究、金融分析和数据科学领域，拥有丰富的扩展包生态（CRAN）。',
    versions: [
      {
        ver: 'R-4.5.1-win',
        links: [
          {url: 'https://pan.quark.cn/s/0a2c91d2944b?pwd=PrT6', label: '夸克网盘'}
        ]
      },
      {
        ver: 'R for MacOS',
        links: [
          {url: 'https://pan.quark.cn/s/f77525b04a64?pwd=SSDJ', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 73,
    name: 'RStudio',
    category: '数据分析',
    platform: 'cross',
    icon: 'fa-terminal',
    description: '专业的R语言集成开发环境。',
    detailDesc: 'RStudio 是专为R语言打造的免费开源集成开发环境（IDE），集代码编辑、数据查看、图表绘制和包管理于一体，界面友好、功能强大，大幅提升R语言的数据分析和可视化开发效率。',
    versions: [
      {
        ver: 'RStudio for win',
        links: [
          {url: 'https://pan.quark.cn/s/236dc890e0f1?pwd=c129', label: '夸克网盘'}
        ]
      },
      {
        ver: 'RStudio for MacOS',
        links: [
          {url: 'https://pan.quark.cn/s/c8051810b453?pwd=TK8x', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 74,
    name: 'Stata',
    category: '数据分析',
    platform: 'cross',
    icon: 'fa-chart-bar',
    description: '专业的统计分析与数据管理软件',
    detailDesc: 'stata 是集数据管理、统计分析和可视化于一体的专业软件，广泛应用于学术研究和商业分析。',
    versions: [
      {
        ver: 'Stata18 -win',
        links: [
          {url: 'https://pan.quark.cn/s/1cf87a7cf68a?pwd=wnFt', label: '夸克网盘'}
        ]
      },
      {
        ver: 'Stata -macos',
        links: [
          {url: 'https://pan.quark.cn/s/e007316d0860?pwd=UCzh', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 75,
    name: 'Multisim',
    category: '电子电路',
    platform: 'cross',
    icon: 'fa-microchip',
    description: '行业标准的SPICE电路仿真与设计软件。',
    detailDesc: '电子电路仿真设计软件，集原理图捕获、SPICE仿真和虚拟仪器于一体。内置超过55,000个经制造商验证的元件模型，支持模拟、数字及电力电子电路的交互式仿真与分析，广泛应用于高校电类教学和工程设计领域',
    versions: [
      {
        ver: '14.3',
        links: [
          {url: 'https://pan.quark.cn/s/c6a543e0563d?pwd=XTEW', label: '夸克网盘'}
        ]
      }
    ]
  },
  {
    id: 76,
    name: 'MathType',
    category: '办公软件',
    platform: 'cross',
    icon: 'fa-file-word',
    description: '专业的可视化数学公式编辑器。',
    detailDesc: '提供超过 500 个数学符号和模板，可零误差书写各类复杂公式，并自动优化排版。完美兼容 Microsoft Office、WPS 等 800 余种应用，支持 LaTeX 与 MathML 格式互转，广泛应用于学术论文、教育教学和科研报告写作。',
    versions: [
      {
        ver: '7.7.1',
        links: [
          {url: 'https://pan.quark.cn/s/25fc77c3888c?pwd=rDmV', label: ''}
        ]
      }
    ]
  },
  {
    id: 77,
    name: 'Audition',
    category: 'Adobe',
    platform: 'cross',
    icon: 'fa-paint-brush',
    description: 'Audition 是 Adobe 旗下的专业音频工作站软件',
    detailDesc: 'Audition是 Adobe 旗下的专业音频工作站软件，主要用于音频的录制、编辑、混音、降噪和母带处理。',
    versions: [
      {
        ver: 'Audition2022',
        links: [
          {url: 'https://pan.quark.cn/s/99db80aa205b?pwd=fbNz', label: '夸克网盘'},
          {url: 'https://pan.xunlei.com/s/VP42aQU_nEOm4JyQorHsICYMA1?pwd=e3wa', label: '迅雷网盘'}
        ]
      }
    ]
  }
];
