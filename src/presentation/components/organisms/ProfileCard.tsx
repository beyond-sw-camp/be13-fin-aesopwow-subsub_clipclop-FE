interface ProfileCardProps {
  src: string;
  alt: string;
  name: string;
  company: string;
  imgClassName?: string;
  fallbackSrc?: string;
}

export function ProfileCard({ src, alt, name, company, imgClassName, fallbackSrc }: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={src}
        alt={alt}
        className={`${imgClassName ?? "w-28 h-28"} rounded-full object-cover border-4 border-white shadow-md`}
        onError={(e) => {
          if (fallbackSrc) {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackSrc;
          }
        }}
      />
      <div className="mt-4 text-2xl font-bold text-black">{name}</div>
      <div className="mt-1 text-base text-gray-600">{company}</div>
    </div>
  );
}
