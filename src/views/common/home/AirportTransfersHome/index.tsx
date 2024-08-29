import Container from '@/components/common/base/Container';
import AccordionComponent from '@/components/common/custom/AccordionSSR/AccordionComponent';
import HowItWorksSection from '@/sections/airport-transfers/HowTravolicWorks';
import TrendingSection from '@/sections/airport-transfers/trendingSection';
import SearchboxSection from '@/sections/common/SearchboxSection';
import { useTranslations } from 'next-intl';
import BlogSection from './components/blogsSection';
import styles from './index.module.css';

const AirportTransfersHome = () => {
  const t = useTranslations();

  const faqs = [
    {
      title: t('ZnTaG3IHEAmB0Avi53HkY'),
      content: t('LCrtMGIdSOP42TL7a5rti'),
    },
    {
      title: t('XWGXxC7XPSFselCsiLk1f'),
      content: t('fR-VqabXhmA31igm4kdhx'),
    },
    {
      title: t('1xvWlFvIvnWfpGmVgw2-v'),
      content: t('Mzxp3jLkV9jBoxijCLp9O'),
    },
    {
      title: t('tgFa7e-2GmrW7B9qUc1vG'),
      content: t('6Ku7ef7YafteCrX0RjBH_'),
    },
    {
      title: t('rrxDAZty2mqZHgVffjxY7'),
      content: t('CQ5i-cFRDDhwNmFp1JDKf'),
    },
    {
      title: t('aNpAriam6kSGBFIohLDLg'),
      content: t('SshVyikmvRyDmxklrnmr5'),
    },
  ];

  return (
    <div>
      <SearchboxSection activeTab="airport-transfers" header={t('K3hlfkDkEpiWOX1Aq421j')} />

      <Container>
        <h1 className={styles.header}>{t('PcRpEzDHP9nkRD9rP8LHy')}</h1>
        <p className={styles.subHeading}>{t('61uMxyfRowQaA-STQLB4Z')}</p>
      </Container>

      <HowItWorksSection />
      <TrendingSection />
      <Container className={styles.faqsContainer}>
        <h2 className={styles.faqsHeading}>{t('-pdT2wsncnOjsytG3r-TO')}</h2>
        <p className={styles.faqsSubHeading}>{t('AjTv3mQg4a-WalYU8NKIk')}</p>
        <AccordionComponent accordionArray={faqs} />
      </Container>
      {process.env.NEXT_PUBLIC_BLOGS_ENABLED === 'true' && <BlogSection />}
    </div>
  );
};

export default AirportTransfersHome;
