import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BadgeProps } from '../types';

const Badge: React.FC<BadgeProps> = ({ leftText, rightText, color, icon, href, tooltip }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  
  const timerRef = useRef<number | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Dynamic class logic for the right side background color
  const getColorClass = (colorCode: string) => {
    switch(colorCode) {
      case 'blue': return 'bg-[#007EC6]';
      case 'green': return 'bg-[#4CAE4F]';
      case 'sky': return 'bg-[#2D8AD5]';
      case 'cyan': return 'bg-[#40A9FF]';
      case 'pink': return 'bg-[#E91E63]';
      case 'purple': return 'bg-[#9C27B0]';
      case 'red': return 'bg-[#F44336]';
      default: return 'bg-gray-600';
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
    <div className="flex items-center shadow-sm cursor-default text-xs whitespace-nowrap">
      {/* Left Side */}
      <div className="flex items-center gap-1 bg-[#555555] text-white px-2 py-1 rounded-l-[4px] font-medium">
        {icon && <span className="w-3 h-3 flex items-center justify-center">{icon}</span>}
        <span className="text-shadow-sm">{leftText}</span>
      </div>
      {/* Right Side */}
      <div className={`${getColorClass(color)} text-white px-2 py-1 rounded-r-[4px] font-medium`}>
        {rightText}
      </div>
    </div>
  );

  const containerProps = {
    className: "inline-block relative select-none",
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseMove: handleMouseMove
  };

  // Render Tooltip in a Portal to avoid transform stacking context issues
  const TooltipNode = tooltip && isVisible ? (
    <div 
      className="fixed z-[9999] px-2 py-1.5 bg-[#1a1a1a]/95 border border-[#333] text-gray-200 text-[11px] rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-sm pointer-events-none whitespace-nowrap tracking-wide"
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