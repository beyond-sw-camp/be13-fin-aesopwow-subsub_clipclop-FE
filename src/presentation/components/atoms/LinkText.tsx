import { Link } from "react-router-dom";

interface LinkTextProps {
    to: string;
    children: string;
    className?: string;
}

export const LinkText = ({ to, children, className = "" }: LinkTextProps) => {
    return (
        <Link to={to} className={`text-sm font-semibold text-blue-700 ${className}`}>
            {children}
        </Link>
    );
};
