import React from 'react';
import dayjs from 'dayjs';
import { DateTimeFormatOptions, useFormatter } from 'next-intl';

type FormatDateProps = {
  date: Date | string | number;
  endDate?: Date | string | number;
  range?: boolean;
  additionalFormats?: DateTimeFormatOptions;
  replaceFormatWith?: DateTimeFormatOptions | string;
};

/**
 * FormatDate component to format dates based on internationalization settings and application locale.
 * @param {Date | string | number} date - The date to format. Can be a Date object, a date string, or a timestamp.
 * @param {boolean} range - Whether the date is a range between two dates.
 * @param {DateTimeFormatOptions} [additionalFormats] - Additional formatting options.
 * @param {DateTimeFormatOptions | string} [replaceFormatWith] - Replacement format options or a format string.
 * @returns {JSX.Element} The formatted date as a React JSX.
 *
 * @example
 * // Basic usage with a date string
 * <FormatDate date="2024-06-03" />
 * @returns Mon, Jun 3
 *
 * @example
 * // With additional formatting options
 * <FormatDate
 *   date={new Date('2024-06-03')}
 *   additionalFormats={{ year: 'numeric' }}
 * />
 * @returns Mon, Jun 3, 2024
 *
 * @example
 * // Replacing the default format with a completely new one
 * <FormatDate
 *   date="2024-06-03"
 *   replaceFormatWith={{ dateStyle: 'full' }}
 * />
 * @returns June 3, 2024
 */
export default function FormatDate({
  date = '1999-09-09',
  endDate = '1999-09-09',
  range = false,
  additionalFormats,
  replaceFormatWith,
}: FormatDateProps) {
  const format = useFormatter();

  const startDateObject = dayjs(date).toDate();
  const endDateObject = dayjs(endDate).toDate();

  let dateFormat: DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    numberingSystem: 'latn',
  };

  if (additionalFormats) dateFormat = { ...dateFormat, ...additionalFormats };

  if (range)
    return (
      <>{format.dateTimeRange(startDateObject, endDateObject, replaceFormatWith || dateFormat)}</>
    );

  return <>{format.dateTime(startDateObject, replaceFormatWith || dateFormat)}</>;
}
