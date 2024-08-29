import Container from '@/components/common/base/Container';
import Section from '@/components/common/custom/detailsSection';
// import BestHotelsSection from '../../sections/bestHotels';
// import CarRentalSection from '../../sections/carRentalsSection';
import styles from './index.module.css';
import EvisaFaqsSection from './sections/faqs';
import { useTranslations } from 'next-intl';

const Evisa = () => {
  const t = useTranslations();

  return (
    <Container className={styles.container}>
      <Section
        title={t('wVdJwOm466FkbOjWdk1th')}
        imgUrl={'visa.jpg'}
        content={t.rich('vEcG9WU2hyG6xIshtQQ4F', { br: () => <br /> })}
        isReversed
      />
      <EvisaFaqsSection />
      {/* <h2 className={styles.continueYourTrip}>{continueYourTrip}</h2> */}
      {/* <BestHotelsSection /> */}
      {/* <CarRentalSection /> */}
    </Container>
  );
};

export default Evisa;
