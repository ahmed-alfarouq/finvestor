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
    firstName: z.string().min(1, "First name is required!"),
    lastName: z.string().min(1, "lasst name is required!"),
    email: z.string().email("Email is required!"),
    address: z.string().min(1, "Address is required!"),
    city: z.string().min(1, "City is required!"),
    state: z
      .string()
      .min(1, "State is required!")
      .regex(
        /^[A-Z]{2}$/,
        "State must be a capital 2-letter abbreviation 'EX: NY'."
      ),
    postalCode: z
      .string()
      .min(1, "Code is required!")
      .length(5, "Postal code must be exactly 5 digits."),
    dateOfBirth: z.date().refine((date) => !isNaN(date.getTime()), {
      message: "Date is required!",
    }),
    ssn: z.string().min(1, "SSN is required!").length(9, "SSN must be exactly 9 digits."),
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
