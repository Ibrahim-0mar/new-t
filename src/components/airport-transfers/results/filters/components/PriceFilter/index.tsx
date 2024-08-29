import style from './index.module.css';
import { Control, Controller } from 'react-hook-form';
import FilterWrapper from '../FilterWrapper';
import RangeSlider from '@/components/common/custom/RangeSlider';
import FormatPrice from '@/utils/helper/FormatPriceComponent';

interface PriceFilterProps {
  title: string;
  name: string;
  min: number;
  max: number;
  control: Control<any, any>;
  currency: string;
}

const PriceFilter = ({ control, title, name, min, max, currency }: PriceFilterProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FilterWrapper title={title ? title : 'Prices'}>
          <div className={style.valuesContainer}>
            <span>
              <FormatPrice
                price={field.value === 'all' ? min : field.value[0]}
                currency={currency}
              />
            </span>
            <span>
              <FormatPrice
                price={field.value === 'all' ? min : field.value[1]}
                currency={currency}
              />
            </span>
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
