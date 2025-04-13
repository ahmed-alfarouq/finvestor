"use client";
import { createContext, useContext } from "react";
import { Session } from "next-auth";

interface SessionContextType {
  session: Session | null;
}

const SessionContext = createContext<SessionContextType>({
  session: null,
});

export const UseSessionContext = () => useContext(SessionContext);

export default SessionContext;
