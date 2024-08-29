import BackToHomePage from '@/components/common/custom/BackToHomePage/index';
import { locale } from '@/navigation';
import { languagesMap } from '@/services/data/languages';
import AboutUs from '@/views/AboutUs';
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
    title: t('fC6a3vqeHTPln30gbazPU'),
    description: t('-vZ_KXIUtPbbcFYVrOG4B'),
    alternates: {
      canonical: `/${params.locale}/about-us`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}/about-us`;
        return acc;
      }, {}),
    },
    openGraph: {
      title: t('fC6a3vqeHTPln30gbazPU'),
      description: t('-vZ_KXIUtPbbcFYVrOG4B'),
      url: `https://travolic.com/${params.locale}/about-us`,
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
      title: t('fC6a3vqeHTPln30gbazPU'),
      description: t('-vZ_KXIUtPbbcFYVrOG4B'),
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

const AboutUsPage = ({ params: { locale } }: { params: { locale: locale } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  return (
    <>
      <BackToHomePage currentRoute={t('iOHulH36Lqb9DaeTwUHU7')} />
      <AboutUs />
    </>
  );
};

export default AboutUsPage;
