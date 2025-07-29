"use client";
import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useBanksDataContext } from "@/context/BanksDataContext";

import { TransferFormSchema } from "@/schemas/transfer";

const SourceBankSelect = ({
  control,
}: {
  control: Control<TransferFormSchema>;
}) => {
  const { accounts } = useBanksDataContext();
  const validAccounts = accounts.data.filter(
    (account) => account.subtype === "savings" || account.subtype === "checking"
  );

  console.log(validAccounts);
  return (
    <FormField
      control={control}
      name="sourceBank"
      render={({ field }) => (
        <FormItem className="w-11/12 lg:w-5/12">
          <FormControl>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="transfer-input">
                <SelectValue placeholder="Select Account" />
              </SelectTrigger>
              <SelectContent>
                {validAccounts.map((account) => (
                  <SelectItem key={account.id} value={account.sharableId}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SourceBankSelect;
