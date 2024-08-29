'use client';
import { cn } from '@/utils/helper/tailwind_cn';
import { useSearchParams } from 'next/navigation';
import styles from './index.module.css';
import { Link, locale } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { BlogsGenres, getBlogsGenres } from '../../utils/data';


const NavigatingLinks = () => {
  const t = useTranslations()
  const locale = useLocale() as locale
  const activeBlog = useSearchParams().get('active-blog');
  const blogsGenres = getBlogsGenres(locale);

  if(!blogsGenres) return
  return (
    <div className={styles.explore}>
      <h1>{t('wjVGqMzzseaW8s1PNxeXe')}</h1>
      <div>
        <Link
          href="?active-blog=all"
          className={cn(
            (activeBlog === 'all' || !activeBlog) && styles.activeLink,
            styles.genreLink,
          )}
          scroll={false}
        >
          {t('I9oADa097A3lryKYbISI8')}
        </Link>
        {Object.keys(blogsGenres).map((link, index) => (
          <Link
            key={index}
            href={`?active-blog=${link}`}
            className={cn(
              styles.genreLink,
              (activeBlog === link) && styles.activeLink,
            )}
            scroll={false}
          >
            {blogsGenres[link as keyof BlogsGenres]}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavigatingLinks;
