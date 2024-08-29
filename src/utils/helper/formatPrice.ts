import { locale } from '@/navigation';

export const formatPrice = (value: number, currency: string = 'USD', locale: locale): string => {
  switch (locale) {
    case 'ar':
      return new Intl.NumberFormat('ar-u-nu-latn', {
        style: 'currency',
        currency: currency,
        // These options ensure that the currency symbol is always shown
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    case 'en':
      return new Intl.NumberFormat('en-EG', {
        style: 'currency',
        currency: currency,
        // These options ensure that the currency symbol is always shown
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    case 'fr':
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: currency,
        // These options ensure that the currency symbol is always shown
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    case 'hi':
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency,
        // These options ensure that the currency symbol is always shown
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    case 'zh':
      return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: currency,
        // These options ensure that the currency symbol is always shown
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    default:
      return new Intl.NumberFormat('en-EG', {
        style: 'currency',
        currency: currency,
        // These options ensure that the currency symbol is always shown
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
  }
};
