
import React from 'react';
import { Home, Megaphone, Link2, User } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onNavigate: (view: 'home' | 'friends' | 'notice' | 'about') => void;
  currentView: 'home' | 'friends' | 'notice' | 'about';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-40 h-16 flex items-center justify-between px-6 lg:px-12 bg-white/70 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all duration-300">
      {/* Logo Area */}
      <div onClick={() => onNavigate('home')} className="flex items-center gap-3 group cursor-pointer">
        <div className="relative w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
           <Logo className="w-full h-full group-hover:animate-heartbeat" />
        </div>
        <span className="text-slate-700 font-medium tracking-wider text-base group-hover:text-rose-500 transition-colors duration-300">捌玖</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-2">
        
        {/* Home */}
        <button 
          onClick={() => onNavigate('home')}
          className={`group relative px-4 py-2 rounded-lg text-sm transition-colors duration-300 flex items-center gap-2 overflow-hidden ${currentView === 'home' ? 'text-rose-600 bg-rose-50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
        >
            <span className={`group-hover:text-rose-500 transition-colors duration-300 ${currentView === 'home' ? 'text-rose-500' : ''}`}><Home size={15} /></span>
            <span>首页</span>
        </button>

        {/* Notice (formerly Announcements) */}
        <button 
          onClick={() => onNavigate('notice')}
          className={`group relative px-4 py-2 rounded-lg text-sm transition-colors duration-300 flex items-center gap-2 overflow-hidden ${currentView === 'notice' ? 'text-rose-600 bg-rose-50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
        >
            <span className={`group-hover:text-rose-500 transition-colors duration-300 ${currentView === 'notice' ? 'text-rose-500' : ''}`}><Megaphone size={15} /></span>
            <span>公告</span>
        </button>

        {/* Friends (formerly FriendLinks) */}
        <button 
          onClick={() => onNavigate('friends')}
          className={`group relative px-4 py-2 rounded-lg text-sm transition-colors duration-300 flex items-center gap-2 overflow-hidden ${currentView === 'friends' ? 'text-rose-600 bg-rose-50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
        >
            <span className={`group-hover:text-rose-500 transition-colors duration-300 ${currentView === 'friends' ? 'text-rose-500' : ''}`}><Link2 size={15} /></span>
            <span>友链</span>
        </button>

        {/* About - Internal Navigation */}
        <button 
          onClick={() => onNavigate('about')}
          className={`group relative px-4 py-2 rounded-lg text-sm transition-colors duration-300 flex items-center gap-2 overflow-hidden ${currentView === 'about' ? 'text-rose-600 bg-rose-50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
        >
            <span className={`group-hover:text-rose-500 transition-colors duration-300 ${currentView === 'about' ? 'text-rose-500' : ''}`}><User size={15} /></span>
            <span>关于</span>
        </button>

      </nav>

      {/* Mobile Menu Icon */}
      <div className="md:hidden p-2 text-slate-500 cursor-pointer hover:text-slate-800 transition-colors">
        <div className="space-y-1.5">
            <span className="block w-5 h-0.5 bg-current rounded-full"></span>
            <span className="block w-5 h-0.5 bg-current rounded-full"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
