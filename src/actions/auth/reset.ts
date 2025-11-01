"use server";
import { sendResetEmail } from "@/actions/mail";
import { createResetToken } from "@/actions/auth/tokens";
import { getOnlyUserByEmail } from "@/actions/user/getUserFromDb";

export const reset = async (email: string) => {
  const token = await createResetToken(email);
  const user = await getOnlyUserByEmail(email);

  if (!token || !user) return { error: "Something went wrong!" };
  try {
    sendResetEmail({
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
