'use client';
import FilterWrapper from '@/components/airport-transfers/results/filters/components/FilterWrapper';
import Button from '@/components/common/base/Button';
import { cn } from '@/utils/helper/tailwind_cn';
import { useState } from 'react';
import styles from './index.module.css';

const scores = ['0+', '6+', '7+', '8+', '9+'];
type ScoresType = (typeof scores)[number];

const ReviewScoreFilter = () => {
  const [activeScore, setActiveScore] = useState<ScoresType>(scores[0]);
  return (
    <FilterWrapper className={styles.wrapper} title="Review Score">
      <div className={styles.scoresContainer}>
        {scores.map((score, index) => (
          <Button
            key={index}
            variant="default"
            className={cn(
              styles.scoreBtn,
              activeScore === score && styles.activeScore,
            )}
            onClick={() => setActiveScore(score as ScoresType)}
          >
            {score}
          </Button>
        ))}
      </div>
    </FilterWrapper>
  );
};

export default ReviewScoreFilter;
