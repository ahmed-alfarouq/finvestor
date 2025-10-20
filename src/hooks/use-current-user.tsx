"use client";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import { getUserById } from "@/actions/user/getUserFromDb";

const useCurrentUser = () => {
  const { data: session } = useSession();
  const user = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUserById(session!.user!.id!),
    enabled: !!session && !!session.user,
  });

  return user.data;
};

export default useCurrentUser;
