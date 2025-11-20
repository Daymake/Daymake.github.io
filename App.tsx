import React from 'react';
import { Github, Copyright, ShieldCheck, Server, Cpu } from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import UptimeCounter from './components/UptimeCounter';
import Badge from './components/Badge';

const App: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-end overflow-hidden bg-[#0d0d0f] text-gray-300 selection:bg-blue-500/30 pb-8">
      
      {/* Background Animation */}
      <ParticleBackground />

      {/* Main Content Container - Stacked at the bottom with uniform spacing */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        
        {/* Line 1: Status Pill */}
        <div className="flex items-center rounded-[4px] overflow-hidden text-xs transform hover:scale-105 transition-transform duration-300 shadow-lg">
           <div className="bg-[#4285f4] text-white px-2 py-1 flex items-center gap-1">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" className="w-3 h-3 animate-spin-slow" alt="logo" style={{animationDuration: '3s'}} />
             <span>捌玖</span>
           </div>
           <div className="bg-[#dcdcdc] text-[#555555] px-2 py-1 font-bold">
             营 业 中
           </div>
        </div>

        {/* Line 2: Dynamic Uptime Counter */}
        <UptimeCounter />

        {/* Line 3: Badges / Shields Row */}
        <div className="flex flex-nowrap justify-center items-center gap-1 opacity-90 hover:opacity-100 transition-opacity overflow-x-auto max-w-full px-2 scrollbar-hide">
            
            {/* Frame Hexo (Using Blue) - System class colorful icon */}
            <Badge 
              leftText="Frame" 
              rightText="Hexo" 
              color="sky" 
              icon={<Cpu size={11} className="text-sky-300" />}
              tooltip="系統名稱"
            />

            {/* Hosted Oracle (Using Green) - Server icon */}
            <Badge 
              leftText="Hosted" 
              rightText="Oracle" 
              color="green"
              icon={<Server size={11} />} 
              tooltip="本站採用 多線部署，主線託管於甲骨文雲"
            />

            {/* ICP License (Using Pink) */}
            <Badge 
              leftText="萌ICP备" 
              rightText="20230285" 
              color="pink"
              icon={<ShieldCheck size={11} />}
              tooltip="備案"
            />

            {/* Source Github (Using Purple) */}
            <Badge 
              leftText="Source" 
              rightText="Github" 
              color="purple" 
              icon={<Github size={11} fill="currentColor" />}
              href="https://github.com"
              tooltip="本項目由託管"
            />

            {/* Copyright (Using Red) */}
            <Badge 
              leftText="Copyright" 
              rightText="BY-NC-SA 4.0" 
              color="red" 
              icon={<Copyright size={11} />}
              tooltip="我愛妳捌玖"
            />

        </div>

        {/* Line 4: Copyright Text */}
        <div className="flex items-center gap-2 text-sm md:text-base text-gray-400 font-light tracking-wide">
          <span>&copy;2023 - {currentYear}</span>
          <span className="text-blue-400 animate-pulse">🦋</span>
          <span className="font-medium text-gray-300">捌玖</span>
        </div>

      </div>

      {/* Decorative gradient for bottom */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-0"></div>
    </div>
  );
};

export default App;