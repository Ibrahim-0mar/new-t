import { useTranslations } from 'next-intl';
import styles from './index.module.css';
import Container from '@/components/common/base/Container';

const ExploreMore = () => {
  const t = useTranslations();

  return (
    <Container className={styles.Container}>
      <h2 className={styles.heading}>{t('4HVbpWOs10TASU3d5RqHw')}</h2>
      <div className={styles.videoContainer}>
        <iframe
          className={styles.iframe}
          title={t('0JFzRa3ml8cAcoQSw5MJ3')}
          src="https://www.youtube.com/embed/n2CefT1mVwc"
          width={960}
          height={450}
          loading="lazy"
        />
      </div>
    </Container>
  );
};

export default ExploreMore;
