'use client';
import styles from './index.module.css';
import FormatDate from '@/utils/helper/FormatDateComponent';

type CustomInputType = {
  value: string | undefined;
  showAddDateText?: boolean;
  showTwoInputs?: boolean;
  handleAddDateClick?: () => void;
};

const DateInput = ({ value }: CustomInputType) => {
  return (
    <div className={styles.dateInputContainer}>
      <span>
        <FormatDate date={value!} />
      </span>
    </div>
  );
};

export default DateInput;
