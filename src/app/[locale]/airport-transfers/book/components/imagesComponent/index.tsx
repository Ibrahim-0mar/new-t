import { airportTransfersImgUrl, commonImgUrl } from '@/utils/helper/imgUrl';
import Image from 'next/image';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

const ImagesComponent = ({ agentImageUrl }: { agentImageUrl: string }) => {
  const t = useTranslations();

  return (
    <div className={styles.imagesContainer}>
      <div className={styles.travolicLogoContainer}>
        <Image
          src={commonImgUrl('coloredLogo.png')}
          alt={t('r9gs0vLtvwCfWQehRLQgC')}
          width={window && window.innerWidth < 768 ? 80 : 100}
          height={0}
          loading="lazy"
        />
      </div>

      <Image
        src={airportTransfersImgUrl('redirect.png')}
        alt={t('ipPYWmgavbP8M1JbOkaNE')}
        width={window && window.innerWidth < 768 ? 40 : 60}
        height={0}
        loading="lazy"
      />

      <div className={styles.agentLogoContainer}>
        <Image
          src={agentImageUrl}
          alt={t('hbTjwP5w_ayYQZcoWzD4B')}
          width={window && window.innerWidth < 768 ? 80 : 100}
          height={0}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ImagesComponent;
