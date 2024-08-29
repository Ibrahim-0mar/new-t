import FilterWrapper from '@/components/airport-transfers/results/filters/components/FilterWrapper';
import RangeSlider from '@/components/common/custom/RangeSlider';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
import { useTranslations } from 'next-intl';
import { Control, Controller } from 'react-hook-form';
import style from './index.module.css';

interface HotelPriceFilterProps {
  title: string;
  name: string;
  min: number;
  max: number;
  control: Control<any, any>;
  currency: string;
}

const HotelPriceFilter = ({ control, title, name, min, max, currency }: HotelPriceFilterProps) => {
  const t = useTranslations();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FilterWrapper className={style.wrapper} title={title ? title : t('T7qHvIItseV99BvrLJA5z')}>
          <div className='px-1.5'>
            <RangeSlider

              value={field.value === 'all' ? [min, max] : field.value}
              onChange={field.onChange}
              title={title}
              min={min}
              max={max}
            />
          </div>
          <div className={style.valuesContainer}>
            <span><FormatPrice price={field.value === 'all' ? min : field.value[0]} currency={currency} /> </span>
            <span><FormatPrice price={field.value === 'all' ? max : field.value[1]} currency={currency} /> </span>
          </div>
        </FilterWrapper>
      )}
    />
  );
};

export default HotelPriceFilter;
