import { z } from "zod";

const selectAccountsSchema = z.object({
  selectedBankIds: z
    .array(z.string())
    .min(1, "Please select at least one account."),
});

export type SelectAccountsSchema = z.infer<typeof selectAccountsSchema>;

export default selectAccountsSchema;
