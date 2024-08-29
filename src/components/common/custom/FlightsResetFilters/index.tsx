'use client';
import Image from 'next/image';
import styles from './index.module.css';
import Button from '../../base/Button';
import { useTranslations } from 'next-intl';
import Tooltip from '../../base/Tooltip';

type FlightsResetFiltersType = {
  imageSrc: string;
  handleClear: () => void;
  handleSelectAll: () => void;
  errorMessage?: string;
  buttonText?: string;
};
const FlightsResetFilters = ({
  imageSrc,
  handleClear,
  errorMessage,
  buttonText,
  handleSelectAll
}: FlightsResetFiltersType) => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <Image src={imageSrc} height={0} width={300} alt="clear filters icon" />
      <p className={styles.text}>{errorMessage || t('-jK5vP2qFkRAyKlqEN9bS')}</p>
      <div className={styles.buttonsContainer}>
        <Tooltip tooltipBody={t('qzpqSmWCemqhwqxdWVWaC')} className="!w-56 mt-4">
          <Button variant="secondary" className={styles.button} onClick={() => handleClear()}>
            {buttonText || t('J4i4zCcRUCPKRIp0xyyGh')}
          </Button>
        </Tooltip>

        <Tooltip tooltipBody={t('NnijUHfQGzVeZYpejyj_z')} className="!w-56 mt-4">
          <Button variant="secondary" className={styles.button} onClick={() => handleSelectAll()}>
            {t('WvnK1606goYuFcS4jr1_b')}
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
export default FlightsResetFilters;
