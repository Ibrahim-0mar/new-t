import style from './index.module.css';
import { Control, Controller } from 'react-hook-form';
import { formatDuration } from '@/utils/helper/dates';
import FilterWrapper from '../FilterWrapper';
import RangeSlider from '@/components/common/custom/RangeSlider';
import { useLocale, useTranslations } from 'next-intl';
import { locale } from '@/navigation';

interface DurationFilterProps {
  title: string;
  name: string;
  control: Control<any, any>;
  min: number;
  max: number;
}

const DurationFilter = ({ control, title, name, min, max }: DurationFilterProps) => {
  const locale = useLocale() as locale;
  const t=useTranslations();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FilterWrapper title={t('qkADLkhMtIeF8FGab82gE')}>
          <div className={style.valuesContainer}>
            <span>{formatDuration(field.value === 'all' ? min : field.value[0], locale)}</span>
            <span>{formatDuration(field.value === 'all' ? max : field.value[1], locale)}</span>
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

export default DurationFilter;
