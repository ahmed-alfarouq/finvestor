"use client";
import React, { useEffect, useState } from "react";
import { UseSessionContext } from "@/context/SessionContext";

import CardWrapper from "@/components/auth/CardWrapper";
import PlaidLink from "@/components/ui/plaid-link";
import Loading from "@/app/loading";

import { getUserById } from "@/lib/getUserFromDb";

import { User } from "@/types";

const LinkAccount = () => {
  const [user, setUser] = useState<User>();
  const { session } = UseSessionContext();

  useEffect(() => {
    const fetchUser = async (id?: string) => {
      if (!id) return;
      const data = await getUserById(id);
      if (data === null) return;
      setUser({
        id: data.id,
        email: data.email,
        dwollaCustomerUrl: data.dwollaCustomerUrl,
        dwollaCustomerId: data.dwollaCustomerId,
        firstName: data.firstName,
        lastName: data.lastName,
        address1: data.address,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        dateOfBirth: data.dateOfBirth,
        ssn: data.ssn,
        role: data.role,
        bankAccounts: data.bankAccounts,
      });
    };

    fetchUser(session?.user.id);
  }, [session]);

  if (!session || !user) return <Loading />;
  return (
    <CardWrapper logo="/img/logo.webp" backLinkText="" backLinkHref="">
      <div className="flex justify-center items-center">
        <PlaidLink user={user} />
      </div>
    </CardWrapper>
  );
};

export default LinkAccount;
