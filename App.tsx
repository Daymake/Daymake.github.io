
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Github, ShieldCheck, Cpu, Server } from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import UptimeCounter from './components/UptimeCounter';
import Badge from './components/Badge';
import NotificationBox from './components/NotificationBox';
import Friends from './components/Friends';
import Notice from './components/Notice';
import About from './components/About';
import Header from './components/Header';
import Logo from './components/Logo';

// Custom Dog Food Icon for Closed State (Provided by user)
const DogFoodIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 1024 1024" 
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    fill="currentColor"
  >
    <path d="M972.8 230.4C896 115.2 780.8 64 704 108.8c-6.4 6.4-12.8 6.4-19.2 12.8C640 89.6 582.4 64 524.8 64c-70.4 0-128 25.6-179.2 64-6.4-6.4-19.2-12.8-25.6-19.2C243.2 64 128 115.2 51.2 230.4-19.2 345.6-19.2 473.6 51.2 524.8c25.6 12.8 51.2 19.2 83.2 12.8-6.4 57.6-12.8 108.8-12.8 153.6 0 224 172.8 262.4 345.6 262.4v-192c-38.4-19.2-70.4-64-70.4-102.4C396.8 601.6 448 576 512 576s115.2 25.6 115.2 83.2c0 38.4-25.6 83.2-70.4 102.4V960c185.6 0 364.8-32 364.8-262.4 0-44.8-6.4-96-12.8-153.6 19.2 0 44.8-6.4 57.6-19.2 76.8-44.8 76.8-179.2 6.4-294.4zM403.2 492.8c-32 0-51.2-25.6-51.2-51.2 0-32 25.6-57.6 51.2-57.6 32 0 51.2 25.6 51.2 51.2 0 32-19.2 57.6-51.2 57.6z m217.6 0c-32 0-51.2-25.6-51.2-51.2 0-32 19.2-57.6 51.2-57.6s51.2 25.6 51.2 51.2c0 32-25.6 57.6-51.2 57.6z" />
  </svg>
);

// Custom H5 Icon
const H5Icon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 1024 1024" 
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    fill="currentColor"
  >
    <path d="M512 0A512 512 0 0 0 0 512c0 15.928889 0 31.573333 2.56 47.217778 0 4.551111 0 8.817778 1.422222 13.368889 0 11.662222 3.128889 23.04 5.404445 34.417777 0 4.266667 0 8.533333 2.275555 12.8 3.128889 14.791111 6.826667 28.444444 11.377778 43.804445a22.186667 22.186667 0 0 0 0 3.982222c3.982222 13.084444 8.817778 25.884444 13.937778 38.4 1.706667 4.266667 3.697778 8.248889 5.404444 12.515556 4.551111 10.24 9.386667 19.911111 14.506667 28.444444l5.688889 11.377778c7.111111 12.515556 14.506667 25.031111 22.755555 36.977778l5.404445 7.68c6.542222 9.386667 13.368889 18.488889 20.764444 28.444444 3.128889 4.266667 6.826667 8.248889 10.24 12.231111s12.8 14.506667 19.342222 21.617778l11.093334 11.377778c9.671111 9.386667 19.626667 18.488889 30.151111 28.444444l13.937778 11.093334 19.911111 14.791111 18.204444 12.231111 17.635556 10.808889 20.48 11.662222 6.257778 2.844444c9.102222 4.551111 17.92 9.102222 28.444444 13.084445v-2.844445c0-102.4 75.377778-176.64 206.222222-176.64h21.617778c131.413333 0 184.888889 74.24 184.888889 176.64a8.817778 8.817778 0 0 0 2.844444 0 512 512 0 0 0 56.888889-28.444444l6.826667-4.551111c8.817778-5.404444 17.351111-11.093333 25.6-17.351111l7.111111-5.404445a486.115556 486.115556 0 0 0 70.542222-64 117.191111 117.191111 0 0 0 7.964445-8.817778c6.257778-6.826667 11.946667-13.937778 17.635555-21.048888l9.102222-12.231112c7.964444-10.808889 15.36-21.617778 22.471112-32.995555 4.266667-6.826667 8.533333-13.368889 12.231111-20.195556l9.955555-19.057777 10.24-21.048889c2.56-6.257778 5.404444-12.231111 7.68-18.488889s7.395556-19.057778 10.808889-28.444445c0-3.982222 2.844444-7.964444 3.982222-11.946666a414.72 414.72 0 0 0 10.808889-42.097778c0-4.551111 1.991111-9.386667 2.844445-14.222222 1.991111-10.808889 3.697778-21.902222 5.12-32.995556 0-4.551111 0-9.386667 1.422222-13.937778 0-15.644444 2.275556-31.004444 2.275555-46.933333A512 512 0 0 0 512 0z m363.52 549.262222c0 138.24-91.022222 199.111111-290.417778 211.342222-23.608889 1.706667-48.64 2.275556-75.377778 2.275556a1054.72 1054.72 0 0 1-113.777777-5.404444c-164.408889-17.92-247.182222-81.066667-247.182223-206.791112v-56.888888c0-126.008889 79.644444-197.404444 242.062223-219.022223 4.551111-21.902222 12.8-47.786667 66.56-51.768889a933.831111 933.831111 0 0 1 116.337777 0 62.008889 62.008889 0 0 1 61.44 53.191112c161.28 22.755556 240.64 94.435556 240.355556 218.737777z" fill="#13227a"></path><path d="M761.742222 571.164444a61.724444 61.724444 0 0 0 0-7.395555z" fill="#13227a"></path><path d="M745.244444 638.293333l2.844445-2.844444-2.844445 2.56zM645.688889 392.533333l-5.688889-1.422222h-2.275556 2.56z" fill="#13227a"></path><path d="M525.937778 866.133333H512a142.222222 142.222222 0 0 0-96.426667 31.573334 97.848889 97.848889 0 0 0-20.764444 25.315555 107.804444 107.804444 0 0 0-11.093333 31.288889 124.586667 124.586667 0 0 0-2.275556 23.324445v30.151111H391.111111l18.488889 4.551111 19.057778 3.413333 19.626666 2.56 22.186667 2.275556c13.368889 0 26.737778 1.991111 40.675556 1.991111s28.444444 0 40.96-1.991111l21.048889-2.275556 41.244444-6.542222c7.111111 0 13.937778-3.697778 21.048889-5.404445h4.835555v-28.728888c2.56-64.568889-31.004444-111.502222-114.346666-111.502223z" fill="#13227a"></path><path d="M581.688889 697.457778h11.946667-14.791112z" fill="#13227a"></path><path d="M759.466667 490.097778a70.826667 70.826667 0 0 0-2.56-10.524445 51.768889 51.768889 0 0 0-3.697778-10.524444 56.888889 56.888889 0 0 0-4.835556-10.524445 67.982222 67.982222 0 0 0-3.697777-5.973333 26.737778 26.737778 0 0 0-3.413334-5.12 96.711111 96.711111 0 0 0-7.111111-8.817778 78.506667 78.506667 0 0 0-8.533333-8.248889 2.844444 2.844444 0 0 0-1.422222 0 50.062222 50.062222 0 0 0-8.533334-6.826666 87.324444 87.324444 0 0 0-11.377778-7.395556 155.591111 155.591111 0 0 0-28.444444-13.368889 130.844444 130.844444 0 0 0-15.928889-5.404444l-5.688889-2.844445h-15.928889l-14.222222-2.844444c-8.817778-1.706667-17.635556-3.413333-28.444444-4.551111a789.902222 789.902222 0 0 0-85.333334 0h-39.253333l-31.857778 2.275555a403.626667 403.626667 0 0 0-60.871111 10.24l-11.662222 3.128889-9.671111 3.128889-7.395556 2.56-3.982222 1.706667a93.013333 93.013333 0 0 0-9.386667 3.982222 117.76 117.76 0 0 0-54.044444 45.511111 80.782222 80.782222 0 0 0-8.248889 17.351111 128.853333 128.853333 0 0 0-7.395556 46.648889v44.373334a158.72 158.72 0 0 0 5.404445 44.088888 108.942222 108.942222 0 0 0 4.835555 12.231112 68.835556 68.835556 0 0 0 7.395556 13.368888c1.991111 2.56 3.982222 5.404444 6.257778 7.964445l1.991111 2.275555a80.497778 80.497778 0 0 0 7.111111 6.826667l4.835556 3.982222a52.337778 52.337778 0 0 0 6.257777 4.835556 72.533333 72.533333 0 0 0 11.093334 6.826667 117.191111 117.191111 0 0 0 13.368889 6.826666 193.137778 193.137778 0 0 0 25.031111 9.386667l9.671111 2.844444a195.697778 195.697778 0 0 0 20.48 5.12l12.8 1.706667c30.72 3.128889 70.826667 4.551111 108.373333 4.551111H607.288889c9.386667 0 18.204444-1.706667 28.444444-3.128889 67.128889-13.937778 98.986667-38.968889 113.777778-67.413333a116.053333 116.053333 0 0 0 6.257778-15.36 79.36 79.36 0 0 0 2.844444-11.093333v-7.111112-11.093333a69.404444 69.404444 0 0 1 0-7.68v-56.32a170.666667 170.666667 0 0 0 0-20.764444 77.084444 77.084444 0 0 0 0.853334-10.808889z m-102.4-49.493334A587.377778 587.377778 0 0 1 532.195556 682.666667h-18.773334a893.155556 893.155556 0 0 1-100.977778-4.835556 173.226667 173.226667 0 0 1-69.688888-28.444444 587.377778 587.377778 0 0 1 125.724444-227.555556c13.368889 0 28.444444-1.422222 42.951111-1.422222a678.115556 678.115556 0 0 1 72.248889 0 269.653333 269.653333 0 0 1 73.671111 18.204444z" fill="#13227a"></path><path d="M273.92 473.884444a80.782222 80.782222 0 0 1 8.248889-17.351111 74.24 74.24 0 0 0-8.248889 17.351111z" fill="#13227a"></path>
  </svg>
);

// Custom MengICP Icon
const MengICPIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 1024 1024" 
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <path d="M525.277867 4.983467c42.8032 36.522667 187.050667 144.1792 410.0096 150.391466 11.264 0.4096 20.411733 9.557333 20.411733 20.957867V605.525333C955.6992 797.627733 669.934933 1024 511.965867 1024 349.4912 1024 68.232533 797.627733 68.232533 605.525333V176.3328c0-11.605333 9.147733-20.6848 20.411734-20.957867C311.671467 149.230933 455.918933 41.642667 498.653867 4.983467a20.2752 20.2752 0 0 1 26.624 0z" fill="#FFF2F2"></path>
    <path d="M525.277867 4.983467c42.8032 36.522667 187.050667 144.1792 410.0096 150.391466 11.264 0.4096 20.411733 9.557333 20.411733 20.957867V605.525333C955.6992 797.627733 669.934933 1024 511.965867 1024 349.4912 1024 68.232533 797.627733 68.232533 605.525333V176.3328c0-11.605333 9.147733-20.6848 20.411734-20.957867C311.671467 149.230933 455.918933 41.642667 498.653867 4.983467a20.2752 20.2752 0 0 1 26.624 0zM511.965867 88.064l-10.922667 8.123733c-92.023467 65.536-212.3776 115.9168-358.126933 129.160534l-0.682667 380.1088c0 134.280533 220.637867 334.165333 358.4 344.8832l11.332267 0.477866c133.7344 0 369.800533-208.6912 369.800533-345.429333V225.4848h-0.887467c-145.408-13.175467-265.079467-63.214933-357.512533-128.955733L511.965867 88.132267z" fill="#FF7E7E"></path>
    <path d="M340.2752 315.5968l96.8704-14.609067a19.387733 19.387733 0 0 0 14.404267-10.8544l43.349333-90.999466a18.8416 18.8416 0 0 1 34.338133 0l43.349334 90.999466c2.730667 5.802667 8.192 9.898667 14.404266 10.922667l96.938667 14.5408c15.701333 2.321067 21.845333 22.3232 10.581333 33.792L624.401067 420.181333a20.206933 20.206933 0 0 0-5.461334 17.544534l16.5888 100.010666c2.730667 16.1792-13.653333 28.535467-27.784533 20.8896l-86.6304-47.172266a18.158933 18.158933 0 0 0-17.749333 0l-86.8352 47.104c-14.062933 7.714133-30.378667-4.642133-27.784534-20.821334l16.5888-100.010666a20.206933 20.206933 0 0 0-5.461333-17.544534L329.8304 349.3888c-11.4688-11.4688-5.12-31.470933 10.4448-33.792z m362.496 416.426667a18.978133 18.978133 0 0 1-18.6368 19.319466H339.797333a18.978133 18.978133 0 0 1-18.705066-19.387733v-48.264533c0-10.717867 8.328533-19.387733 18.705066-19.387734h344.337067c10.376533 0 18.705067 8.669867 18.705067 19.387734v48.264533z" fill="#FF4545"></path>
  </svg>
);

const App: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [currentView, setCurrentView] = useState<'home' | 'friends' | 'notice' | 'about'>('home');
  const [isOpen, setIsOpen] = useState(false);
  const [statusTooltip, setStatusTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
  const statusTooltipTimerRef = useRef<number | null>(null);
  const statusMousePosRef = useRef({ x: 0, y: 0 });

  // Check business hours: Mon-Fri, 08:00 - 18:00
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sun, 6 = Sat
      const hour = now.getHours();
      
      const isWorkingDay = day !== 0 && day !== 6;
      const isWorkingHour = hour >= 8 && hour < 18;
      
      setIsOpen(isWorkingDay && isWorkingHour);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);
  
  // Tooltip handlers for status indicator
  const handleStatusMouseEnter = (e: React.MouseEvent, content: string) => {
    statusMousePosRef.current = { x: e.clientX, y: e.clientY };
    if (statusTooltipTimerRef.current) clearTimeout(statusTooltipTimerRef.current);
    statusTooltipTimerRef.current = window.setTimeout(() => {
      setStatusTooltip({
        visible: true,
        content: content,
        x: statusMousePosRef.current.x,
        y: statusMousePosRef.current.y
      });
    }, 1000);
  };

  const handleStatusMouseMove = (e: React.MouseEvent) => {
    statusMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleStatusMouseLeave = () => {
    if (statusTooltipTimerRef.current) clearTimeout(statusTooltipTimerRef.current);
    setStatusTooltip(prev => ({ ...prev, visible: false }));
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden bg-slate-50 text-slate-600 selection:bg-rose-200 selection:text-rose-900">
      
      {/* Watercolor Gradient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-100/40 via-slate-50 to-rose-50/40"></div>
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent"></div>

      {/* Background Animation */}
      <ParticleBackground />

      {/* Top Navigation Header */}
      <Header onNavigate={setCurrentView} currentView={currentView} />

      {/* Main Content Area */}
      <main className="flex-grow relative flex flex-col items-center justify-center w-full">
        
        {currentView === 'home' && <NotificationBox />}
        {currentView === 'friends' && <Friends />}
        {currentView === 'notice' && <Notice />}
        {currentView === 'about' && <About />}

      </main>

      {/* Footer Content */}
      <div className={`relative z-10 flex flex-col items-center gap-3 pb-8 transition-all duration-500`}>
        
        {/* Line 1: Status Indicators with Tooltip Wrapper */}
        <div 
           className="flex items-center gap-2 text-sm cursor-pointer"
           onMouseEnter={(e) => handleStatusMouseEnter(e, isOpen ? '珍惜现在，趁早摸鱼 🐟' : '已封退网，有事烧纸 🕯️')}
           onMouseLeave={handleStatusMouseLeave}
           onMouseMove={handleStatusMouseMove}
        >
           {/* Left Badge: Identity (Gray Box) */}
           <div className="flex items-center gap-2 bg-[#e5e7eb] text-slate-700 px-3 py-1.5 rounded-[6px] shadow-sm border border-slate-300/60">
             {isOpen ? (
               <Logo className="w-5 h-5 animate-heartbeat" />
             ) : (
               <DogFoodIcon className="w-5 h-5 text-slate-500" />
             )}
             {/* Text size sm to match height of uptime counter */}
             <span className="font-bold text-sm tracking-wide text-slate-800">捌玖</span>
           </div>

           {/* Right Badge: Status (White Bubble with Arrow, Text Only) */}
           <div className="relative flex items-center bg-white text-slate-800 px-3 py-1.5 rounded-[6px] shadow-sm border border-slate-300/60 -ml-2">
             {/* Arrow Tail - White fill */}
             <div className="absolute -left-[6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-white border-b-[6px] border-b-transparent z-10"></div>
             {/* Arrow Tail Border */}
             <div className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-slate-300/60 border-b-[6px] border-b-transparent"></div>
             
             {isOpen ? (
                <span className="font-bold tracking-wide">营业中</span>
             ) : (
                <span className="font-bold tracking-wide">打烊了</span>
             )}
           </div>
        </div>

        {/* Line 2: Dynamic Uptime Counter */}
        <UptimeCounter />

        {/* Line 3: Badges / Shields Row */}
        <div className="flex flex-nowrap justify-center items-center gap-1 overflow-x-auto max-w-full px-2 scrollbar-hide">
            <Badge leftText="Frame" rightText="H5" color="blue" icon={<H5Icon className="w-3 h-3 text-white" />} tooltip="本站框架为H5" />
            <Badge leftText="Hosted" rightText="Oracle" color="green" icon={<Server size={11} className="animate-server-flash text-white" />} href="https://www.oracle.com/" tooltip="本站採用多線部署，主站託管於甲骨文雲" />
            <Badge leftText="萌ICP备" rightText="2020520" color="pink" icon={<MengICPIcon className="w-3 h-3" />} tooltip="備案" />
            <Badge leftText="Source" rightText="Github" color="purple" icon={<Github size={11} fill="currentColor" className="animate-wiggle text-white" />} href="https://github.com" tooltip="本站項目由Github託管" />
        </div>

        {/* Line 4: Copyright Text */}
        <div className="flex items-center gap-2 text-sm md:text-base text-slate-400 font-light tracking-wide">
          <span>Copyright &copy; 2023 - {currentYear}</span>
          <span className="text-rose-400 animate-pulse">🦋</span>
          <span className="font-medium text-slate-500">捌玖</span>
          <span>All Rights Reserved.</span>
        </div>

      </div>

      {/* Status Tooltip Portal */}
      {statusTooltip.visible && createPortal(
        <div 
          className="fixed z-[9999] px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-md shadow-lg backdrop-blur-sm pointer-events-none whitespace-nowrap tracking-wide"
          style={{ 
            top: statusTooltip.y + 12, 
            left: statusTooltip.x + 12,
            animation: 'tooltipFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {statusTooltip.content}
        </div>,
        document.body
      )}

      {/* Decorative gradient for bottom */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-0"></div>
    </div>
  );
};

export default App;
    