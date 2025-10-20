import { getAccounts } from "@/actions/bank";
import { unstable_cache } from "next/cache";

export const getCachedAccounts = (userId: string) =>
  unstable_cache(
    async () => await getAccounts(userId),
    [`accounts-${userId}`],
    { tags: [`accounts-${userId}`], revalidate: 60 * 60 }
  )();
