// /presentation/components/atoms/TabItem.tsx
export function TabItem({ label, value, selected, onClick }: { label: string; value: string; selected: boolean; onClick: (value: string) => void; }) {
    return (
      <button
        className={`px-4 py-2 rounded-full ${selected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
        onClick={() => onClick(value)}
      >
        {label}
      </button>
    );
  }
  