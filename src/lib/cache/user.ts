import { unstable_cache } from "next/cache";
import { getUserById } from "@/actions/user/getUserFromDb";

import { User } from "@/types";

export const getCachedUser = (userId: string) =>
  unstable_cache(
    async (): Promise<User> => await getUserById(userId),
    [`user-${userId}`],
    {
      tags: [`user-${userId}`],
      revalidate: 60 * 60,
    }
  )();
