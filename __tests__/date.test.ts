import {
  formatCurrency,
  formatIsoDate,
  formatRelativeTime,
} from '@app/lib/date';

describe('date and currency utilities', () => {
  it('formats money using the selected locale and currency', () => {
    expect(formatCurrency(125000, 'USD', 'en-US')).toBe('$125,000');
  });

  it('formats valid ISO values and rejects invalid input', () => {
    expect(formatIsoDate('2026-09-11T12:30:00.000Z', 'yyyy/MM/dd')).toBe(
      '2026/09/11',
    );
    expect(formatIsoDate('not-a-date')).toBeNull();
  });

  it('has a documented null result for an invalid relative timestamp', () => {
    expect(formatRelativeTime('not-a-date')).toBeNull();
  });
});
