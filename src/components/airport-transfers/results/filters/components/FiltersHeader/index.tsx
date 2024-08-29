'use client';
import Button from '@/components/common/base/Button';
import style from './index.module.css';
import { UseFormReset } from 'react-hook-form';
import { AirportTransfersFilterType } from '@/views/common/results/AirportTransfers/utils/filters';
import { useTranslations } from 'next-intl';

interface FiltersHeaderProps {
  reset: UseFormReset<AirportTransfersFilterType>;
  numberOfCars: string | number;
}

const FiltersHeader = ({ reset, numberOfCars }: FiltersHeaderProps) => {
  const t = useTranslations();

  return (
    <div className={style.container}>
      <div className={style.buttonContainer}>
        <p>{t('hzWkimwDhWS9TLNOCo5tn')}</p>
        <Button aria-label={t('CifSeSk-yn3LsUcveiBu0')} variant="default" onClick={() => reset()}>
          {t('CifSeSk-yn3LsUcveiBu0')}
        </Button>
      </div>
      <p className={style.flightNumber}>{t('erc0L0IZ5h81b8N6p_uQ5',{numbers: numberOfCars}) }</p>
    </div>
  );
};

export default FiltersHeader;
