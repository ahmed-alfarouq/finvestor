"use server";
import { sendResetEmail } from "@/actions/mail";
import { generateResetToken } from "@/actions/auth/tokens";
import { getUserByEmail } from "@/actions/user/getUserFromDb";

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
