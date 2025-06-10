import React, { useState, useEffect } from "react";

interface EmailInputModalProps {
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export const EmailInputModal = React.memo(function EmailInputModal({
  onClose,
  onSubmit,
}: EmailInputModalProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("유효한 이메일을 입력하세요.");
      return;
    }
    onSubmit(email);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-modal-title"
      tabIndex={-1}
    >
      <div className="bg-white rounded-lg p-6 shadow-xl w-[400px]">
        <h2 id="email-modal-title" className="text-lg font-bold mb-4">직원 이메일 입력</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@domain.com"
          className="w-full border rounded px-3 py-2 mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">취소</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">추가</button>
        </div>
      </div>
    </div>
  );
});
