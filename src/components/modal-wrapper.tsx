import { X } from "lucide-react";
import { cn } from "@/lib/utils";

import { ModalWrapperProps } from "@/types";

const ModalWrapper = ({
  children,
  close,
  isOpen,
  className,
}: ModalWrapperProps) => {
  return (
    <section
      role="dialog"
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-default-black/60 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
    >
      <div className="relative w-full sm:max-w-lg rounded-lg bg-default dark:bg-default-dark px-8 py-12 sm:p-16 sm:pb-12 mx-5 sm:mx-0">
        <button
          className="absolute top-4 right-5 text-secondary-color dark:text-secondary-color-dark"
          onClick={close}
        >
          <X />
        </button>
        {children}
      </div>
    </section>
  );
};

export default ModalWrapper;
