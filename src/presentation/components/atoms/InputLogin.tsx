import { Input } from "@material-tailwind/react";

export function InputLogin(
    { label, placeholder }: {
        label: string;
        placeholder: string;
  }) {
  return (
    <div className="w-60">
      <Input label={ label } placeholder={ placeholder }/>
    </div>
  );
}