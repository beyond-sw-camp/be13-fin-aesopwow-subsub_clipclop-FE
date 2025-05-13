interface LinkTextProps {
    href: string;
    children: string;
    className?: string;
  }
  
  export const LinkText = ({ href, children, className = "" }: LinkTextProps) => {
    return (
      <a href={href} className={`text-sm font-semibold text-blue-700 ${className}`}>
        {children}
      </a>
    );
  };
  