// /utils/ProjectLogo.tsx
import logo from "@/assets/logo.png"; // 로고 이미지를 여기에 위치시켜 주세요

export function ProjectLogo() {
  return (
    <div className="mb-2">
      <img src={logo} alt="Project Logo" className="w-24 h-24 object-contain" />
    </div>
  );
}
