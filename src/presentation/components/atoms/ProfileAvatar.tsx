// @/presentation/components/atoms/ProfileAvatar.tsx
import { useState, useRef, useEffect } from "react";
import { /*Link,*/ useNavigate } from "react-router-dom";
import profileImage from "@/assets/profile.png";
// import axiosInstance from "@/infrastructure/api/Axios";
import { LogoutButton } from "../molecules/LogoutButton";
import { CustomButton } from "../atoms/CustomButton";

export function ProfileAvatar({ hasUnread }: { hasUnread?: boolean }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50" ref={dropdownRef}>
      <div className="relative w-10 h-10">
        {/* 프로필 이미지 */}
        <img
          src={profileImage}
          alt="User Avatar"
          className="w-10 h-10 rounded-full cursor-pointer border-2 border-white shadow-md"
          onClick={() => setOpen((prev) => !prev)}
        />

        {/* 🔴 안 읽은 알림 표시 */}
        {hasUnread && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
        )}
      </div>

      {/* 드롭다운 팝업 */}
      {open && (
        <div className="mt-2 bg-white rounded-lg shadow-lg text-sm text-gray-700 absolute right-0 w-fit px-1">
          <CustomButton
            title="MyPage"
            onClick={() => navigate("/mypage")}
            loading={false}
            color="orange"
            className="w-full"
          />
          <LogoutButton />
        </div>
      )}
    </div>
  );
}
