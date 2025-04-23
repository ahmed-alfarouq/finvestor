"use client";
import { Session } from "next-auth";
import { createContext, useContext } from "react";

interface UpdateSessionContextType {
  update: () => Promise<Session | null>;
}

const UpdateSessionContext = createContext<UpdateSessionContextType>({
  update: async () => null,
});

export const UseUpdateSessionContext = () => useContext(UpdateSessionContext);

export default UpdateSessionContext;
