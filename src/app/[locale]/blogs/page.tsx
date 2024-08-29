import BackToHomePage from '@/components/common/custom/BackToHomePage/index';
import { locale } from '@/navigation';
import { languagesMap } from '@/services/data/languages';
import Blogs from '@/views/Blogs';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('gs4DkAGiRKhsWfY3j-Kqs'),
    description: t('oVbjVewMbWf9nmQojdEXP'),
    alternates: {
      canonical: `/${params.locale}/blogs`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}/blogs`;
        return acc;
      }, {}),
    },
    openGraph: {
      title: t('gs4DkAGiRKhsWfY3j-Kqs'),
      description: t('oVbjVewMbWf9nmQojdEXP'),
      url: `https://travolic.com/${params.locale}/blogs`,
      siteName: 'Travolic',
      images: [
        {
          url: '/ogImage.png',
          type: 'image/png',
          alt: 'Travolic',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('gs4DkAGiRKhsWfY3j-Kqs'),
      description: t('oVbjVewMbWf9nmQojdEXP'),
      site: '@Travolicllc',
      images: [
        {
          url: '/ogImage.png',
          width: 2400,
          height: 1256,
          username: '@Travolicllc',
          type: 'image/png',
          alt: 'Travolic',
        },
      ],
    },
  };
}

const BlogsPage = ({ params: { locale } }: { params: { locale: locale } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  return (
    <>
      <BackToHomePage currentRoute={t('v_JZbLmurs_4DoHfG4idr')} />
      <Blogs />
    </>
  );
};

export default BlogsPage;
