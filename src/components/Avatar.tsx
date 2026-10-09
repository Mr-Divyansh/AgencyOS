import React, { useState } from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', className = '' }) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  }[size];

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (src && !hasError) {
    return (
      <img
        src={src}
        alt={name}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`${sizeClasses} rounded-full object-cover shrink-0 border border-[#E9E6DF] shadow-xs ${className}`}
      />
    );
  }

  // Fallback styled avatar
  return (
    <div
      className={`${sizeClasses} rounded-full bg-[#FFF0C2] text-[#17212B] font-semibold flex items-center justify-center shrink-0 border border-[#DAD5CA] select-none ${className}`}
      title={name}
    >
      {initials || '?'}
    </div>
  );
};
