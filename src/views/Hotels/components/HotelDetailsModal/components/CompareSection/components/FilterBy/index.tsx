import Checkbox from '@/components/common/base/CheckBox';
import styles from './index.module.css';
import { useState } from 'react';

const filters = [
  {
    id: 'freeCancellation',
    text: 'Free cancellation',
  },
  {
    id: 'payOnArrival',
    text: 'Pay on arrival',
  },
  {
    id: 'breakfastIncluded',
    text: 'Breakfast included',
  },
];

const FilterBy = () => {
  const [checked, setChecked] = useState({
    freeCancellation: false,
    breakfastIncluded: false,
    payOnArrival: false,
  });
  return (
    <div className={styles.container}>
      <span className={styles.fitlerBy}>Filter by:</span>
      {filters.map((filter) => (
        <label
          key={filter.id}
          htmlFor={filter.id}
          onClick={() =>
            setChecked((prev) => ({
              ...prev,
              [filter.id]: !prev[filter.id as keyof typeof checked],
            }))
          }
          className={styles.label}
        >
          <Checkbox
            id={filter.id}
            checked={checked[filter.id as keyof typeof checked]}
            className={styles.input}
          />
          <span className={styles.labelText}>{filter.text}</span>
        </label>
      ))}
    </div>
  );
};

export default FilterBy;
