
import FilterWrapper from '@/components/airport-transfers/results/filters/components/FilterWrapper';
import Button from '@/components/common/base/Button';
import Checkbox from '@/components/common/base/CheckBox';
import { cn } from '@/utils/helper/tailwind_cn';
import styles from './index.module.css';

const FreebiesFilter = () => {
  const freebies = [
    { id: 'allInclusive', name: 'All-inclusive', count: 0 },
    { id: 'freebreakfast', name: 'Free breakfast', count: 3 },
    { id: 'freeCancellation', name: 'Free cancellation', count: 3 },
    { id: 'freeParking', name: 'Free parking', count: 3 },
    { id: 'freeWifi', name: 'Free wifi', count: 3 },
  ];

  return (
    <FilterWrapper className={styles.wrapper} title="Freebies">
      <div className='space-y-2'>
        {freebies.map((freebie, index) => (
          <label
            key={freebie.id}
            htmlFor={freebie.id}
            className={cn('group', styles.label, index === 0 && styles.inActive)}
          >
            <span className={styles.checkBoxContainer}>
              <Checkbox id={freebie.id} type="checkbox" disabled={index === 0} />{' '}
              {freebie.name}
              {index !== 0 && (
                <Button
                  variant="default"
                  className={cn('group-hover:inline-block', styles.onlyButton)}
                // onClick={() => field.onChange()}
                >
                  Only
                </Button>
              )}
            </span>
            <span className={styles.count}>{freebie.count}</span>
          </label>
        ))}
      </div>
    </FilterWrapper>
  );
};

export default FreebiesFilter;
