import style from './index.module.css';
import { Control, Controller } from 'react-hook-form';
import FilterWrapper from '../FilterWrapper';
import RangeSlider from '@/components/common/custom/RangeSlider';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
import { useTranslations } from 'next-intl';

interface PriceFilterProps {
  title: string;
  name: string;
  min: number;
  max: number;
  control: Control<any, any>;
  currency: string;
}

const PriceFilter = ({ control, title, name, min, max, currency }: PriceFilterProps) => {
  const t=useTranslations();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FilterWrapper title={title ? title : t('T7qHvIItseV99BvrLJA5z')}>
          <div className={style.valuesContainer}>
            <span><FormatPrice price={field.value === 'all' ? min : field.value[0]} currency={currency} /> </span>
            <span><FormatPrice price={field.value === 'all' ? max : field.value[1]} currency={currency} /> </span>
          </div>
          <RangeSlider
            value={field.value === 'all' ? [min, max] : field.value}
            onChange={field.onChange}
            title={title}
            min={min}
            max={max}
          />
        </FilterWrapper>
      )}
    />
  );
};

export default PriceFilter;
