import { commonImgUrl } from '@/utils/helper/imgUrl';
import Image from 'next/image';
import ContactForm from '../contactForm/contactForm';
import styles from './index.module.css';
import Container from '@/components/common/base/Container';
import { useTranslations } from 'next-intl';

const SendingMessage = () => {
  const t = useTranslations();

  return (
    <Container>
      <div className={styles.container}>
        <Image
          src={commonImgUrl('send-message-bg.svg')}
          alt={t('3Hz80Nl7aChxNlQoBjc3E')}
          width={450}
          height={0}
          loading="lazy"
        />
        <div className={styles.messagingDetails}>
          <Image
            src={commonImgUrl('send-message-bg.svg')}
            alt={t('3Hz80Nl7aChxNlQoBjc3E')}
            width={400}
            height={0}
            loading="lazy"
          />
          <h2>{t('x5wslXZCjR-BY_RHuDfBM')}</h2>
          <p>
            {t('JOzVUh4l6kJBaZ6woti7U')}
            <span>{t('qyZI69BO5HQ2-O_iXx5Qi')}</span> {t('NEvyf4LRUFgoHpveTnZ9t')}{' '}
            <span>{t('2M0agmuHB7Jaoos761Hrt')}</span> info@travolic.com
          </p>
        </div>
        <ContactForm />
      </div>
    </Container>
  );
};

export default SendingMessage;
