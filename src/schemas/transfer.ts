import { z } from "zod";

const transferFormSchema = z.object({
  sourceBank: z.string().min(1, "Source bank is required!"),
  note: z.string().optional(),
  recipientEmail: z
    .string()
    .email("Please, provide a valid email address.")
    .min(1, "Recipient's Email is required!"),
  recipientId: z
    .string()
    .min(1, "Recipient's plaid sharable id is required!"),
  amount: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Please, provide a valid amount.",
    })
    .refine((val) => val >= 20, {
      message: "Amount should be at least $20.",
    })
    .transform((val) => String(val)),
});

export type TransferFormSchema = z.infer<typeof transferFormSchema>;

export default transferFormSchema;
