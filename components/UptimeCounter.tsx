import React, { useState, useEffect } from 'react';
import { TimeElapsed } from '../types';

const UptimeCounter: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Hardcoded start date to match the screenshot approximation (~895 days ago)
    // You can change this date to your actual start date
    const startDate = new Date('2022-05-25T00:00:00');

    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeElapsed({ days, hours, minutes, seconds });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group">
       {/* Glow Effect */}
       <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full opacity-20 group-hover:opacity-40 blur transition duration-1000"></div>
       
       {/* Content Container */}
       <div className="relative px-5 py-1.5 bg-[#050505]/90 border border-blue-500/30 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.2)] backdrop-blur-md flex items-center justify-center gap-1 font-sans text-[15px] select-none tracking-wide">
          <span className="text-[#3b82f6] font-normal mr-1">本站已苟活</span>
          
          <span className="text-gray-100 font-normal">{timeElapsed.days}</span>
          <span className="text-[#a3e635] text-[13px] mx-0.5">天</span>
          
          <span className="text-gray-100 font-normal">{String(timeElapsed.hours).padStart(2, '0')}</span>
          <span className="text-[#f472b6] text-[13px] mx-0.5">小时</span>
          
          <span className="text-gray-100 font-normal">{String(timeElapsed.minutes).padStart(2, '0')}</span>
          <span className="text-[#fbbf24] text-[13px] mx-0.5">分</span>
          
          <span className="text-gray-100 font-normal w-[20px] text-center">{String(timeElapsed.seconds).padStart(2, '0')}</span>
          <span className="text-[#a3e635] text-[13px] mx-0.5">秒</span>
       </div>
    </div>
  );
};

export default UptimeCounter;