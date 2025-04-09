"use client";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePickerProps } from "@/types";

const DatePicker = ({
  selectedDate,
  onDateChange,
  disabled,
  endMonth,
  dateFormat = "PPP",
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger disabled={disabled} asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full h-10 py-1 justify-start text-left font-normal dark:text-primary-dark dark:bg-transparent dark:border-gray-3",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, dateFormat)
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2">
        <Calendar
          mode="single"
          defaultMonth={selectedDate}
          selected={selectedDate}
          onSelect={onDateChange}
          endMonth={endMonth}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
