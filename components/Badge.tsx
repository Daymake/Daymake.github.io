
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BadgeProps } from '../types';

const Badge: React.FC<BadgeProps> = ({ leftText, rightText, color, icon, href, tooltip }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  
  const timerRef = useRef<number | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Updated color palette: Vibrant colors to match the user's screenshot
  const getColorClass = (colorCode: string) => {
    switch(colorCode) {
      case 'blue': return 'bg-[#3b8eea]'; // Bright Blue
      case 'green': return 'bg-[#42b983]'; // Vue Green / Bright Green
      case 'sky': return 'bg-sky-500';
      case 'cyan': return 'bg-cyan-500';
      case 'pink': return 'bg-[#ff69b4]'; // Hot Pink
      case 'purple': return 'bg-[#8e44ad]'; // Vibrant Purple
      case 'red': return 'bg-[#e05d44]'; // Badge Red
      case 'rose': return 'bg-rose-500'; 
      case 'gray': return 'bg-slate-500';
      case 'zinc': return 'bg-zinc-600';
      case 'slate': return 'bg-slate-500'; 
      default: return 'bg-slate-500';
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY };
    
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setPopupPos({
        x: mousePosRef.current.x,
        y: mousePosRef.current.y
      });
      setIsVisible(true);
    }, 1000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseLeave = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsVisible(false);
  };

  const content = (
    <div className="flex items-center shadow-sm cursor-default text-xs whitespace-nowrap rounded-[3px] overflow-hidden">
      {/* Left Side - Dark Gray (Zinc-700) to match screenshot style */}
      <div className="flex items-center gap-1 bg-[#555555] text-white px-1.5 py-[3px] font-medium">
        {icon && <span className="w-3 h-3 flex items-center justify-center">{icon}</span>}
        <span className="text-shadow-sm">{leftText}</span>
      </div>
      {/* Right Side - Vibrant Color */}
      <div className={`${getColorClass(color)} text-white px-1.5 py-[3px] font-medium`}>
        {rightText}
      </div>
    </div>
  );

  const containerProps = {
    // Badges are colorful by default. No hover transformations.
    className: "inline-block relative select-none",
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseMove: handleMouseMove
  };

  const TooltipNode = tooltip && isVisible ? (
    <div 
      className="fixed z-[9999] px-2 py-1.5 bg-white border border-slate-200 text-slate-600 text-[11px] rounded-sm shadow-lg backdrop-blur-sm pointer-events-none whitespace-nowrap tracking-wide"
      style={{ 
        top: popupPos.y + 12, 
        left: popupPos.x + 12,
        animation: 'tooltipFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {tooltip}
      <style>{`
        @keyframes tooltipFadeIn {
          from { opacity: 0; transform: translateY(-2px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  ) : null;

  if (href) {
    return (
      <>
        <a href={href} target="_blank" rel="noopener noreferrer" {...containerProps}>
          {content}
        </a>
        {TooltipNode && createPortal(TooltipNode, document.body)}
      </>
    );
  }

  return (
    <>
      <div {...containerProps}>
        {content}
      </div>
      {TooltipNode && createPortal(TooltipNode, document.body)}
    </>
  );
};

export default Badge;