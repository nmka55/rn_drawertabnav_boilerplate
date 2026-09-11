import { DateTime } from 'luxon';

export const dateFormats = {
  date: 'yyyy/MM/dd',
  dateTime: 'yyyy/MM/dd HH:mm',
  time: 'HH:mm',
} as const;

export function formatCurrency(
  amount: number,
  currency = 'MNT',
  locale = 'mn-MN',
): string {
  return new Intl.NumberFormat(locale, {
    currency,
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(amount);
}

export function formatIsoDate(
  value: string,
  format: string = dateFormats.dateTime,
): string | null {
  const date = DateTime.fromISO(value);
  return date.isValid ? date.toFormat(format) : null;
}

/** Formats past and future timestamps without hard-coding a single locale's relative words. */
export function formatRelativeTime(
  value: string,
  locale = 'en',
): string | null {
  const date = DateTime.fromISO(value);
  return date.isValid
    ? date.toRelative({ base: DateTime.now(), locale }) ?? null
    : null;
}
