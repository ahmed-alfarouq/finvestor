import { z } from "zod";

export const ResetSchema = z.object({
  email: z.string().email("Email is required!"),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required!")
      .min(6, "Minimum 6 characters required!"),
    confirmPassword: z.string().min(1, "Confirm password is required!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email("Email is required!"),
  password: z.string().min(1, "Password is required!"),
  code: z.optional(z.string()),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, "Name is required!"),
    email: z.string().email("Email is required!"),
    password: z
      .string()
      .min(1, "Password is required!")
      .min(6, "Minimum 6 characters required!"),
    confirmPassword: z.string().min(1, "Confirm password is required!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });
