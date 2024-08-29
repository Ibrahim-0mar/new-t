import { commonImgUrl } from '@/utils/helper/imgUrl';
import Image from 'next/image';
import ExploreMore from './components/exploreMore/ExploreMore';
import OurVision from './components/ourVision/OurVision';
import WhatWeDo from './components/whatWeDo/WhatWeDo';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

const AboutUs = () => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div className={styles.sectionsContainer}>
        <Image
          src={commonImgUrl('about-us-header.png')}
          alt={t('q19zAopCy34gRTM-7ajVF')}
          width={1200}
          height={0}
          priority
          layout="intrinsic"
        />
        <WhatWeDo />
        <ExploreMore />
        <OurVision />
      </div>
    </div>
  );
};

export default AboutUs;
