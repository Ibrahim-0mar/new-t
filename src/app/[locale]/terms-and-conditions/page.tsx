import BackToHomePage from '@/components/common/custom/BackToHomePage/index';
import { locale } from '@/navigation';
import { languagesMap } from '@/services/data/languages';
import TermsAndConditions from '@/views/TermsAndConditions';
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
    title: t('KcdAhiwiJKtsht_eXSzNB'),
    description: t('fSKG5CgryvHENyjyOfuk4'),
    alternates: {
      canonical: `/${params.locale}/terms-and-conditions`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}/terms-and-conditions`;
        return acc;
      }, {}),
    },
    openGraph: {
      title: t('KcdAhiwiJKtsht_eXSzNB'),
      description: t('fSKG5CgryvHENyjyOfuk4'),
      url: 'https://travolic.com/en/terms-and-conditions',
      siteName: 'Travolic',
      images: [
        {
          url: '/ogImage.png',
          type: 'image/png',
          alt: 'Travolic',
        },
      ],
      locale: params.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('KcdAhiwiJKtsht_eXSzNB'),
      description: t('fSKG5CgryvHENyjyOfuk4'),
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

const TermsAndConditionsPage = ({ params: { locale } }: { params: { locale: locale } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  return (
    <>
      <BackToHomePage currentRoute={t('zlTqgcMFQXSJ4s45UBI1P')} />
      <TermsAndConditions />
    </>
  );
};

export default TermsAndConditionsPage;
