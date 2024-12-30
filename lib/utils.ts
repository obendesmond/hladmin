import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// joins fullname
export const getFullName = (firstName?: string, lastName?: string | null) => {
  if (!firstName && !lastName) return "Hungerlink Admin";
  return `${firstName ?? ""} ${lastName ?? ""}`.trim();
};

// transforms Firstname Lastname to FL
export const getNameInitials = (firstName?: string, lastName?: string) => {
  const firstInitial = firstName?.charAt(0).toUpperCase() ?? "H";
  const lastInitial = lastName?.charAt(0).toUpperCase() ?? "A";

  return `${firstInitial}${lastInitial}`;
};

// start: today - 4 days, end: today + 1 day
export function getDynamicTimeRange() {
  // Start time: 4 days before today, at start of the day (local time)
  const timeStartSeconds = moment().subtract(4, "days").startOf("day").unix();

  // End time: 1 day after today, at end of the day (local time)
  const timeEndSeconds = moment().add(1, "days").endOf("day").unix();

  return {
    time_start_seconds: timeStartSeconds,
    time_end_seconds: timeEndSeconds,
  };
}
