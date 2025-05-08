'use client';

export default function Card({ 
  children, 
  className = '',
  onClick,
  hover = false
}) {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white rounded-lg shadow-md p-4
        ${hover ? 'transition-transform hover:scale-[1.02] cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
} 