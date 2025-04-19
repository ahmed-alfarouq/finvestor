"use server";
import { getUserByEmail } from "@/lib/getUserFromDb";
import { sendResetEmail } from "@/lib/mail";
import { generateResetToken } from "@/lib/tokens";

export const reset = async (email: string) => {
  const token = await generateResetToken(email);
  const user = await getUserByEmail(email);

  if (!token || !user) return { error: "Something went wrong!" };
  try {
    await sendResetEmail({
      username: `${user.firstName} ${user.lastName}` || "",
      email,
      token,
    });
    return {
      success:
        "A password reset email has been sent successfully! Please check your inbox and follow the instructions to reset your password.",
    };
  } catch {
    return { error: "Something went wrong!" };
  }
};
