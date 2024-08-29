import Container from '@/components/common/base/Container';
import BackToHomePage from '@/components/common/custom/BackToHomePage/index';
import { locale } from '@/navigation';
import { languagesMap } from '@/services/data/languages';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import HowTravolicWorks from '@/views/HowTravolicWorks';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

type Props = {
  params: { locale: locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('diB92E30UHG543r-vv-jK'),
    description: t('eETdzD4kaD2lWX50oXPks'),
    alternates: {
      canonical: `/${params.locale}/how-travolic-works`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}/how-travolic-works`;
        return acc;
      }, {}),
    },
    openGraph: {
      title: `${t('diB92E30UHG543r-vv-jK')} - ${t('jvSCLI0fSnM0IGMagNIbr')}`,
      description: t('eETdzD4kaD2lWX50oXPks'),
      url: `https://travolic.com/${params.locale}/how-travolic-works`,
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
      title: `${t('diB92E30UHG543r-vv-jK')} - ${t('jvSCLI0fSnM0IGMagNIbr')}`,
      description: t('eETdzD4kaD2lWX50oXPks'),
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

const HowTravolicWorksPage = ({ params: { locale } }: { params: { locale: locale } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  return (
    <>
      <BackToHomePage currentRoute={t('diB92E30UHG543r-vv-jK')} />
      <div className="relative h-48 lg:h-96">
        <Image
          src={commonImgUrl('how-travolic-works.png')}
          fill
          sizes="100vw"
          alt={t('diB92E30UHG543r-vv-jK')}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <Container>
        <h1 className='header my-8 text-center'>{t('03vOEZEwdKlGkUYmX2cDl')}</h1>
        <HowTravolicWorks />
      </Container>
    </>
  );
};

export default HowTravolicWorksPage;
