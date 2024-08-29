import { commonImgUrl } from '@/utils/helper/imgUrl';
import Image from 'next/image';
import styles from './index.module.css';
import LottieLoader from '@/components/common/base/LottieLoader';
import * as redirectLottie from '@/services/lotties/flights/fromTo.json';
import { useTranslations } from 'next-intl';

const ImagesComponent = ({ agentImageUrl }: { agentImageUrl: string }) => {
  const t = useTranslations();

  return (
    <div className={styles.imagesContainer}>
      <div className={styles.travolicLogoContainer}>
        <Image
          src={commonImgUrl('coloredLogo.png')}
          alt={t('r9gs0vLtvwCfWQehRLQgC')}
          width={135}
          height={0}
          loading="lazy"
        />
      </div>
      <div className={styles.lottieContainer}>
        <LottieLoader animationData={redirectLottie} width={'120%'} />
      </div>
      <div className={styles.agentLogoContainer}>
        <Image
          src={agentImageUrl}
          alt={t('hbTjwP5w_ayYQZcoWzD4B')}
          width={135}
          height={0}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ImagesComponent;
