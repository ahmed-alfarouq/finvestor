import { cn } from "@/lib/utils";

import { ModalTriggerProps } from "@/types";

const ModalTrigger = ({
  name,
  icon,
  text,
  ariaLable,
  className,
}: ModalTriggerProps) => {
  const Icon = icon;
  return (
    <>
      <label htmlFor={name} aria-label={ariaLable} className={cn(className)}>
        {Icon && <Icon className="size-5" aria-hidden="true" />}
        {text}
      </label>
      <input
        id={name}
        name={name}
        type="checkbox"
        aria-hidden="true"
        className="modal-trigger"
      />
    </>
  );
};

export default ModalTrigger;
