
import React from 'react';
import { Bell, Calendar, Tag, Megaphone, CheckCircle2, AlertCircle } from 'lucide-react';

interface Announcement {
  id: string;
  date: string;
  title: string;
  content: string;
  type: 'update' | 'alert' | 'news';
}

const announceList: Announcement[] = [
  {
    id: '4',
    date: '2024-05-20',
    title: '内容板块扩充',
    content: '新增了“悠闲娱乐”与“素材资源”分类，收录了网易云、Steam、Unsplash 等常用站点。',
    type: 'update'
  },
  {
    id: '3',
    date: '2023-11-05',
    title: '资源收录更新',
    content: '新增了“生物信息”分类下的 5 个常用工具链接，优化了移动端访问体验。',
    type: 'update'
  },
  {
    id: '2',
    date: '2023-10-28',
    title: '服务器维护通知',
    content: '将于本月底进行服务器例行维护，预计耗时 2 小时，期间访问可能会有波动，请知悉。',
    type: 'alert'
  },
  {
    id: '1',
    date: '2023-10-01',
    title: '捌玖导航正式上线',
    content: '经过一个月的开发与调试，捌玖导航站正式与大家见面啦！收录全网优质资源，欢迎提交收录。',
    type: 'news'
  }
];

const Notice: React.FC = () => {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'update': return { color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', icon: <CheckCircle2 size={16} /> };
      case 'alert': return { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: <AlertCircle size={16} /> };
      case 'news': 
      default: return { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: <Megaphone size={16} /> };
    }
  };

  return (
    <div className="relative z-30 w-full max-w-4xl mx-auto px-4 mt-24 mb-12 animate-[fadeIn_0.5s_ease-out]">
      {/* Light Glass Background with Strong Shadow */}
      <div className="bg-white/90 backdrop-blur-xl border border-white/80 rounded-2xl p-8 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)]">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-200">
            <div className="p-3 bg-rose-50 rounded-xl text-rose-500 shadow-sm border border-rose-100">
                <Bell size={24} />
            </div>
            <div>
                <h2 className="text-2xl font-extrabold text-slate-900">站务公告</h2>
                <p className="text-sm text-slate-500 mt-1 font-medium">关注本站最新动态与通知</p>
            </div>
        </div>

        {/* Timeline */}
        <div className="relative pl-4 md:pl-8 space-y-10">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-8 top-2 bottom-2 w-[2px] bg-gradient-to-b from-rose-300/50 via-slate-200 to-transparent"></div>

            {announceList.map((item) => {
               const style = getTypeStyles(item.type);
               return (
                 <div key={item.id} className="relative pl-8 md:pl-10 group">
                    {/* Dot */}
                    <div className={`absolute left-0 top-1 w-[34px] h-[34px] md:w-[34px] md:h-[34px] -ml-[17px] md:-ml-[17px] rounded-full border-[4px] border-white ${style.bg} ${style.color} flex items-center justify-center z-10 shadow-md transition-transform duration-300 group-hover:scale-110`}>
                        {style.icon}
                    </div>

                    {/* Card */}
                    <div className="bg-white border border-slate-100 hover:border-rose-300/50 rounded-xl p-5 transition-all duration-300 hover:translate-x-1 hover:shadow-lg shadow-sm">
                        <div className="flex flex-wrap items-center gap-3 mb-3 text-xs md:text-sm">
                            <span className={`px-2 py-0.5 rounded-md border ${style.border} ${style.bg} ${style.color} flex items-center gap-1 font-bold`}>
                                <Tag size={12} />
                                {item.type === 'update' ? '更新' : item.type === 'alert' ? '通知' : '动态'}
                            </span>
                            <span className="flex items-center gap-1 text-slate-400 font-mono font-medium">
                                <Calendar size={12} />
                                {item.date}
                            </span>
                        </div>
                        
                        <h3 className="text-lg text-slate-800 font-bold mb-2 group-hover:text-rose-600 transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                            {item.content}
                        </p>
                    </div>
                 </div>
               );
            })}
        </div>

        {/* Footer Hint */}
        <div className="mt-12 pt-6 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-500 font-medium">
                更多历史公告请查阅 <a href="#" className="text-slate-600 hover:text-rose-500 border-b border-transparent hover:border-rose-500 transition-all">归档记录</a>
            </p>
        </div>

      </div>
    </div>
  );
};

export default Notice;
