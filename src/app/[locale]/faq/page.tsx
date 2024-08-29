import BackToHomePage from '@/components/common/custom/BackToHomePage/index';
import { locale } from '@/navigation';
import { languagesMap } from '@/services/data/languages';
import FAQ from '@/views/FAQ/index';
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
    title: t('qygRfRqHREbTOjfRYLU5a'),
    description: t('p8b6G6oLsiAkY7_r4Z2Ae'),
    alternates: {
      canonical: `/${params.locale}/faq`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}/faq`;
        return acc;
      }, {}),
    },
    openGraph: {
      title: t('qygRfRqHREbTOjfRYLU5a'),
      description: t('p8b6G6oLsiAkY7_r4Z2Ae'),
      url: `https://travolic.com/${params.locale}/faq`,
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
      title: t('qygRfRqHREbTOjfRYLU5a'),
      description: t('p8b6G6oLsiAkY7_r4Z2Ae'),
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

const FAQPage = ({ params: { locale } }: { params: { locale: locale } }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations();
  return (
    <>
      <BackToHomePage currentRoute={t('Y3eDITMsbF2gErMTo9sDC')} />
      <FAQ />
    </>
  );
};

export default FAQPage;
