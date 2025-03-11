import 'intl';
import 'intl/locale-data/jsonp/mn-MN';

import {DateTime} from 'luxon';
import {constantValues} from '@app/constants';

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
  format: string = constantValues?.dateTimeFormat,
): string | null {
  return text ? DateTime.fromISO(text).toFormat(format) : null;
}

export function DurationFormatter(dateISOString: string = ''): string | null {
  if (!dateISOString) {
    return null;
  }

  const now = DateTime.now();
  const createdDate = DateTime.fromISO(dateISOString);
  const diff = now.diff(createdDate, ['hours', 'minutes']).toObject();

  const hours = Math.floor(diff.hours ?? -1);
  const minutes = Math.floor(diff.minutes ?? -1);

  if (hours === -1 && minutes === -1) {
    return null;
  }
  if (hours >= 1 && hours < 24) {
    return `${hours} цагийн өмнө`;
  }
  if (hours < 1 && minutes > 0) {
    return `${minutes} минутын өмнө`;
  }

  return DateTimeFormatter(dateISOString);
}
