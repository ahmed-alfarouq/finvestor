import React from "react";

import DarkModeToggle from "@/components/dark-mode-toggle";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="fixed top-0 right-0 left-0 flex justify-end py-8 px-8">
        <DarkModeToggle />
      </header>
      <main className="container min-h-svh mx-auto py-8 px-4 flex flex-col items-center justify-center">
        {children}
      </main>
    </>
  );
};

export default AuthLayout;
