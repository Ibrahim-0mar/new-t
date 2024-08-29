import Container from '@/components/common/base/Container';
import AccordionComponent from '@/components/common/custom/AccordionSSR/AccordionComponent';
import { locale } from '@/navigation';
import AppDownloadSection from '@/sections/common/AppDownloadSection';
import SearchboxSection from '@/sections/common/SearchboxSection';
import { languagesMap } from '@/services/data/languages';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import styles from './page.module.css';

type Props = {
  params: { locale: locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('FYrdYc3wuzauBGeTz4OW9'),
    description: t('ZdelOFIJyafaHhoPt_s87'),
    alternates: {
      canonical: `/${params.locale}/luxury-car-rental`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}/luxury-car-rental`;
        return acc;
      }, {}),
    },
    openGraph: {
      title: t('FYrdYc3wuzauBGeTz4OW9'),
      description: t('ZdelOFIJyafaHhoPt_s87'),
      url: `https://travolic.com/${params.locale}/luxury-car-rental`,
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
      title: t('FYrdYc3wuzauBGeTz4OW9'),
      description: t('ZdelOFIJyafaHhoPt_s87'),
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

export default function Page({ params: { locale } }: { params: { locale: locale } }) {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  const faqs = [
    {
      title: t('5cYzg4GbtyiXUP6XxeOyn'),
      content: t('CO165KCfz1oNrqcOxgGML'),
    },
    {
      title: t('7f31HBDWwgkybPBCCSfEg'),
      content: t('DCmTXuGgtGc9v-MRCHbSK'),
    },
    {
      title: t('W0WLP1iLuuGk14ZathoRr'),
      content: t('iXLvot7VHpwuypzARZZO2'),
    },
    {
      title: t('DYmr0hDHvxf_jlSQA1TaX'),
      content: t('UOwpft_eI11y6JRGVQlPl'),
    },
  ];

  return (
    <>
      <SearchboxSection activeTab="luxury-car-rental" header={t('Oju3RsIm7nBD__d-C3gsK')} />
      <Container className={styles.faqsContainer}>
        <h1 className={styles.faqsHeading}>{t('JJo6pOzaSOwOLLEt0EzGN')}</h1>
        <p className={styles.faqsParagraph}>{t('-6FtN75emHU7itVpnR2a-')}</p>
        <AccordionComponent accordionArray={faqs} />
      </Container>
      <AppDownloadSection />
    </>
  );
}
