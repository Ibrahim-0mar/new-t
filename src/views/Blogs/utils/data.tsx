import { locale } from '@/navigation';
import { arabicBlogs } from './arabixBlogs';
import { englishBlogs } from './englishBlogs';

export interface BlogObj {
  dir: 'rtl' | 'ltr';
  url: string;
  imgUrl: string;
  headerImgUrl?: string;
  genre: { id: string; name: string };
  metaTitle: string;
  metaDescription: string;
  title: string;
  heading: string | JSX.Element;
  isOrderedList?: boolean;
  content:
    | { title?: string; paragraph: string | JSX.Element; img?: { url: string; width: number; height: number; imageClassName?: string} }[]
    | { title: string; paragraph?: string | JSX.Element; img?: { url: string; width: number; height: number; imageClassName?: string} }[];
}
export type BlogsGenres = {
  [key: string] : string
}

export const getBlogs = (locale: locale) => {
  switch (locale) {
    case 'en':
      return englishBlogs;
    case 'ar':
      return arabicBlogs;
    default:
      return null;
  }
};

export const getBlogsGenres = (locale: locale) => {
  const englishGenres: BlogsGenres = {
    "travelTips": "Travel Tips",
    "travelEvents": "Travel Events",
    "bestDestinations": "Best Destinations",
    "funFacts": "Fun Facts",
  };

  const arabicGenres: BlogsGenres = {
    "حقائق-ممتعة": "حقائق ممتعة",
    "نصائح-السفر": "نصائح السفر",
    "أفضل-الأماكن": "أفضل الأماكن السياحية",
  };

  switch (locale) {
    case 'en':
      return englishGenres;
    case 'ar':
      return arabicGenres;
    default:
      return null;
  }
};

