import React from "react";

import DarkModeToggle from "@/components/dark-mode-toggle";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="flex justify-end py-3 px-8">
        <DarkModeToggle />
      </header>
      <main className="container mx-auto py-14 px-4 flex flex-col items-center justify-center">
        {children}
      </main>
    </>
  );
};

export default AuthLayout;
