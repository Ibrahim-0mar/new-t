import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export type locale = 'en' | 'ar' | 'fr' | 'hi' | 'zh';

export const locales = ['en', 'ar', 'fr', 'hi', 'zh'] as const;
export const localePrefix = 'always'; // Default
export const defaultLocale = 'en';

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
  localePrefix,
});
