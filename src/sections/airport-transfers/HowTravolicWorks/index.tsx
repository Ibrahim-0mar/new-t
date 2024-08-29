import Container from '@/components/common/base/Container';
import { airportTransfersImgUrl } from '@/utils/helper/imgUrl';
import Image from 'next/image';
import style from './index.module.css';
import { useTranslations } from 'next-intl';

function HowItWorksSection() {
  const t = useTranslations();

  return (
    <Container className={style.container}>
      <div className={style.banner}>
        <div className={style.pragraph}>
          <div className={style.iconContainer}>
            <Image
              src={airportTransfersImgUrl('transfersClock.svg')}
              width={50}
              height={50}
              className={style.icon}
              alt={t('GMg-_eyZJpXyvWAiDZWKx')}
            />
          </div>
          <h3 className={style.pragraphHeader}>{t('_aOUxqM-WVP2Rf_ofEzKS')}</h3>
          <p className={style.text}>
            {t.rich('fipsT55zdQyH0pVfvZwDJ', {
              br: () => <br />,
            })}
          </p>
        </div>

        <div className={style.pragraph}>
          <div className={style.iconContainer}>
            <Image
              src={airportTransfersImgUrl('transfersWorld.svg')}
              width={50}
              height={50}
              className={style.icon}
              alt={t('GMg-_eyZJpXyvWAiDZWKx')}
            />
          </div>

          <h3 className={style.pragraphHeader}>{t('yBchCnK4UjO1pncA87_l-')}</h3>
          <p className={style.text}>{t('3HD5pbmJrVVGBHNRNU9PJ')}</p>
        </div>
        <div className={style.pragraph}>
          <div className={style.iconContainer}>
            <Image
              src={airportTransfersImgUrl('transfersMoney.svg')}
              width={50}
              height={50}
              className={style.icon}
              alt={t('GMg-_eyZJpXyvWAiDZWKx')}
            />
          </div>
          <h3 className={style.pragraphHeader}>{t('HMwJxGirs6fv5451Ebp62')}</h3>
          <p className={style.text}>{t('te1I_LgrEo_KefHG2y7Bi')}</p>
        </div>
      </div>
    </Container>
  );
}
export default HowItWorksSection;
