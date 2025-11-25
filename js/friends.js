/**
 * js/friends.js
 * 友链数据管理：仅负责维护数据源，渲染与交互逻辑已迁移至 js/main.js
 *
 * ==============================
 * 数据结构参考 (Advanced Example)
 * ==============================
 * {
 *   id: "分类唯一ID",
 *   name: "分类名称",
 *   icon: "<svg/path>",
 *   items: [
 *     {
 *       title: "站点标题",
 *       desc: "简短描述",
 *       url: "https://example.com",
 *       icon: "https://example.com/logo.png", // 可选
 *       icon_bg: "bg-blue-100",             // 可选，自定义图标背景色
 *       color: "bg-yellow-50 border-yellow-200" // 可选，自定义卡片背景
 *     }
 *   ]
 * }
 */

window.FriendsData = [
    {
        id: 'tools',
        name: '常用工具',
        icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
        items: [
            { title: '语雀', desc: '专业的云端知识库', url: 'https://www.yuque.com' },
            { title: 'QQ邮箱', desc: '腾讯QQ邮箱服务', url: 'https://mail.qq.com' },
            { title: 'GitHub', desc: '代码托管平台', url: 'https://github.com' },
            { title: '在线PS', desc: '网页版PhotoShop', url: 'https://ps.gaoding.com' },
            { title: 'Bilibili', desc: '干杯~', url: 'https://www.bilibili.com', icon_bg: 'bg-pink-100' },
            { title: '知乎', desc: '有问题就会有答案', url: 'https://www.zhihu.com' },
            { title: '开源中国', desc: '技术交流社区', url: 'https://www.oschina.net' },
            { title: '房贷计算器', desc: '在线房贷计算', url: 'https://www.fangdaijisuanqi.com' },
            { title: 'V2EX', desc: '创意工作者社区', url: 'https://www.v2ex.com' },
            { title: 'M3U8播放器', desc: '在线视频播放测试', url: 'https://m3u8-player.com' }
        ]
    },
    {
        id: 'ai',
        name: 'AI 服务',
        icon: '<path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>',
        items: [
            { title: 'ChatGPT', desc: 'OpenAI 聊天机器人', url: 'https://chat.openai.com' },
            { title: 'Claude', desc: 'Anthropic AI', url: 'https://claude.ai' },
            { title: '文心一言', desc: '百度AI助手', url: 'https://yiyan.baidu.com' }
        ]
    },
    {
        id: 'bio',
        name: '生物信息',
        icon: '<path d="M2 12h5"/><path d="M17 12h5"/><path d="M7 12v-1.5a2.5 2.5 0 0 1 5 0"/><path d="M12 10.5v3a2.5 2.5 0 0 0 5 0V12"/>',
        items: [
            { title: 'NCBI', desc: '生物技术信息中心', url: 'https://www.ncbi.nlm.nih.gov' },
            { title: 'Bioconda', desc: '生物信息软件包', url: 'https://bioconda.github.io' },
            { title: 'R Project', desc: 'R 语言官网', url: 'https://www.r-project.org' }
        ]
    },
    {
        id: 'office',
        name: '科研办公',
        icon: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
        items: [
            { title: 'Google Scholar', desc: '谷歌学术', url: 'https://scholar.google.com' }
        ]
    },
    {
        id: 'leisure',
        name: '悠闲娱乐',
        icon: '<polygon points="5 3 19 12 5 21 5 3"/>',
        items: []
    },
    {
        id: 'assets',
        name: '素材资源',
        icon: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
        items: []
    }
];
