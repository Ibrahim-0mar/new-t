// import styles from './button.module.css';
import { cn } from '@/utils/helper/tailwind_cn';
import React from 'react';
import styles from './index.module.css';
type ButtonVariants = 'primary' | 'secondary' | 'default' | 'outline' | 'graphite'; // Add more variants as needed

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean;
  variant?: ButtonVariants;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className,
  isLoading,
  children,
  variant = 'primary',
  ...props
}) => {
  const variants = {
    default: '',
    primary: styles.primary,
    secondary: styles.secondary,
    outline: styles.outline,
    graphite: styles.graphite
    // Add more variants as needed...
  };

  return (
    <button
      className={cn(styles.button, variants[variant], className)}
      aria-disabled={isLoading}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
