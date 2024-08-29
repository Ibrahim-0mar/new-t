'use client';
import Button from '@/components/common/base/Button';
import style from './index.module.css';
import { UseFormReset } from 'react-hook-form';
import { formatNumber } from '@/utils/helper/numbers';
import { FLightsFilterType } from '@/views/common/results/Flights/utils/filters';
import { cn } from '@/utils/helper/tailwind_cn';
import { useTranslations } from 'next-intl';
import Tooltip from '@/components/common/base/Tooltip';


interface FiltersHeaderProps {
  reset: UseFormReset<FLightsFilterType>;
  selectAll:()=>void;
  numberOfFlights: string | number;
  filteredFlightsNo:string | number;
  mobile?: boolean;

}

const FiltersHeader = ({ reset,selectAll, numberOfFlights,filteredFlightsNo, mobile }: FiltersHeaderProps) => {
  const t= useTranslations();

  return (
    <div className={cn(style.container, mobile && 'bg-seventh px-5 text-white')}>
    
        <p className={style.flightNumber}>
         {t('x1WwP6aw8ES7NS6-8uwZ-',{number:formatNumber(filteredFlightsNo ), totalNumber:formatNumber(numberOfFlights)})}
 
        </p>
        <div className={style.buttonContainer}>
        <Tooltip tooltipBody={t('qzpqSmWCemqhwqxdWVWaC')} className='!w-56'>
        <Button
          aria-label={t('CifSeSk-yn3LsUcveiBu0')}
          variant="default"
          onClick={() => reset()}
          className={style.button}
        >
          {t('CifSeSk-yn3LsUcveiBu0')}
        </Button>
      </Tooltip>
      <Tooltip tooltipBody={t('NnijUHfQGzVeZYpejyj_z')} className='!w-56'>
        <Button
          aria-label={t('KGlvd46qHwAUB0HY5cWXg')} 
          variant="default"
          onClick={() => selectAll()}
          className={style.button}
        >
        {t('KGlvd46qHwAUB0HY5cWXg')}     
       </Button>
       </Tooltip>
      </div>
    </div>
  );
};

export default FiltersHeader;
