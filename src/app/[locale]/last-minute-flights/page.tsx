import Container from '@/components/common/base/Container';
import AccordionComponent from '@/components/common/custom/AccordionSSR/AccordionComponent';
import AppDownloadSection from '@/sections/common/AppDownloadSection';

import { languagesMap } from '@/services/data/languages';
import { Metadata } from 'next';

import { locale } from '@/navigation';
import SearchboxSection from '@/sections/common/SearchboxSection';
import BestDealsSection from '@/sections/flights/BestDealsSection';
import TopFlightsSection from '@/sections/flights/TopFlightsSection';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import CardsLoading from '../(homepage)/@BestDealsSection/loading';
import PlaceHolder from '../(homepage)/@TopFlightsSection/loading';
import styles from './page.module.css';

type FlightsPageProps = {
  params: { locale: locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: FlightsPageProps): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('8afJ0RjAQ3GToxI1wP5jc'),
    description: t('hwfiWeSOIsEyQ-jPq2efW'),
    alternates: {
      canonical: `/${params.locale}/last-minute-flights`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}/last-minute-flights`;
        return acc;
      }, {}),
    },
    openGraph: {
      title: t('8afJ0RjAQ3GToxI1wP5jc'),
      description: t('hwfiWeSOIsEyQ-jPq2efW'),
      url: `https://travolic.com/${params.locale}/last-minute-flights`,
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
      title: t('8afJ0RjAQ3GToxI1wP5jc'),
      description: t('hwfiWeSOIsEyQ-jPq2efW'),
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


export default async function Page({ params: { locale }, searchParams }: FlightsPageProps) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations();
  const nearbyAirport = (await globalDataGetter('server', 'nearbyAirport')) || {
    code: null,
  };

  const faqs = [
    {
      title: t('7VzSvFbnyLs90vTbokMMs'),
      content: t('HJOdyZElrTb_OsRBssGTl'),
    },
    {
      title: t('x-boXYc3CsZ3p6nFbXHhY'),
      content: t('S8LsuZJMgZ8fJEUPaQys7'),
    },
    {
      title: t('-oqu0E3EbVtbH-CHKRcwF'),
      content: t('8Kmz-GzyDL29hWGEynn0R'),
    },
    {
      title: t('g0hM-IsNyd29z5zQJIpOD'),
      content: t('_a45qlrSd7ss13Cf43gdR'),
    },
    {
      title: t('QBNwVwDbkLl1uf5UtgeGK'),
      content: t('J02boS8SMa0SYMKsCQ4GT'),
    },
    {
      title: t('X5Iz6yM4MQEFrHw7yEBDV'),
      content: t('flBVAJMsVPAMPJxvqHObN'),
    },
    {
      title: t('uXTDt24JwYaU6o090Kadk'),
      content: t('eD8ghHxIp-rM5ZkD1Ehp7'),
    },
    {
      title: t('2_AzZOFLfcOIQGzh83Lku'),
      content: t('FFzfVgklinbvSh85GbrL4'),
    },
  ];

  return (
    <>
      <SearchboxSection
        activeTab="last-minute-flights"
        header={t('3ZmNid0KITep8C3zlgctz')}
        data={nearbyAirport.code != null ? { origins: [nearbyAirport?.code] } : {}}
      />
      <Container>
        <h1 className="header">{t('rTqu1nr5XBARkOOuEevSa')}</h1>
        <p className="subHeader">{t('Su_cGXUomItNtE3bMyf7O')}</p>
      </Container>
      <Suspense fallback={<CardsLoading />}>
        <BestDealsSection />
      </Suspense>
      <AppDownloadSection />
      <Suspense fallback={<PlaceHolder />}>
        <TopFlightsSection searchParams={searchParams} />
      </Suspense>
      <Container className={styles.faqsContainer}>
        <h2 className={styles.faqsHeading}>{t('UammwBMuQIu9ek6POGfRh')}</h2>
        <p className={styles.faqsParagraph}>{t('7eIRn6wsIIT0tyF7tvcXh')}</p>
        <AccordionComponent accordionArray={faqs} />
      </Container>
    </>
  );
}
