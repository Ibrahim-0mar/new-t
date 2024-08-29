'use client';

import FilterWrapper from '@/components/airport-transfers/results/filters/components/FilterWrapper';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import styles from './index.module.css';

const stars = [...Array(5)];

const HotelClassFilter = () => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

  const [rating, setRating] = useState<number>(0);

  const handleClick = (starValue: number) => {
    if (rating === starValue) setRating(0);
    else {
      setRating(starValue);
    }
  };

  return (
    <FilterWrapper className={styles.wrapper} title="Hotel class">
      <div className={styles.starsContainer}>
        {stars.map((_, index) => (
          <Icon
            key={index}
            icon="mingcute:star-fill"
            width="30"
            height="30"
            style={{
              color:
                (hoverValue ? hoverValue - 1 : undefined || rating!) > index - 1
                  ? '#2BA6DE'
                  : '#c4c4c4',
            }}
            onMouseEnter={() => setHoverValue(index + 1)}
            onMouseLeave={() => setHoverValue(undefined)}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </FilterWrapper>
  );
};

export default HotelClassFilter;
