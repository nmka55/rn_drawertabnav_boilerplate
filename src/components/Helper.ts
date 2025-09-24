import { DateTime } from 'luxon';
import { ConstantValues } from '@app/constants';

export function CurrencyFormatter(
  currencyCode: string = 'MNT',
  locales: string = 'mn-MN',
) {
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol',
    maximumFractionDigits: 0,
  });
}

export function DateTimeFormatter(
  text: string = '',
  format: string = ConstantValues?.dateTimeFormat,
): string | null {
  if (!text) {
    return null;
  }

  const dt = DateTime.fromISO(text);
  if (!dt.isValid) {
    return null;
  }

  return dt.toFormat(format);
}

export function DurationFormatter(dateISOString: string = ''): string | null {
  if (!dateISOString) {
    return null;
  }

  const createdDate = DateTime.fromISO(dateISOString);
  if (!createdDate.isValid) {
    return null;
  }

  const diffMinutesRaw = DateTime.now().diff(createdDate, 'minutes').minutes;
  const diffMinutes = Math.floor(diffMinutesRaw ?? NaN);
  if (!Number.isFinite(diffMinutes)) {
    return null;
  }

  if (diffMinutes >= 0 && diffMinutes < 1) {
    return 'саяхан';
  }
  if (diffMinutes >= 1 && diffMinutes < 60) {
    return `${diffMinutes} минутын өмнө`;
  }
  if (diffMinutes >= 60 && diffMinutes < 24 * 60) {
    return `${Math.floor(diffMinutes / 60)} цагийн өмнө`;
  }

  return DateTimeFormatter(dateISOString);
}
