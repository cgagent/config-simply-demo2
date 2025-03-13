
import React from 'react';

export const FlyFrogIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-12 h-12"
  >
    {/* Frog body */}
    <circle cx="12" cy="12" r="8" fill="#9b87f5" stroke="none" />
    
    {/* Frog features */}
    <circle cx="9" cy="9" r="1.5" fill="white" stroke="none" /> {/* Left eye */}
    <circle cx="15" cy="9" r="1.5" fill="white" stroke="none" /> {/* Right eye */}
    <circle cx="9" cy="9" r="0.7" fill="black" stroke="none" /> {/* Left pupil */}
    <circle cx="15" cy="9" r="0.7" fill="black" stroke="none" /> {/* Right pupil */}
    
    {/* Mouth */}
    <path d="M9 13a3 2 0 0 0 6 0" stroke="#6E59A5" strokeWidth="1" />
    
    {/* Wings */}
    <path d="M4 8c0 0 2,-4 6,-3" stroke="#F97316" fill="#FEC6A1" strokeWidth="1" />
    <path d="M20 8c0 0 -2,-4 -6,-3" stroke="#F97316" fill="#FEC6A1" strokeWidth="1" />
    
    {/* Tiny front legs */}
    <line x1="10" y1="16" x2="9" y2="18" stroke="#6E59A5" strokeWidth="1.5" />
    <line x1="14" y1="16" x2="15" y2="18" stroke="#6E59A5" strokeWidth="1.5" />
  </svg>
);
