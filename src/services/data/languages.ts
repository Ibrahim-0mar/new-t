import { languageType } from '@/utils/types/common';

export const languagesMap: {
  id: number;
  name: string;
  code: string;
  locale: string;
  country: string;
  isRTL: boolean;
}[] = [
  {
    id: 0,
    name: 'English',
    code: 'en',
    locale: 'en-US',
    country: 'United States',
    isRTL: false,
  },
  {
    id: 1,
    name: 'عربي',
    code: 'ar',
    locale: 'ar-EG',
    country: 'مصر',
    isRTL: true,
  },
  {
    id: 2,
    name: 'français',
    code: 'fr',
    locale: 'fr-FR',
    country: 'France',
    isRTL: false,
  },
  {
    id: 3,
    name: 'हिन्दी',
    code: 'hi',
    locale: 'hi-IN',
    country: 'भारत',
    isRTL: false,
  },
  {
    id: 4,
    name: '中文',
    code: 'zh',
    locale: 'zh-CN',
    country: '中国',
    isRTL: false,
  },
];

const languages: languageType[] = languagesMap;
export function getLanguageByCode(code: string) {
  const language = languagesMap.filter((lang: languageType) => lang.code === code);
  return language;
}
export default languages;
