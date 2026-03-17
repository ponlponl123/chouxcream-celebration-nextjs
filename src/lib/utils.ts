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

export function formatRemaining(now: Date, deadline: Date) {
  const remainingMs = deadline.getTime() - now.getTime();
  const msPerDay = 24 * 60 * 60 * 1000;

  if (remainingMs <= 0) return "0d";

  if (remainingMs >= msPerDay) {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(
      deadline.getFullYear(),
      deadline.getMonth(),
      deadline.getDate(),
    );

    let months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    const monthAdjusted = new Date(
      start.getFullYear(),
      start.getMonth() + months,
      start.getDate(),
    );

    if (monthAdjusted > end) {
      months--;
    }

    const monthAnchor = new Date(
      start.getFullYear(),
      start.getMonth() + months,
      start.getDate(),
    );
    const remainingDays = Math.floor(
      (end.getTime() - monthAnchor.getTime()) / msPerDay,
    );

    const monthsLabel = months > 0 ? `${months} เดือน` : "";
    const daysLabel = `${remainingDays} วัน`;

    return months > 0 ? `${monthsLabel} ${daysLabel}` : daysLabel;
  }

  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
