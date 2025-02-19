import { prisma } from "@/prisma";

const getUserFromDb = async ({
  email,
  pwHash,
}: {
  email: string;
  pwHash: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.password != pwHash) return null;

  return user;
};

export default getUserFromDb;
