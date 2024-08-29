'use client';
import { cn } from '@/utils/helper/tailwind_cn';
import { language } from '@/utils/types/common';
import Image from 'next/image';
import { FunctionComponent, Suspense } from 'react';
import Modal from '../../base/Modal';

import styles from './index.module.css';

import RegionInputs from './components/RegionInputs';
import { backendImagesUrl } from '@/utils/config';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import Button from '../../base/Button';
import { handleOpenModal } from '@/utils/modals';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';

type RegionModalProps = {
  language: language;
  country: CountryType | null;
  currency: CurrencyType | null;
  btnBg?: boolean;
};

const RegionModal: FunctionComponent<RegionModalProps> = ({
  language,
  country,
  currency,
  btnBg = false,
}) => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultFlag = backendImagesUrl + '/public/images/flags/us.svg';
  const countryFlag = backendImagesUrl + `/public/images/flags/${country?.code?.toLowerCase()}.svg`;
  return (
    <div className={styles.container}>
      <Button
        className={cn(styles.regionButton, btnBg && styles.regionButtonBg)}
        variant="default"
        onClick={() => handleOpenModal('regionmodal', searchParams, router)}
      >
        {country ? (
          <Image
            src={country?.code ? countryFlag : defaultFlag}
            alt={t('amYU-eUKHfZmgN1ZqAsbN')}
            className={styles.flag}
            width={20}
            height={0}
          />
        ) : (
          <div className={styles.placeholder} />
        )}
        <span className={styles.languageText}>
          {language?.code ? language?.code.toUpperCase() : 'EN'}
        </span>
        {currency ? (
          <span className={styles.countryText}>{currency?.code ? currency?.code : 'USD'}</span>
        ) : (
          <div className={styles.placeholder} />
        )}
      </Button>

      {/* This Suspense wrapper is used because this component contains useSearchParams, and this practise is used to prevent all site pages from deopted to client-side rendering*/}
      <Suspense fallback={<div />}>
        <Modal id="region" disableIcon>
          <Image
            src={commonImgUrl('coloredLogo.png')}
            alt={t('jpfnq7PrnrlgPnrJdgd06')}
            className={styles.regionImage}
            width={150}
            height={0}
            priority
          />

          <RegionInputs language={language} country={country} currency={currency} />
        </Modal>
      </Suspense>
    </div>
  );
};

export default RegionModal;
