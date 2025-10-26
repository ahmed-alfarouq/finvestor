"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

const RefreshSession = () => {
  const router = useRouter();
  const { update } = useSession();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await update();
    router.refresh();
  };

  return (
    <div className="w-full md:w-1/2 m-auto flex flex-col items-center justify-center min-h-[200px] gap-4 p-6 rounded-lg card-shadow dark:card-shadow-dark dark:bg-default-dark bg-white">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-primary-color dark:text-gray-7">
          Something went wrong, please refresh the session.
        </h3>
        <p className="text-sm text-gray-2 dark:text-gray-7">
          Your session needs to be refreshed to continue.
        </p>
      </div>
      <Button
        onClick={handleRefresh}
        disabled={isRefreshing}
        variant="destructive"
      >
        Refresh Session
      </Button>
    </div>
  );
};

export default RefreshSession;
