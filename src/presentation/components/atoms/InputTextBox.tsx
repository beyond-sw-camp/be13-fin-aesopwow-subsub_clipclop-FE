// import { Input } from "@material-tailwind/react";

// interface InputTextBoxProps {
//   type: string;
//   label: string;
//   placeholder: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   width?: string;
// }


// export function InputTextBox({ type, label, placeholder, value, onChange, width }: InputTextBoxProps) {
//   return (
//     <div className={width}>
//       <Input
//         type={type}
//         label={label}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//       />
//     </div>
//   );
// }
// import { Input } from "@material-tailwind/react";

// interface InputTextBoxProps {
//   type: string;
//   label: string;
//   placeholder: string;
//   value: string;
//   onChange: (value: string) => void;
//   width?: string;
// }

// export function InputTextBox({
//   type,
//   label,
//   placeholder,
//   value,
//   onChange,
//   width,
// }: InputTextBoxProps) {
//   return (
//     <div className={width}>
//       <Input
//         type={type}
//         label={label}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         {...({
//           // 강제 무시
//           onPointerEnterCapture: undefined,
//           onPointerLeaveCapture: undefined,
//           crossOrigin: undefined,
//         } as any)}
//       />
//     </div>
//   );
// }

interface InputTextBoxProps {
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string; // tailwind width like "w-full" or "w-1/2"
}

export function InputTextBox({
  type,
  label,
  placeholder,
  value,
  onChange,
  width = "w-full",
}: InputTextBoxProps) {
  return (
    <div className={`flex flex-col gap-1 ${width}`}>
      <label className="text-sm font-medium border-gray-300 text-gray-700"></label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}
