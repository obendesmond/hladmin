"use client";

import * as React from "react";
import moment from "moment";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface DateRangePickerProps {
  timeStartSeconds: number;
  timeEndSeconds: number;
  onChange: (timeRange: {
    time_start_seconds: number;
    time_end_seconds: number;
  }) => void;
  className?: string;
}

export function DateRangePicker({
  className,
  timeStartSeconds,
  timeEndSeconds,
  onChange,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: moment.unix(timeStartSeconds).toDate(),
    to: moment.unix(timeEndSeconds).toDate(),
  });

  const [time, setTime] = React.useState({
    from: moment.unix(timeStartSeconds).format("HH:mm"),
    to: moment.unix(timeEndSeconds).format("HH:mm"),
  });

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);

    if (selectedDate?.from && selectedDate?.to) {
      const startMoment = moment(selectedDate.from)
        .hours(parseInt(time.from.split(":")[0], 10))
        .minutes(parseInt(time.from.split(":")[1], 10));

      const endMoment = moment(selectedDate.to)
        .hours(parseInt(time.to.split(":")[0], 10))
        .minutes(parseInt(time.to.split(":")[1], 10));

      onChange({
        time_start_seconds: startMoment.unix(),
        time_end_seconds: endMoment.unix(),
      });
    }
  };

  const handleTimeChange = (key: "from" | "to", value: string) => {
    setTime((prev) => ({ ...prev, [key]: value }));

    if (date?.from && date?.to) {
      const fromTime = key === "from" ? value : time.from;
      const toTime = key === "to" ? value : time.to;

      // Use local timezone explicitly
      const updatedFrom = moment(date.from)
        .startOf("day")
        .add(parseInt(fromTime.split(":")[0], 10), "hours")
        .add(parseInt(fromTime.split(":")[1], 10), "minutes")
        .toDate();

      const updatedTo = moment(date.to)
        .startOf("day")
        .add(parseInt(toTime.split(":")[0], 10), "hours")
        .add(parseInt(toTime.split(":")[1], 10), "minutes")
        .toDate();

      // Update both the time range and date state
      setDate({ from: updatedFrom, to: updatedTo });

      onChange({
        time_start_seconds: moment(updatedFrom).unix(),
        time_end_seconds: moment(updatedTo).unix(),
      });
    }
  };

  const handlePredefinedRange = (minutes: number) => {
    const now = moment();
    const startTime = now.clone().subtract(minutes, "minutes");
    const endTime = now;

    setDate({ from: startTime.toDate(), to: endTime.toDate() });
    setTime({
      from: startTime.format("HH:mm"),
      to: endTime.format("HH:mm"),
    });

    onChange({
      time_start_seconds: startTime.unix(),
      time_end_seconds: endTime.unix(),
    });
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            size={"sm"}
            variant={"outline"}
            className={cn(
              "md:min-w-[300px] justify-start text-left font-normal border border-neutral-200 bg-transparent shadow-sm"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {moment(date.from).format("ddd, Do, MMM h:mm A")} -{" "}
                  {moment(date.to).format("ddd, Do MMM h:mm A")}
                </>
              ) : (
                moment(date.from).format("ddd, Do h:mm A")
              )
            ) : (
              <span>Pick a date and time</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="space-y-4">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col">
                <label htmlFor="start-time" className="text-sm font-medium">
                  Start Time
                </label>
                <Input
                  id="start-time"
                  type="time"
                  value={time.from}
                  onChange={(e) => handleTimeChange("from", e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="end-time" className="text-sm font-medium">
                  End Time
                </label>
                <Input
                  id="end-time"
                  type="time"
                  value={time.to}
                  onChange={(e) => handleTimeChange("to", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Predefined Ranges</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handlePredefinedRange(15)}
                >
                  Last 15 minutes
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handlePredefinedRange(30)}
                >
                  Last 30 minutes
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handlePredefinedRange(60)}
                >
                  Last 1 hour
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handlePredefinedRange(120)}
                >
                  Last 2 hours
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
