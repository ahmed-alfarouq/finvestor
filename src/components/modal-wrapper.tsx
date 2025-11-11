import { X } from "lucide-react";
import { cn } from "@/lib/utils";

import { ModalWrapperProps } from "@/types";

const ModalWrapper = ({ children, name, className }: ModalWrapperProps) => {
  return (
    <section
      role="dialog"
      className={cn(
        "modal fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300",
        className
      )}
    >
      <label
        htmlFor={name}
        className=" fixed inset-0 z-10 bg-default-black/60 "
      />

      <div className="z-20 relative w-full sm:max-w-lg rounded-lg bg-default dark:bg-default-dark px-8 py-12 sm:p-16 sm:pb-12 mx-5 sm:mx-0">
        <label
          htmlFor={name}
          className="absolute top-4 right-5 text-secondary-color dark:text-secondary-color-dark cursor-pointer"
        >
          <X />
        </label>
        {children}
      </div>
    </section>
  );
};

export default ModalWrapper;
