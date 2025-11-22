
import React, { useState } from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  const [hasError, setHasError] = useState(false);

  // If the image fails to load, render this fallback SVG instead
  if (hasError) {
    return (
      <svg 
        viewBox="0 0 24 24" 
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" className="text-blue-500" />
      </svg>
    );
  }

  return (
    <img 
      src="img/Logo.PNG" 
      alt="Logo" 
      className={`object-contain ${className}`}
      onError={() => {
        // Silently switch to fallback without console.error
        setHasError(true);
      }}
    />
  );
};

export default Logo;
