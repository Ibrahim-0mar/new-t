import BackToHomePage from '@/components/common/custom/BackToHomePage/index';
import { locale } from '@/navigation';
import { languagesMap } from '@/services/data/languages';
import PrivacyPolicy from '@/views/PrivacyPolicy';
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
    title: t('E_5Dt4AM4w-GPRHf4D_bf'),
    description: t('2X6d6E-_hKkHtrOQrKS7Q'),
    alternates: {
      canonical: `/${params.locale}/privacy-policy`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}/privacy-policy`;
        return acc;
      }, {}),
    },
    openGraph: {
      title: t('E_5Dt4AM4w-GPRHf4D_bf'),
      description: t('2X6d6E-_hKkHtrOQrKS7Q'),
      url: `https://travolic.com/${params.locale}/privacy-policy`,
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
      title: t('E_5Dt4AM4w-GPRHf4D_bf'),
      description: t('2X6d6E-_hKkHtrOQrKS7Q'),
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

const PrivacyPolicyPage = ({ params: { locale } }: { params: { locale: locale } }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <>
      <BackToHomePage currentRoute={t('kOMPYBonYo3Y3VLeK7Jts')} />
      <PrivacyPolicy />
    </>
  );
};

export default PrivacyPolicyPage;
