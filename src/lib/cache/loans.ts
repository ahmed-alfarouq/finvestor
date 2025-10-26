import { getLoans } from "@/actions/loans";
import { unstable_cache } from "next/cache";

export const getCachedLoans = (userId: string, accessToken: string) =>
  unstable_cache(async () => await getLoans(accessToken), [`loans-${userId}`], {
    tags: [`loans-${userId}`],
    revalidate: 60 * 60,
  })();
