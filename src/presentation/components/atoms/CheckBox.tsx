import { Checkbox } from "@material-tailwind/react";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckBox = ({ label='', checked, onChange }: CheckboxProps ) => {
  return (
    <Checkbox
      label={label}
      checked={checked}
      onChange={onChange} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}    />
  );
};

