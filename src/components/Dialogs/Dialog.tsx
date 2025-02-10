import type { ReactNode } from "react";
import cn from "classnames";
import { CloseIcon } from "@/components/icons/CloseIcon";
export interface IDialogBaseProps {
  open: boolean;
  onClose: () => void;
}

export interface IDialogProps extends IDialogBaseProps {
  children?: ReactNode;
  closeButton?: boolean;
}

export const Dialog = ({ open, onClose, children, closeButton = true }: IDialogProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-100 flex items-center justify-center px-5 transition-colors duration-200",
        open ? "visible bg-black/40" : "invisible",
      )}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative min-h-20  rounded-[10px] bg-white px-[10px] shadow-lg  w-1/3 transition-all duration-200",
          open ? "opacity-100" : "opacity-0",
        )}
      >
        {closeButton && (
          <button className="absolute right-5 top-4 text-darkBlue hover:text-[#242F6B] active:text-[#242F6B]" onClick={onClose}>
            <CloseIcon />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};
