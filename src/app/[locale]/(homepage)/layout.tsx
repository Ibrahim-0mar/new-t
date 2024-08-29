import Container from '@/components/common/base/Container';
import { locale } from '@/navigation';
import AppDownloadSection from '@/sections/common/AppDownloadSection';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';
import styles from './page.module.css';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import SearchboxSection from '@/sections/common/SearchboxSection';

type HomeLayout = {
  children: React.ReactNode;
  TopFlightsSection: React.ReactNode;
  BestDealsSection: React.ReactNode;
  params: { locale: locale };
};



export default async function HomeLayout({
  children,
  TopFlightsSection,
  BestDealsSection,
  params: { locale },
}: HomeLayout) {
  unstable_setRequestLocale(locale);

  const [t, nearbyAirport] = await Promise.all([
    getTranslations().catch(() => () => null),
    globalDataGetter('server', 'nearbyAirport')
      .then((airport: any) => airport ?? { code: null })
      .catch(() => {
        return { code: null };
      }),
  ]);

  return (
    <div className={styles.container}>
      <SearchboxSection
        activeTab="last-minute-flights"
        header={t('WKob2tB4mhUJ1nw7YoJJX')}
        data={nearbyAirport.code != null ? { origins: [nearbyAirport?.code] } : {}}
      />
      <Container>
        <section className={styles.section}>
          <h1 className={styles.sectionHeading}>{t('Iuqc-gwMMWsGMxuTXXNn6')}</h1>
          <p className={styles.sectionParagraph}>{t('IUcCcoJzn_86yq1gpqsRK')}</p>
        </section>
      </Container>

      {BestDealsSection}
      <AppDownloadSection />
      {TopFlightsSection}
      {children}
    </div>
  );
}
