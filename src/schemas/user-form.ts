import { z } from "zod";

const userFormSchema = z.object({
  address1: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!"),
  state: z.string().min(1, "State is required!"),
  postalCode: z.string().min(1, "Posta Code is required!"),
  email: z.string().min(1, "Email is required!"),
});

export type UserFormSchema = z.infer<typeof userFormSchema>;

export default userFormSchema;
