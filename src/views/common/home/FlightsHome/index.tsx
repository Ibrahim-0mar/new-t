import Container from '@/components/common/base/Container';
import AccordionComponent from '@/components/common/custom/AccordionSSR/AccordionComponent';
import AppDownloadSection from '@/sections/common/AppDownloadSection';
import SearchboxSection from '@/sections/common/SearchboxSection';
import BestDealsSection from '@/sections/flights/BestDealsSection';
import TopFlightsSection from '@/sections/flights/TopFlightsSection';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import styles from './index.module.css';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

const FlightsHome = async ({
  variant,
  searchParams,
}: {
  variant: 'flights' | 'home';
  searchParams: { [key: string]: string };
}) => {
  const t = await getTranslations();

  const content = {
    flights: {
      faqsHeader: {
        heading: t('UammwBMuQIu9ek6POGfRh'),
        paragraph: t('7eIRn6wsIIT0tyF7tvcXh'),
      },
      faqs: [
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
      ],
      searchboxHeading: t('9442pTlsaMrzBGZdmCjaS'),
    },
    home: {
      faqsHeader: {
        heading: t('-YGBhKvZZjsTPat4RUH9l'),
        paragraph: t('tboLvfYNejASHIcoAYZUj'),
      },
      faqs: [
        {
          title: t('2dYGC3uve9p0MBp1FGVDu'),
          content: t('Kd0Jml5pgNLY3i64iJtru'),
        },
        {
          title: t('qauKAQI_nufghCfhv_4Ra'),
          content: t('lGli-jUn_2IhCiN9wofaF'),
        },
        {
          title: t('7S0uFiSC9hvg8YazwId2L'),
          content: t('4wqY18pSK2wZ57xl9ExHC'),
        },
      ],
      searchboxHeading: t('WKob2tB4mhUJ1nw7YoJJX'),
    },
  };

  const nearbyAirport = (await globalDataGetter('server', 'nearbyAirport')) || {
    code: null,
  };

  return (
    <div className={styles.container}>
      <SearchboxSection
        activeTab="last-minute-flights"
        header={content[variant].searchboxHeading}
        data={nearbyAirport.code != null ? { origins: [nearbyAirport?.code] } : {}}
      />
      <Suspense>
        <BestDealsSection  />
      </Suspense>

      <TopFlightsSection searchParams={searchParams} />

      <AppDownloadSection />

      <Container className={styles.faqsContainer}>
        <h2 className={styles.faqsHeading}>{content[variant].faqsHeader.heading}</h2>
        <p className={styles.faqsParagraph}>{content[variant].faqsHeader.paragraph}</p>
        <AccordionComponent accordionArray={content[variant].faqs} />
      </Container>
    </div>
  );
};

export default FlightsHome;
