import Container from '@/components/common/base/Container';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import Image from 'next/image';
import SendingMessage from './components/sendingMessage/SendingMessage';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

const ContactUs = () => {
  const t = useTranslations();
  return (
    <>
      <Container>
        <div className={styles.header}>
          <Image
            src={commonImgUrl('contact-us.svg')}
            alt={t('gLApj2fOg5jA-HhD-_LSu')}
            width={639}
            height={0}
            priority
          />
          <h1>{t('za5nNJ__33xcaUtnSZPs5')}</h1>
        </div>
      </Container>
      <div className={styles.disclaimer}>
        <Image
          src={commonImgUrl('message.svg')}
          alt={t('BLDquRQXNjbYtRVJJ4myd')}
          width={350}
          height={0}
          loading="lazy"
        />
        <div>
          <p>{t('ihMgYUxlUgu6HSBOMhJG1')}</p>
          <p>{t('1fWli7TvbIG-NuABJcV9O')}</p>
        </div>
      </div>
      <SendingMessage />
    </>
  );
};

export default ContactUs;
