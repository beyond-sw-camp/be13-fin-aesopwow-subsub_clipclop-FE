import React, { useRef, useState } from "react";
import { Input } from "@material-tailwind/react";
import { Text } from "../atoms/TextLabel";

type InputOneTimePasswordProps = {
    email: string;
    timer: number;
    formatTime: (seconds: number) => string;
    onResendClick: () => void;
};

export function InputOneTimePassword({ email, timer, formatTime, onResendClick }: InputOneTimePasswordProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !event.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-full max-w-sm">
        <Text size="sm" className="text-center text-black font-bold">
            OTP 인증
        </Text>
        <Text size="sm" className="text-black ">
            <strong>{email}</strong>으로 OTP 인증을 위한 6자리 번호를 보냈습니다.
            <br />
            <span className="text-black">{formatTime(timer)}</span> 분 이내로 입력해주세요.
        </Text>

      <div className="my-4 flex items-center justify-center gap-2">
        {otp.map((digit, index) => (
          <React.Fragment key={index}>
            <Input
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(e, index)}
              inputRef={(el) => {
                inputRefs.current[index] = el;
              }}
              className="!w-10 appearance-none !border-t-blue-gray-200 text-center !text-lg placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              containerProps={{
                className: "!min-w-0 !w-10 !shrink-0",
              }}
            />
            {index === 2 && <span className="text-2xl text-slate-700">-</span>}
          </React.Fragment>
        ))}
      </div>

      <Text className="text-center font-normal text-blue-gray-500">
        메일을 받지 못하셨나요? 
        <Text onClick={onResendClick}>다시보내기</Text> {/* 백엔드 api 추가해야하는거 아님? */}
      </Text>
    </div>
  );
}
