import Link from "next/link";

import { formatDateTime } from "@/lib/utils";

import TargetModal from "../target-modal";

import { Button } from "@/components/ui/button";

import { EmptyGoalsBoxProps } from "@/types";

const EmptyGoalsBox = ({
  title,
  message,
  date,
  selectedAccounts = true,
  showButton = true,
}: EmptyGoalsBoxProps) => {
  return (
    <section className="box">
      <header>
        <h2 className="card-title">{title}</h2>
      </header>
      <section className="card">
        <div className="flex items-center justify-between w-full border-b border-gray-6 pb-4">
          <div className="flex items-center gap-2">
            {selectedAccounts && <TargetModal />}
          </div>
          <span className="text-sm text-secondary-color dark:text-secondary-color-dark">
            {formatDateTime(date).dateOnly}
          </span>
        </div>

        <div className="flex flex-col justify-center items-center gap-3 w-full h-full">
          <p className="text-lg text-gray-2 dark:text-gray-7 font-semibold text-center">
            {message ? message : "You didn't add a goal yet."}
          </p>
          {selectedAccounts ? (
            <TargetModal />
          ) : showButton ? (
            <Button size="lg" asChild>
              <Link href="/goals">Select Accounts</Link>
            </Button>
          ) : null}
        </div>
      </section>
    </section>
  );
};

export default EmptyGoalsBox;
