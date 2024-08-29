'use client';
import { Link, locale } from '@/navigation';
import { defaultCurrency } from '@/services/data/common';
import { languagesMap } from '@/services/data/languages';
import { backendImagesUrl } from '@/utils/config';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import { cn } from '@/utils/helper/tailwind_cn';
import { AlignJustify, Bus, Car, CreditCard, Dot, Hotel, Plane, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import styles from './index.module.css';
import { useRegionContext } from '@/utils/lib/providers/RegionProvider/RegionProvider';

export default function SideMenu() {
  const locale = useLocale() as locale;
  const t = useTranslations();

  const { dispatch } = useRegionContext();

  const [isOpened, setIsOpened] = useState(false);
  const language = languagesMap.find((l) => l.code === locale);
  const currency = globalDataGetter('client', 'currency') || defaultCurrency;
  const country = globalDataGetter('client', 'country');

  const defaultFlag = backendImagesUrl + '/public/images/flags/us.svg';
  const countryFlag = backendImagesUrl + `/public/images/flags/${country?.code?.toLowerCase()}.svg`;

  const openRegionModal = () => {
    setIsOpened(false);
    dispatch({ type: "SET_REGION_MODAL", payloud: true });
  };

  return (
    <div>
      <button className={styles.menuButton} onClick={() => setIsOpened(true)}>
        <AlignJustify size={28} className={styles.menuIcon} />
      </button>
      {isOpened && (
        <div className={cn(styles.menuContainer, true && styles.menuAnimate)}>
          <div className={styles.headerContainer}>
            <Image
              src={commonImgUrl('coloredLogo.png')}
              alt={t('gDkeBsrChlnpDbwnEsOWs')}
              width={100}
              height={100}
            />
            <X onClick={() => setIsOpened(false)} />
          </div>

          <div className={styles.menuContent}>
            <ul>
              {process.env.NEXT_PUBLIC_FLIGHTS_ENABLED === 'true' && (
                <li>
                  <Link
                    className={styles.menuItem}
                    href={'/last-minute-flights'}
                    onClick={() => setIsOpened(false)}
                  >
                    <Plane size={18} className={styles.icon} /> {t('f4Y_o_qrRxXHsasCcDCXX')}
                  </Link>
                </li>
              )}
              {process.env.NEXT_PUBLIC_TRANSFERS_ENABLED === 'true' && (
                <li>
                  <Link
                    className={styles.menuItem}
                    href={'/airport-transfers'}
                    onClick={() => setIsOpened(false)}
                  >
                    <Bus size={18} className={styles.icon} /> {t('6KtvWy7kx6ur7fmcMZboX')}
                  </Link>
                </li>
              )}
              {process.env.NEXT_PUBLIC_HOTELS_ENABLED === 'true' && (
                <li>
                  <Link
                    className={styles.menuItem}
                    href={'/last-minute-hotels-deals'}
                    onClick={() => setIsOpened(false)}
                  >
                    <Hotel size={18} className={styles.icon} /> {t('NJ-1JLVLFxFl29jtY5L6X')}
                  </Link>
                </li>
              )}
              {process.env.NEXT_PUBLIC_CAR_RENTAL_ENABLED === 'true' && (
                <li>
                  <Link
                    className={styles.menuItem}
                    href={'/luxury-car-rental'}
                    onClick={() => setIsOpened(false)}
                  >
                    <Car size={18} className={styles.icon} /> {t('Tx8qeKeCJyQiIFJKAThX8')}
                  </Link>
                </li>
              )}
              {process.env.NEXT_PUBLIC_EVISA_ENABLED === 'true' && (
                <li>
                  <Link
                    className={styles.menuItem}
                    href={'/evisa'}
                    onClick={() => setIsOpened(false)}
                  >
                    <CreditCard size={18} className={styles.icon} /> {t('kzkj65NkxyTQLa0O46E2A')}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <button onClick={openRegionModal} className={cn(styles.regionButton)}>
            <Image
              src={country?.code ? countryFlag : defaultFlag}
              alt={t('amYU-eUKHfZmgN1ZqAsbN')}
              className={styles.flag}
              width={20}
              height={0}
            />
            <span className={styles.regiontext}>{country?.name ? country?.name : ''}</span>
            <Dot />
            <span className={styles.regiontext}>{language?.name ? language?.name : 'English'}</span>
            <Dot />
            <span className={styles.regiontext}>{currency?.code ? currency?.code : 'USD'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
