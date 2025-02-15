import React from "react";
import { auth } from "@/auth";
import { redirect } from "@/i18n/routing";

const AuthProvider = async ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) => {
  const session = await auth();

  if (!session?.user) {
    redirect({ href: "/login", locale });
  }
  return <>{children}</>;
};

export default AuthProvider;
