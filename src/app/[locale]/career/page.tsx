import BackToHomePage from '@/components/common/custom/BackToHomePage/index';
import { locale } from '@/navigation';
import { languagesMap } from '@/services/data/languages';
import Career from '@/views/Career';
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
    title: t('RcUAa335zxnsVIT0kOC43'),
    description: t('FcgkMr24t61zAgaUR_R12'),
    alternates: {
      canonical: `/${params.locale}/career`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}/career`;
        return acc;
      }, {}),
    },
    openGraph: {
      title: t('RcUAa335zxnsVIT0kOC43'),
      description: t('FcgkMr24t61zAgaUR_R12'),
      url: `https://travolic.com/${params.locale}/career`,
      siteName: 'Travolic',
      images: [
        {
          url: '/ogImage.png',
          type: 'image/png',
          alt: 'Travolic',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('RcUAa335zxnsVIT0kOC43'),
      description: t('FcgkMr24t61zAgaUR_R12'),
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

const CareerPage = ({ params: { locale } }: { params: { locale: locale } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  return (
    <>
      <BackToHomePage currentRoute={t('lityphNIGOWu-erYxEfBe')} />
      <Career />
    </>
  );
};

export default CareerPage;
