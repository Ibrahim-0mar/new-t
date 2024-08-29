'use client';

import Button from '../../base/Button';
import styles from './index.module.css';
import Image from 'next/image';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import globalDataSetter from '@/utils/helper/cookies/globalDataSetter';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/helper/tailwind_cn';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function Cookies() {
  const t = useTranslations();

  const [show, setShow] = useState(false);

  const cookiesAccepted = globalDataGetter('client', 'cookiesAccepted');

  useEffect(() => {
    const timerId = setTimeout(() => setShow(true), 3000);

    return () => clearTimeout(timerId);
  }, []);

  function handleClick() {
    globalDataSetter('cookiesAccepted', true);
    setShow(false);
  }

  if (cookiesAccepted) return null;

  return (
    <div className={cn(styles.cookiesContainer, show && '!translate-y-0')}>
      <Image
        src={commonImgUrl('cookies.svg')}
        alt={t('zIZe4_kUyL4OtL0IrnOYc')}
        width={90}
        height={90}
      />
      <p className={styles.headline}>{t('zIZe4_kUyL4OtL0IrnOYc')}</p>
      <p className={styles.description}>
        {t('P5tkha9BTi944OJjQbLhc')} {t('5I_A1J_7KTUgpStRfzEwH')}{' '}
        <Link href="/terms-and-conditions" className={styles.link}>
          {t('tWsgCZ4d2oFUBbDH7M2Ft')}
        </Link>
      </p>
      <Button className={styles.button} onClick={handleClick}>
        {t('4wG6Npr2vIpf7B0zMPn5O')}
      </Button>
    </div>
  );
}
