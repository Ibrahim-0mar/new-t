import { debounce } from 'lodash';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useCallback, useEffect, useState } from 'react';

interface RangeSliderProps {
  value: [number, number];
  onChange: (...event: any[]) => void;
  min: number;
  max: number;
  title: string;
}

const RangeSlider = ({ value, onChange, title, min, max }: RangeSliderProps) => {
  const [localValue, setLocalValue] = useState(value);

  const debouncedOnChange = useCallback(
    debounce(onChange, 100), // Adjust debounce time as needed
    [onChange],
  );

  const handleSliderChange = (newValue: any) => {
    setLocalValue(newValue); // Update local state immediately for responsiveness
    debouncedOnChange(newValue); // Debounce the external onChange callback
  };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <Slider
      range
      allowCross={false}
      min={min}
      max={max}
      value={localValue} // Use local state for the slider value
      onChange={handleSliderChange}
      trackStyle={[{ backgroundColor: '#2ba6de' }]}
      handleStyle={[
        {
          backgroundColor: 'white',
          borderColor: '#2ba6de',
          borderWidth: 4,
          zIndex: 0,
        },
        {
          backgroundColor: 'white',
          borderColor: '#2ba6de',
          borderWidth: 4,
          zIndex: 0,
        },
      ]}
      ariaLabelForHandle={[`${title} from`, `${title} to`]}
    />
  );
};

export default RangeSlider;
