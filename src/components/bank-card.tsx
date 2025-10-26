import AnimatedCounter from "./animated-counter";
import { CreditCardIcon, VisaIcon } from "./icons";

import { cn } from "@/lib/utils";
import { BankCardProps } from "@/types";

const BankCard = ({
  accountNumber,
  type,
  balance,
  className,
  bankName,
}: BankCardProps) => {
  const getCardTypeIcon = () => {
    switch (type) {
      case "visa":
        return <VisaIcon />;
      default:
        return <CreditCardIcon className="size-10" />;
    }
  };

  return (
    <section
      className={cn(
        "relative w-full h-40 p-3 rounded-md overflow-hidden text-gray-6",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark z-0" />
      <section className="relative flex flex-col gap-1 mb-3">
        <span className="text-sm font-medium capitalize">{type}</span>
        <span className="text-sm font-medium">{bankName}</span>
      </section>
      <h3 className="relative text-lg font-medium mb-3">
        {`**** **** **** ${accountNumber}`}
      </h3>
      <div className="relative flex justify-between items-center">
        <AnimatedCounter
          amount={balance}
          className="text-lg xs:text-xl sm:text-2xl font-bold"
        />
        {getCardTypeIcon()}
      </div>
    </section>
  );
};

export default BankCard;
