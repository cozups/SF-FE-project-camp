import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const calculateTimeOffset = (date: Date) => {
  const offsetInMinutes = date.getTimezoneOffset();
  const calculatedTime = new Date(date.getTime() - offsetInMinutes * 60 * 1000);

  return calculatedTime;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
