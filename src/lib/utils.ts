import { celebrationDate } from "@/config/date";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function dateNumberBuilder(n: number) {
  return n < 10 ? "0" + n : n;
}

export function dateBuilder(y: number, d: typeof celebrationDate) {
  const buildString = `${y}-${dateNumberBuilder(d.month)}-${dateNumberBuilder(
    d.day,
  )}T${dateNumberBuilder(d.hour)}:${dateNumberBuilder(
    d.minute,
  )}:${dateNumberBuilder(d.second)}+07:00`;
  return new Date(buildString);
}
