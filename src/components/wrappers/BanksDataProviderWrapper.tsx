"use client";
import React, { ReactNode } from "react";
import BanksDataContext, {
  BanksDataContextProps,
} from "@/context/BanksDataContext";

const BanksDataProviderWrapper = ({
  children,
  data,
}: {
  children: ReactNode;
  data: BanksDataContextProps;
}) => {
  return (
    <BanksDataContext.Provider value={data}>
      {children}
    </BanksDataContext.Provider>
  );
};

export default BanksDataProviderWrapper;
