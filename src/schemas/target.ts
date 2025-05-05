import { z } from "zod";

export const targetSchema = z.object({
  target: z
    .string({ required_error: "Target is required!" })
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "Target must be more than 0!",
    })
    .transform((val) => String(val)),
});

export type TargetSchema = z.infer<typeof targetSchema>;
