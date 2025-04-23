"use client";
import { ReactNode } from "react";

import UpdateSessionContext from "@/context/UpdateSessionContext";
import { Session } from "next-auth";
const UpdateSessionProviderWrapper = ({
  children,
  update,
}: {
  children: ReactNode;
  update: () => Promise<Session | null>;
}) => {
  return (
    <UpdateSessionContext.Provider value={{ update }}>
      {children}
    </UpdateSessionContext.Provider>
  );
};

export default UpdateSessionProviderWrapper;
