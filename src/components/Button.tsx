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
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-secondary-900';

  const variantClasses = {
    primary:
      'bg-secondary-900 text-white hover:bg-secondary-800 focus:ring-silver-400 dark:bg-silver-100 dark:text-secondary-900 dark:hover:bg-white',
    secondary:
      'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 focus:ring-silver-400 dark:bg-secondary-800 dark:text-secondary-100 dark:hover:bg-secondary-700',
    outline:
      'border border-secondary-900 text-secondary-900 hover:bg-secondary-900 hover:text-white focus:ring-silver-400 dark:border-silver-300 dark:text-silver-100 dark:hover:bg-silver-100 dark:hover:text-secondary-900',
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
          onClick?.();
          if (href.startsWith('#')) {
            e.preventDefault();
            document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
