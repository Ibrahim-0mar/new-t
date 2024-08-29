import Container from '@/components/common/base/Container';
import AccordionComponent from '@/components/common/custom/AccordionSSR/AccordionComponent';

import { locale } from '@/navigation';
import { languagesMap } from '@/services/data/languages';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import styles from './page.module.css';

type Props = {
  params: { locale: locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const t = await getTranslations();
  const activeTop = searchParams['active-top'];

  return {
    title: t('EJHcvOY0TI9o0eSWDxjGP'),
    description: t('vwEwW-PtPHyNmk06k7x-q'),
    alternates: {
      canonical: `/${params.locale}${activeTop ? `?active-top=${activeTop}` : ''}`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}${activeTop ? `?active-top=${activeTop}` : ''}`;
        return acc;
      }, {}),
    },
  };
}

export default function HomePage({ params: { locale } }: { params: { locale: locale } }) {
  unstable_setRequestLocale(locale);

  const t = useTranslations();
  const faqs = [
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
  ];

  return (
    <Container className={styles.faqsContainer}>
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>{t('-YGBhKvZZjsTPat4RUH9l')}</h2>
        <p className={styles.sectionParagraph}>{t('tboLvfYNejASHIcoAYZUj')}</p>
      </section>

      <AccordionComponent accordionArray={faqs} />
    </Container>
  );
}
