// /presentation/components/atoms/TabItem.tsx
export function TabItem({
  label,
  value,
  selected,
  onClick,
}: {
  label: string;
  value: string;
  selected: boolean;
  onClick: (value: string) => void;
}) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-bold 
        ${selected
          ? 'bg-white text-black border border-black'
          : 'bg-transparent text-black hover:bg-gray-100'}
      `}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}
