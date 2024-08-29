import Container from '@/components/common/base/Container';
import { imagesUrl } from '@/utils/config';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import Image from 'next/image';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

const AppDownloadSection = () => {
  const t = useTranslations();

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.appScreenContainer}>
          <Image
            src={imagesUrl + 'common/appScreenshot.png'}
            className="h-full w-full object-cover object-center"
            width={575}
            height={0}
            alt={t('RNwRpXTAwZJLf3D9M-sdX')}
            loading="lazy"
            quality={50}
          />
        </div>
        {/* content section */}

        <div className={styles.contentContainer}>
          <Image
            src={commonImgUrl('coloredLogo.png')}
            width={110}
            height={0}
            className={styles.logo}
            alt={t('lFBbtHy396Muq9ArmFFXL')}
            loading="lazy"
          />

          <h4 className={styles.headerText}>{t('QqZH5ilh7HwGH8u-GGFId')}</h4>

          <ul className={styles.descriptionContinaer}>
            <li className={styles.descriptionText}>
              {t('sJhheFY-LIPbaiEHhp5JF')}
              <span className={styles.highlightedText}> {t('-mjYbn_-waoFGpkX3kb3w')} </span>
              {t('nf1KeMGU8h7T5ziX02n5J')}
            </li>
            <li className={styles.descriptionText}>
              {t('Eh9NNe1H0BUD6mAqktiOn')}
              <span className={styles.highlightedText}> {t('A6_XalLftP8r4uhQx_TK2')} </span>
              {t('Dbfun-3c9lkHWXlwFFoEs')}
            </li>
          </ul>

          <div className={styles.downloadSection}>
            <Image
              src={commonImgUrl('qrCode.png')}
              width={200}
              height={250}
              alt={t('tgHtHzxF7kRfShdYsWz-8')}
              loading="lazy"
            />

            <div className={styles.appleStore}>
              <a href="https://apps.apple.com/us/app/apple-store/id375380948">
                <Image
                  src={commonImgUrl('appleStore.png')}
                  width={160}
                  height={0}
                  alt={t('kSmI-G0tjM57FvZlC3WAF')}
                  loading="lazy"
                />
              </a>
              <div className={styles.dowlnadText}>
                <p>{t('FF5830wSKNPJ6W79AG9F8')}</p>
              </div>
              <a href="https://play.google.com/store/apps/details?id=com.travolic.app">
                <Image
                  src={commonImgUrl('googlePlay.png')}
                  width={160}
                  height={0}
                  alt={t('BSvXD9um-HsdpKvmmYZmh')}
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AppDownloadSection;
