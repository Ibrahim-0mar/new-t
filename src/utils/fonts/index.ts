import { Poppins, Yellowtail, Roboto_Condensed, Changa, Noto_Sans_SC, Aref_Ruqaa } from 'next/font/google';
import { locale } from '@/navigation';

export const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
  subsets: ['latin'],
});

export const yellowTail = Yellowtail({
  weight: ['400'],
  display: 'swap',
  variable: '--font-yellow-tail',
  subsets: ['latin'],
});

export const roboto = Roboto_Condensed({
  weight: ['300', '400', '700'],
  display: 'swap',
  variable: '--font-roboto',
  subsets: ['greek'],
});

export const changa = Changa({
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-changa',
  subsets: ['arabic'],
});

export const aref_reqaa = Aref_Ruqaa({
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-aref-reqaa',
  subsets: ['arabic'],
});

export const notoSansChinese = Noto_Sans_SC({
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-noto-sans-sc',
  subsets: ['latin'],
});

/**
 * Returns the font css classname for each language based on the given locale.
 * @param locale The locale language as a string `ex: 'en'`
 * @returns The appropriate font css classname for the language
 */
export function getFontClassName(locale: locale): string {
  switch (locale) {
    case 'en':
    case 'hi':
      return poppins.className;
    case 'fr':
      return roboto.className;
    case 'ar':
      return changa.className;
    case 'zh':
      return notoSansChinese.className;
    default:
      return poppins.className;
  }
}
