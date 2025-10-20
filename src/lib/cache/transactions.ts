import { unstable_cache } from "next/cache";
import { getRecentTransactions } from "@/actions/transactions";

export const getCachedLatestTransactions = (
  userId: string,
  accessToken: string,
  count: number
) =>
  unstable_cache(
    async () => await getRecentTransactions(accessToken, count),
    [`recent-transactions-${userId}`],
    {
      tags: [`recent-transactions-${userId}`],
      revalidate: 60 * 60,
    }
  )();
