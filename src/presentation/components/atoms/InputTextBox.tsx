import { Input } from "@material-tailwind/react";

interface InputTextBoxProps {
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export function InputTextBox({ type, label, placeholder, onChange}: InputTextBoxProps) {
  return (
    <div className="w-60">
      <Input
        type={type}
        label={label}
        placeholder={placeholder}
        onChange={onChange}
        onPointerEnterCapture={() => { }}
        onPointerLeaveCapture={() => { }}
        crossOrigin={undefined}
      />
    </div>
  );
}