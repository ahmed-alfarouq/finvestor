"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useCurrentUser from "@/hooks/use-current-user";

const SelectBank = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const user = useCurrentUser();

  if (!user?.banks.length) return;

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="bg-primary-color">
        <SelectValue placeholder="Choose a bank" />
      </SelectTrigger>
      <SelectContent>
        {user.banks.map((b) => (
          <SelectItem key={b.id} value={b.accessToken}>
            {b.name} {b.areLiabilityAccounts && "(Loans)"}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBank;
