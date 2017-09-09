import React from 'react';
import { ButtonProps } from '@/types';
import { isExternalUrl } from '@/utils';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  external = false,
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-200 text-secondary-900 hover:bg-secondary-300 focus:ring-secondary-500 dark:bg-secondary-700 dark:text-secondary-100 dark:hover:bg-secondary-600',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;
  
  if (href) {
    const isExternal = external || isExternalUrl(href);
    
    if (isExternal) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {children}
        </a>
      );
    }
    
    return (
      <a
        href={href}
        className={combinedClasses}
        onClick={(e) => {
          if (onClick) {
            onClick();
          }
          if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.getElementById(href.slice(1));
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
      >
        {children}
      </a>
    );
  }
  
  return (
    <button
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;