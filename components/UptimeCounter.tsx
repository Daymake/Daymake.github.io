
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
    // Redesigned to match the status indicator's style (rectangular, gray)
    <div className="flex items-center gap-2 bg-[#e5e7eb] text-slate-700 px-3 py-1.5 rounded-[6px] shadow-sm border border-slate-300/60 font-sans text-sm select-none tracking-wide">
      <span className="text-rose-500 font-bold mr-1">本站已苟活</span>
      
      <span className="text-slate-800 font-bold">{timeElapsed.days}</span>
      <span className="text-slate-500 text-xs">天</span>
      
      <span className="text-slate-800 font-bold">{String(timeElapsed.hours).padStart(2, '0')}</span>
      <span className="text-slate-500 text-xs">时</span>
      
      <span className="text-slate-800 font-bold">{String(timeElapsed.minutes).padStart(2, '0')}</span>
      <span className="text-slate-500 text-xs">分</span>
      
      <span className="text-slate-800 font-bold w-[20px] text-center">{String(timeElapsed.seconds).padStart(2, '0')}</span>
      <span className="text-slate-500 text-xs">秒</span>
    </div>
  );
};

export default UptimeCounter;
