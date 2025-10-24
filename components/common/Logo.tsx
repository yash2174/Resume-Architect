import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-8 w-8' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.236L19.098 8 12 11.764 4.902 8 12 4.236zM4 9.309l8 4.5v6.382l-8-4.5V9.309zm16 0v6.382l-8 4.5v-6.382l8-4.5z" />
    </svg>
  );
};

export default Logo;
