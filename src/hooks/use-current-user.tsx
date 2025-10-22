"use client";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import { getUserById } from "@/actions/user/getUserFromDb";

const useCurrentUser = () => {
  const { data: session } = useSession();
  const user = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUserById(session!.user!.id!, "use current"),
    enabled: !!session && !!session.user,
    refetchOnMount: "always",
  });

  return user.data;
};

export default useCurrentUser;
