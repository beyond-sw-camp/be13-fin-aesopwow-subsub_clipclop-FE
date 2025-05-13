import React from "react";
import { Dialog } from "@material-tailwind/react";

interface ModalsProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export function Modals({ open, setOpen, children }: ModalsProps) {
  const handleOpen = () => {
    console.log("모달 닫기 동작 확인");
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      {children}
    </Dialog>
  );
}


