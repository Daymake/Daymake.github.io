
import React, { useState } from 'react';
import { 
  Github, Wrench, Dna, Play, Layers, Cpu, ExternalLink, Globe, Code2, 
  Search, Database, MessageSquare, Mail, PenTool, Activity, Calculator,
  Music, Film, Gamepad2, Image, Palette, Camera, Tv
} from 'lucide-react';

// =============================================================================
// 🔧 配置区域 (Configuration)
// =============================================================================

/**
 * 链接项配置说明：
 * @property title  - 标题 (必填)
 * @property desc   - 描述 (必填)
 * @property url    - 跳转链接 (必填)
 * @property icon   - [可选] 手动指定图标组件 (如 <Github />)。如果不填，系统会自动根据 URL 拉取网站 Favicon。
 * @property color  - [可选] 图标背景色 (如 'bg-blue-500')。
 *                    - 如果有 icon，建议填深色背景配合白色图标。
 *                    - 如果无 icon (使用自动Favicon)，建议不填或填浅色，系统默认会用浅灰色背景。
 */
interface LinkItem {
  title: string;
  desc: string;
  url: string;
  icon?: React.ReactNode; 
  color?: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: LinkItem[];
}

const DATA_SOURCE: Category[] = [
  
  // =========================================================================
  // 1. 常用工具 (Tools)
  // =========================================================================
  {
    id: 'tools',
    name: '常用工具',
    icon: <Wrench size={18} />,
    items: [
      { 
        title: '语雀', 
        desc: '专业的云端知识库', 
        url: 'https://www.yuque.com', 
        icon: <PenTool size={20} />, 
        color: 'bg-emerald-600' // 手动指定背景色
      },
      { 
        title: 'QQ 邮箱', 
        desc: '腾讯 QQ 邮箱', 
        url: 'https://mail.qq.com', 
        icon: <Mail size={20} />, 
        color: 'bg-orange-500' 
      },
      { 
        title: '开源中国', 
        desc: '中文开源技术交流社区', 
        url: 'https://www.oschina.net', 
        icon: <Code2 size={20} />, 
        color: 'bg-green-600' 
      },
      { 
        title: 'GitHub', 
        desc: '全球最大的代码托管平台', 
        url: 'https://github.com', 
        icon: <Github size={20} />, 
        color: 'bg-zinc-800' 
      },
      {
        title: '房贷计算器',
        desc: '在线房贷利率计算',
        url: 'https://www.fangdaijisuanqi.com',
        // 未指定 icon -> 自动获取 Favicon
        // 未指定 color -> 默认浅灰背景
      },
      { 
        title: '知乎', 
        desc: '有问题，就会有答案', 
        url: 'https://www.zhihu.com', 
        // 自动获取 Favicon 演示
      },
      { 
        title: 'V2EX', 
        desc: '创意工作者们的社区', 
        url: 'https://www.v2ex.com', 
        // 自动获取 Favicon 演示
      },
      { 
        title: 'Bilibili', 
        desc: '干杯 (゜-゜)つロ', 
        url: 'https://www.bilibili.com', 
        icon: <Tv size={20} />, 
        color: 'bg-pink-400' 
      }, 
    ]
  },

  // =========================================================================
  // 2. 生物信息 (Bioinfo)
  // =========================================================================
  {
    id: 'bioinfo',
    name: '生物信息',
    icon: <Dna size={18} />,
    items: [
      { title: 'NCBI', desc: '生物技术信息中心', url: 'https://www.ncbi.nlm.nih.gov', icon: <Database size={20} />, color: 'bg-blue-800' },
      { title: 'Bioconda', desc: '生物信息软件包管理器', url: 'https://bioconda.github.io', icon: <Dna size={20} />, color: 'bg-green-500' },
      { title: 'R Project', desc: 'R 语言官方网站', url: 'https://www.r-project.org', icon: <Code2 size={20} />, color: 'bg-blue-500' },
    ]
  },

  // =========================================================================
  // 3. 科研办公 (Office)
  // =========================================================================
  {
    id: 'office',
    name: '科研办公',
    icon: <Cpu size={18} />,
    items: [
      { title: 'Google Scholar', desc: '谷歌学术搜索', url: 'https://scholar.google.com' },
      { title: 'Overleaf', desc: '在线 LaTeX 编辑器', url: 'https://www.overleaf.com' },
    ]
  },

  // =========================================================================
  // 4. 悠闲娱乐 (Leisure) - 全自动 Favicon 演示
  // =========================================================================
  {
    id: 'leisure',
    name: '悠闲娱乐',
    icon: <Play size={18} />,
    items: [
       { title: '网易云音乐', desc: '音乐的力量', url: 'https://music.163.com' },
       { title: '豆瓣', desc: '记录你的生活', url: 'https://www.douban.com' },
       { title: 'Steam', desc: '快乐的源泉', url: 'https://store.steampowered.com' },
       { title: 'YouTube', desc: '全球最大的视频网站', url: 'https://www.youtube.com' },
    ]
  },

  // =========================================================================
  // 5. 素材资源 (Assets)
  // =========================================================================
  {
    id: 'assets',
    name: '素材资源',
    icon: <Layers size={18} />,
    items: [
       { title: 'Unsplash', desc: '免费高质量图片', url: 'https://unsplash.com', icon: <Camera size={20} />, color: 'bg-black' },
       { title: 'Iconfont', desc: '阿里矢量图标库', url: 'https://www.iconfont.cn', icon: <Palette size={20} />, color: 'bg-purple-600' },
       { title: 'Pexels', desc: '免费素材照片', url: 'https://www.pexels.com' },
    ]
  },
];

// =============================================================================
// 🧩 组件逻辑 (Component Logic)
// =============================================================================

const Friends: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('tools');

  // 获取 Google Favicon API
  const getFaviconUrl = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    } catch (e) {
      return '';
    }
  };

  const activeItems = DATA_SOURCE.find(c => c.id === activeCategory)?.items || [];

  return (
    <div className="relative z-30 w-full max-w-6xl mx-auto px-4 mt-20 mb-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="bg-white/90 backdrop-blur-2xl border border-white/60 rounded-3xl overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.2)] flex flex-col md:flex-row min-h-[500px]">
        
        {/* --- 侧边栏 (Sidebar) --- */}
        <div className="w-full md:w-64 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-4 relative z-10">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-4 pt-2">分类导航</h2>
          <div className="space-y-2">
            {DATA_SOURCE.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeCategory === cat.id 
                    ? 'bg-white text-rose-600 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] border border-slate-100 transform scale-[1.02]' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                }`}
              >
                <span className={activeCategory === cat.id ? 'text-rose-500' : 'text-slate-400'}>
                  {cat.icon}
                </span>
                <span>{cat.name}</span>
                {activeCategory === cat.id && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* --- 主内容区 (Main Grid) --- */}
        <div className="flex-1 p-5 md:p-6 bg-white/40">
          {/* 标题栏 */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl text-slate-900 font-extrabold flex items-center gap-2 tracking-tight">
                {DATA_SOURCE.find(c => c.id === activeCategory)?.icon}
                <span>{DATA_SOURCE.find(c => c.id === activeCategory)?.name}</span>
            </h2>
            <span className="text-xs font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                {activeItems.length} 个资源
            </span>
          </div>

          {/* 卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {activeItems.length > 0 ? (
              activeItems.map((item, idx) => {
                // 判断是否使用自动 Favicon 模式 (没有提供手动 icon)
                const isAutoIcon = !item.icon;
                
                // 默认背景色逻辑: 
                // 手动 Icon -> 默认为用户指定的 color，如果没有指定则用灰色
                // 自动 Favicon -> 默认为白色/浅灰 (bg-slate-50) 以显示原始图标颜色，如果用户强制指定了 color 则用用户的
                const bgColorClass = item.color 
                    ? item.color 
                    : (isAutoIcon ? 'bg-slate-50' : 'bg-slate-100');

                // 只有在手动 Icon 且指定了深色背景时，才强制文字为白色，否则跟随系统(自动Favicon通常是彩色图，不需要白色文字配合)
                const textColorClass = !isAutoIcon && item.color ? 'text-white' : 'text-slate-500';

                return (
                  <a 
                    key={idx} 
                    href={item.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative bg-white border border-slate-200 hover:border-rose-300/50 rounded-2xl p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] flex items-center gap-3 overflow-hidden"
                  >
                    {/* 图标容器 */}
                    <div className={`w-12 h-12 rounded-xl ${bgColorClass} ${textColorClass} flex items-center justify-center shrink-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] border border-black/5 overflow-hidden relative`}>
                      {item.icon ? (
                        // 1. 手动图标
                        <div className="drop-shadow-md">{item.icon}</div>
                      ) : (
                        // 2. 自动 Favicon
                        <>
                           <img 
                             src={getFaviconUrl(item.url)} 
                             alt={item.title}
                             className="w-7 h-7 object-contain relative z-10 drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                             onError={(e) => {
                                 // 如果加载失败，隐藏图片，显示后备图标
                                 e.currentTarget.style.display = 'none';
                                 const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                 if (fallback) fallback.style.display = 'flex';
                             }}
                           />
                           {/* 3. 后备图标 (默认隐藏) */}
                           <div className="hidden absolute inset-0 items-center justify-center bg-slate-100">
                                <Globe size={24} className="text-slate-300" />
                           </div>
                        </>
                      )}
                    </div>
                    
                    {/* 文本内容 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-slate-900 font-bold text-sm truncate group-hover:text-rose-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-xs truncate mt-1 font-medium leading-relaxed opacity-80">
                        {item.desc}
                      </p>
                    </div>

                    {/* 悬浮箭头 */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 absolute right-3 top-3 transform translate-x-2 group-hover:translate-x-0">
                       <ExternalLink size={14} className="text-rose-400" />
                    </div>
                  </a>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
                <Layers size={48} className="mb-4 opacity-20" />
                <p className="font-medium">该分类下暂无内容</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
