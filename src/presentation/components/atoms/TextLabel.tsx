// interface TextProps {
//     children: string;
//     className?: string;
//   }

import { ReactNode } from "react";

  
//   export const Text = ({ children, className = "" }: TextProps) => {
//     return (
//       <p className={`text-sm text-gray-600 ${className}`}>
//         {children}
//       </p>
//     );
//   };
  
interface TextProps {
    children: ReactNode;
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
    weight?: 'normal' | 'medium' | 'bold';
    className?: string;
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
  
