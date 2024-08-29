import Container from '@/components/common/base/Container';
import AccordionComponent from '@/components/common/custom/AccordionSSR/AccordionComponent';
import { locale } from '@/navigation';
import SearchboxSection from '@/sections/common/SearchboxSection';
import HotelsViewed from '@/sections/hotels/HotelsViewed';
import NearByHotels from '@/sections/hotels/NearByHotels';
import { languagesMap } from '@/services/data/languages';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import styles from './page.module.css';

type Props = {
  params: { locale: locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('r3DG2AkWV1ETElb_pPCdp'),
    description: t('rR5bB4s6qOT6yVJ0KaKCC'),
    alternates: {
      canonical: `/${params.locale}/last-minute-hotels-deals`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}/last-minute-hotels-deals`;
        return acc;
      }, {}),
    },
    openGraph: {
      url: `https://travolic.com/${params.locale}/last-minute-hotels-deals`,
      title: t('r3DG2AkWV1ETElb_pPCdp'),
      description: t('rR5bB4s6qOT6yVJ0KaKCC'),
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
      title: t('r3DG2AkWV1ETElb_pPCdp'),
      description: t('rR5bB4s6qOT6yVJ0KaKCC'),
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

const Hotels = ({ params: { locale } }: { params: { locale: locale } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  const faqs = [
    {
      title: t('y-pmdnk3InkiQFUHxyaZF'),
      content: t('hZHWuS2hC-tU8XCjnm1T0'),
    },
    {
      title: t('-VH4zyFVOlt8ghLGAW06_'),
      content: t('dT3Emv22yNI92hwrN3oZG'),
    },
    {
      title: t('vFqBCjy8hSuuwsaiCSC2C'),
      content: t('1lxaitl5liAGCHnjQ04-e'),
    },
    {
      title: t('D59om5CtLU14Ktv9CyrcN'),
      content: t('HuOQcLofA3M0wOsmKpBWt'),
    },
    {
      title: t('I6YCAtnAZYFLoNdG5Hp9P'),
      content: t('xyZJYlEfBtkiZDLFXWl9H'),
    },
  ];

  return (
    <>
      <Suspense fallback={<div />}>
        <SearchboxSection activeTab="last-minute-hotels-deals" header={'Hotels'} />
      </Suspense>

      <Container>
        <section className={styles.section}>
          <h1 className={styles.sectionHeading}>{t('ohwWBaNoM1Yq5tfTJWr-t')}</h1>
          <p className={styles.sectionParagraph}>{t('y5JQo8Vz_t4DaKlDoU6E0')}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>{t('WjiFbpXnxPl8zGw2x-IoZ')}</h2>
          <p className={styles.sectionParagraph}>{t('DhK-3lrJQXfHtk7hHCsfC')}</p>
        </section>

        <h2 className={styles.sectionHeading}>{t('Y3eDITMsbF2gErMTo9sDC')}</h2>
        <AccordionComponent accordionArray={faqs} />
      </Container>

      <HotelsViewed />
      <NearByHotels />
    </>
  );
};

export default Hotels;
