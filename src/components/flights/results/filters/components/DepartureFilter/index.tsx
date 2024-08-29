import style from './index.module.css';
import { Control, Controller } from 'react-hook-form';
import RangeSlider from '@/components/common/custom/RangeSlider';
import FormatDate from '@/utils/helper/FormatDateComponent';

interface DepartureFilterProps {
  title: string;
  name: string;
  control: Control<any, any>;
  min: number;
  max: number;
  index: number;
}

const DepartureFilter = ({ control, title, name, min, max, index }: DepartureFilterProps) => {
  const handleChange = (value: number[], field: any) => {
    if (field.value === 'all') {
      field.onChange({ [index]: value });
    } else {
      field.onChange({ ...field.value, [index]: value });
    }
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const isItInitailState = field.value === 'all' || field.value[index] === undefined;
        return (
          <>
            <div className={style.valuesContainer}>
              <span>
                <FormatDate
                  date={isItInitailState ? min : field.value[index][0]}
                  replaceFormatWith={{
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                  }}
                />
              </span>
              <span>
                <FormatDate
                  date={isItInitailState ? max : field.value[index][1]}
                  replaceFormatWith={{
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                  }}
                />
              </span>
            </div>
            <RangeSlider
              value={isItInitailState ? [min, max] : field.value[index]}
              onChange={(e) => handleChange(e, field)}
              title={title}
              min={min}
              max={max}
            />
          </>
        );
      }}
    />
  );
};

export default DepartureFilter;
