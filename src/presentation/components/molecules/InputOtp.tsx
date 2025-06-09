import React, { useRef, useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import { Text } from "../atoms/TextLabel";

type InputOneTimePasswordProps = {
  email: string;
  timer: number;
  formatTime: (seconds: number) => string;
  onResendClick: () => void;
  setOtp: React.Dispatch<React.SetStateAction<string[]>>; // 부모 전달용
};

export function InputOneTimePassword({
  email,
  timer,
  formatTime,
  onResendClick,
  setOtp,
}: InputOneTimePasswordProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, localOtp] = useState<string[]>(Array(6).fill(""));

  useEffect(() => {
    setOtp(otp); // 초기값도 부모에 전달
  }, []);

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    localOtp(newOtp);
    setOtp(newOtp); // 변경 시 부모에도 전달

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
      <Text size="sm" className="text-black">
        <strong>{email}</strong>으로 OTP 인증번호가 전송되었습니다.
        <br />
        <span className="text-black">{formatTime(timer)}</span> 내로 입력해주세요.
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
              } }
              className="!w-10 text-center !text-lg"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              containerProps={{
                className: "!min-w-0 !w-10 !shrink-0",
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}            />
            {index === 2 && <span className="text-2xl text-slate-700">-</span>}
          </React.Fragment>
        ))}
      </div>

      <Text
        onClick={onResendClick}
        className="text-center font-normal text-blue-500 underline cursor-pointer hover:text-blue-700"
      >
        메일을 받지 못하셨나요?
      </Text>
    </div>
  );
}
