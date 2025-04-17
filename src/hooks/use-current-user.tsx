"use client";
import { UseSessionContext } from "@/context/SessionContext";

const useCurrentUser = () => {
  const { session } = UseSessionContext();
  
  return session?.user;
};

export default useCurrentUser;
