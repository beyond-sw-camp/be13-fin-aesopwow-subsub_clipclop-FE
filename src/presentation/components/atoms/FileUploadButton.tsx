import { useRef, useState } from "react";

export function FileUploadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string | null>(null);
  const [isImage, setIsImage] = useState<boolean>(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const isImageFile = file.type.startsWith("image/");
      setIsImage(isImageFile);

      if (isImageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setBase64(reader.result as string);
        };
        reader.onerror = () => {
          console.error("파일 읽기 오류");
        };
      } else {
        setBase64(null); // 이미지가 아니면 미리보기 제거
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleButtonClick}
        className="p-2 bg-gray-300 rounded hover:bg-gray-400 transition"
      >
        로컬 파일 선택하기
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="*/*"
        style={{ display: "none" }}
      />
      {selectedFile && (
        <div className="mt-4 text-center">
          <p>선택된 파일 이름: {selectedFile.name}</p>
          <p>파일 크기: {selectedFile.size} bytes</p>
        </div>
      )}
      {isImage && base64 && (
        <div className="mt-4">
          <p className="mb-2 text-sm text-gray-600">미리보기:</p>
          <img
            src={base64}
            alt="선택한 이미지 미리보기"
            className="max-w-xs max-h-64 border rounded shadow"
          />
        </div>
      )}
    </div>
  );
}