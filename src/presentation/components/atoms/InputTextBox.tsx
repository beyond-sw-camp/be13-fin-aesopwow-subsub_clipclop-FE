import { Input } from "@material-tailwind/react";

interface InputTextBoxProps {
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
}


export function InputTextBox({ type, label, placeholder, value, onChange, width }: InputTextBoxProps) {
  return (
    <div className={width}>
      <Input
        type={type}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onPointerEnterCapture={() => { }}
        onPointerLeaveCapture={() => { }}
        crossOrigin={undefined}
      />
    </div>
  );
}