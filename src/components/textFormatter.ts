import 'intl';
import 'intl/locale-data/jsonp/mn-MN';

import {DateTime} from 'luxon';
import {constantValues} from '@app/constants';

export function CurrencyFormatter(
  currencyCode: string = 'MNT',
  locales: string = 'mn-MN',
) {
  const options = {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol',
    maximumFractionDigits: 0,
  };

  return new Intl.NumberFormat(locales, options);
}

export function DateTimeFormatter(
  text: string = '',
  format: string = constantValues?.dateTimeFormat,
) {
  if (text) {
    return DateTime?.fromISO(text)?.toFormat(format);
  } else {
    return null;
  }
}

export function DurationFormatter(dateISOString: string = '') {
  if (!dateISOString) {
    return null;
  }

  const now = DateTime?.now();
  const createdDate = DateTime.fromISO(dateISOString);

  const {hours = -1, minutes = -1} = now
    .diff(createdDate, ['hours', 'minutes'])
    .toObject();

  if (hours === -1 && minutes === -1) {
    return null;
  }

  if (hours > 1 && hours < 24) {
    return `${Math.floor(hours)} цагийн өмнө`;
  } else if (hours < 1 && minutes > 0) {
    return `${Math.floor(minutes)} минутын өмнө`;
  }

  return DateTimeFormatter(dateISOString);
}
