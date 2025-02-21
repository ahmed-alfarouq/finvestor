import React from "react";

import DarkModeToggle from "@/components/dark-mode-toggle";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="flex p-3">
        <DarkModeToggle />
      </header>
      <main className="container mt-16 mx-auto flex flex-col items-center justify-center">
        {children}
      </main>
    </>
  );
};

export default AuthLayout;
