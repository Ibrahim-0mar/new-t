import { commonImgUrl } from '@/utils/helper/imgUrl';
import Image from 'next/image';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

const NotFoundPage = () => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <Image
        src={commonImgUrl('404.svg')}
        alt={t('QoCB1C9lGM3xYQYf4J2Zm')}
        width={400}
        height={0}
        priority={true}
      />
    </div>
  );
};

export default NotFoundPage;
