interface ProfileImageProps {
  src: string;
  alt: string;
}

export function ProfileImage({ src, alt }: ProfileImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mx-auto"
    />
  );
}
