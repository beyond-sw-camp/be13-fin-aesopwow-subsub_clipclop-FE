// @/presentation/components/atoms/ProfileAvatar.tsx
import { Link } from "react-router-dom";
import profileImage from "@/assets/profile.png"; // 사용자 아바타 이미지

export function ProfileAvatar() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Link to="/mypage">
        <img
          src={profileImage}
          alt="User Avatar"
          className="w-10 h-10 rounded-full cursor-pointer border-2 border-white shadow-md"
        />
      </Link>
    </div>
  );
}