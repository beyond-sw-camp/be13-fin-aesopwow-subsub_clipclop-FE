interface ProfileCardProps {
  src: string;
  alt: string;
  name: string;
  company: string;
}
export function ProfileCard({ src, alt, name, company }: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm text-gray-500 mb-2">직명</span>
      <img
        src={src}
        alt={alt}
        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
      />
      <div className="mt-4 text-2xl font-bold text-black">{name}</div>
      <div className="mt-1 text-base text-gray-600">{company}</div>
    </div>
  );
}
