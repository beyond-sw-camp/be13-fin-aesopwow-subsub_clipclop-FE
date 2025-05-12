// /presentation/components/atoms/SideMenuButton.tsx

interface SideMenuButtonProps {
    label: string;
    onClick?: () => void;
  }
  
  export function SideMenuButton({ label, onClick }: SideMenuButtonProps) {
    const classes =
      "w-full py-2 px-2 text-sm border border-gray-300 bg-gray-100 rounded-md font-bold text-black text-center hover:border-blue-400 hover:text-black mb-2";
  
    return (
      <button onClick={onClick} className={classes}>
        {label}
      </button>
    );
  }
  