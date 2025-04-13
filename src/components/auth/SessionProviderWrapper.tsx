"use client";
import { ReactNode } from "react";
import { Session } from "next-auth";

import SessionContext from "@/context/SessionContext";

export default function SessionProviderWrapper({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}
