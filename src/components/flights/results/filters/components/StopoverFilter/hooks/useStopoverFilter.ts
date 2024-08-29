import { FLightsFilterType } from '@/views/common/results/Flights/utils/filters';
import { useMemo, useState } from 'react';
import { FieldValues, UseFormWatch } from 'react-hook-form';
import { calculateCountriesWithAirports } from '../utils';

// Type for the return object of the useStopoverFilter hook
interface UseStopoverFilterReturnType {
  isShowAll: boolean;
  setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
  countriesWithAirports: { [index: string]: any };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, field: FieldValues, code: string) => void;
  stops: number[];
}

/**
 * Custom hook to handle stopover filtering logic.
 *
 * @param {any[]} stopover - The list of stopovers.
 * @param {UseFormWatch<FLightsFilterType>} watch - The watch function from react-hook-form.
 * @returns {UseStopoverFilterReturnType} - The state and handlers for the stopover filter.
 */
const useStopoverFilter = (
  stopover: any[],
  watch: UseFormWatch<FLightsFilterType>,
): UseStopoverFilterReturnType => {
  // Memoized calculation of countries with their airports
  const countriesWithAirports = useMemo(() => calculateCountriesWithAirports(stopover), [stopover]);

  // State to control the visibility of all stopover options
  const [isShowAll, setShowAll] = useState(false);

  // Watch for changes in the 'stops' field
  const stops: number[] = watch('stops');

  // Handles the change event for the checkbox selection.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: FieldValues,
    code: string,
  ) => {
    const { checked } = e.target;
    if (checked && !field.value?.includes(code)) {
      field.onChange([...field.value, code]);
    } else {
      const updatedArr = field.value.filter((item: string) => item !== code);
      field.onChange(updatedArr);
    }
  };

  return {
    isShowAll,
    setShowAll,
    countriesWithAirports,
    handleChange,
    stops,
  };
};

export default useStopoverFilter;
