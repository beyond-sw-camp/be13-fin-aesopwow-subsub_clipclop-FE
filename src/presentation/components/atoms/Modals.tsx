import { ReactNode } from "react";
import { Dialog } from "@material-tailwind/react";

interface ModalsProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

export function Modals({ open, setOpen }: ModalsProps) {
  const handleOpen = () => {
    console.log("모달 닫기 동작 확인");
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className="bg-white rounded-lg shadow-lg p-6" children={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
    </Dialog>
  );
}


