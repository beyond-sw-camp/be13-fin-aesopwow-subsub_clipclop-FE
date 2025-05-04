// CustomButton.tsx
import { Button } from "@material-tailwind/react";

interface CustomButtonProps {
  title: string;
  loading: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}


export function CustomButton({ title, loading, onClick, type = "button" }: CustomButtonProps) {
  return (
    <Button
      loading={loading}
      onClick={onClick}
      type={type}
      onPointerEnterCapture={() => { }}
      onPointerLeaveCapture={() => { }}
      placeholder=""
    >
      {title}
    </Button>
  );
}
