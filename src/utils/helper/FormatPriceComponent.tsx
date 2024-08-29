import React from 'react';

import { NumberFormatOptions, useFormatter } from 'next-intl';

type FormatPriceProps = {
  price: number | bigint;
  currency: string;
  additionalFormats?: NumberFormatOptions;
  replaceFormatWith?: NumberFormatOptions | string;
};

/**
 * A custom component that formats the price using next-intl corresponding to the current application's locale.
 * @param {number | bigint} price - The price value to be formatted.
 * @param {string} currency - The currency code (e.g., `USD`, `EUR`).
 * @param {NumberFormatOptions} [additionalFormats] - Additional formatting options to override the default format.
 * @param {NumberFormatOptions | string} [replaceFormatWith] - Option to replace the default format with a completely new format.
 *
 * @example
 * // Basic usage
 * <FormatPrice price={1999} currency="USD" />
 *
 * @example
 * // With additional formats
 * <FormatPrice
 *   price={1999}
 *   currency="EUR"
 *   additionalFormats={{ minimumFractionDigits: 2 }}
 * />
 *
 * @example
 * // With a new custom format
 * <FormatPrice
 *   price={1999}
 *   currency="JPY"
 *   replaceFormatWith={{ style: 'decimal' }}
 * />
 *
 * @returns {JSX.Element} The formatted price as a React JSX Element. (e.g. 1999$ / 1999 ج.م.)
 */

export default function FormatPrice({
  price = 999,
  currency = 'USD',
  additionalFormats,
  replaceFormatWith,
}: FormatPriceProps) {
  const format = useFormatter();

  let priceFormat: NumberFormatOptions = {
    style: 'currency',
    currency,
    numberingSystem: 'latn',
    maximumFractionDigits: 0,
  };

  if (additionalFormats) priceFormat = { ...priceFormat, ...additionalFormats };

  return <>{format.number(price, replaceFormatWith || priceFormat)}</>;
}
