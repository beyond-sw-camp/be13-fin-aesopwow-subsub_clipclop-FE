import { ReactNode } from "react";
  
interface TextProps {
    children: ReactNode;
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
    weight?: 'normal' | 'medium' | 'bold';
    className?: string;
    onClick?: () => void;
  }
  
  export const Text = ({ children, size = 'base', weight = 'normal', className = '' }: TextProps) => {
    const sizeClass = {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    }[size];
  
    const weightClass = {
      normal: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
    }[weight];
  
    return <p className={`${sizeClass} ${weightClass} ${className}`}>{children}</p>;
  };
  
