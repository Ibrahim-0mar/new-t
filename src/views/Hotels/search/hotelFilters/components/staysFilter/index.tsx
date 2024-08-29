
import FilterWrapper from '@/components/airport-transfers/results/filters/components/FilterWrapper';
import Button from '@/components/common/base/Button';
import Checkbox from '@/components/common/base/CheckBox';
import { cn } from '@/utils/helper/tailwind_cn';
import styles from './index.module.css';

const stayes = [
  {
    id: 'hotels',
    name: 'Hotels',
    count: 470,
    details: 'Includes hotels, hostels, resorts, and more',
  },
  {
    id: 'rentals',
    name: 'Rentals',
    count: 567,
    details: 'Includes apartments, holiday homes, cottages, and more',
  },
  {
    id: 'uniqueStays',
    name: 'Unique Stays',
    count: 4,
    details: 'Includes compgrounds, treeehouses, castles, and more',
  },
];

const StaysFilter = () => {
  return (
    <FilterWrapper className={styles.wrapper} title="Type of stay">
      <div className='space-y-3'>
        {stayes.map((item) => (
          <div key={item.id}>
            <label htmlFor={item.id} className={cn('group', styles.label)}>
              <div className={styles.checkBoxContainer}>
                <Checkbox id={item.id} type="checkbox" />
                <span>{item.name}</span>
                <Button
                  variant="default"
                  className={cn('group-hover:inline-block', styles.onlyButton)}

                >
                  Only
                </Button>
              </div>
              <span className={styles.count}>{item.count}</span>
            </label>
            <p className={styles.details}>{item.details}</p>
          </div>
        ))}
      </div>
    </FilterWrapper >
  );
};

export default StaysFilter;
