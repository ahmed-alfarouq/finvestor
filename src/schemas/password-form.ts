import { z } from "zod";

const passwordFormSchema = z
  .object({
    oldPassword: z.string().min(1, "Old Password is required!"),
    newPassword: z
      .string()
      .min(1, "New Password is required!")
      .min(6, "Minimum 6 characters required!"),
    confirmPassword: z.string().min(1, "Confirm Password is required!"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });

export type PasswordFormSchema = z.infer<typeof passwordFormSchema>;

export default passwordFormSchema;
