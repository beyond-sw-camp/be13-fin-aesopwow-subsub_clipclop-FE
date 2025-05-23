interface InfoItem {
  subtitle: string;
  content: string;
  onClick?: () => void;
}

interface InfoSectionProps {
  title: string;
  items: InfoItem[];
}

export function InfoSection({ title, items }: InfoSectionProps) {
  return (
    <section className="mb-6 p-6 border rounded-md shadow-sm bg-white">
      {/* 섹션 제목 */}
      <h2 className="text-base font-bold text-gray-800 border-b-2 border-purple-400 pb-1 mb-4">
        {title}
      </h2>

      <div className="flex flex-col gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={item.onClick}
            className={`flex flex-col items-center w-full cursor-pointer transition ${
              item.onClick ? "hover:bg-gray-100 p-3 rounded-md" : ""
            }`}
          >
            <div className="text-sm font-semibold text-gray-700 text-left w-full">
              {item.subtitle}
            </div>
            <div className="text-sm text-gray-500 text-left w-full">
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
