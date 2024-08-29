import React, { forwardRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './index.module.css';
import DateInput from './components/DateInput';
import '@/utils/lib/datepicker/DesktopDatePicker.css';
import dayjs from 'dayjs';
import TimeSelectPopup from '@/components/common/custom/TimeSelectPopup';
import { Dot } from 'lucide-react';
import DatePicker from '@/components/common/custom/DatePicker/DatePicker';

interface CustomInputProps {
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddDateClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  timeValue?: any;
  isTimeOpen?: any;
  setIsTimeOpen?: any;
  onChangeTime?: any;
}

const DateTimeInputs = forwardRef<HTMLDivElement, CustomInputProps>(
  ({ value, onClick, timeValue, onChangeTime, isTimeOpen, setIsTimeOpen }, ref) => {
    return (
      <div className={styles.datesContainer} ref={ref} onClick={onClick}>
        <DateInput value={value} />
        <Dot />
        <TimeSelectPopup
          value={timeValue}
          onChange={onChangeTime}
          open={isTimeOpen}
          setOpen={setIsTimeOpen}
        />
      </div>
    );
  },
);

const DateAndTimeInput = ({ field }: { field: any }) => {
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const onChangeTime = (time: Date) => {
    field.onChange(time);
  };
  DateTimeInputs.displayName = 'DateInput';
  const onChange = (dates: Date | null | [Date | null, Date | null]) => {
    field.onChange(dates);
  };
  return (
    <div className={styles.container}>
      <DatePicker
        selected={field.value}
        onChange={(date) => {
          onChange(date);
        }}
        customInput={
          <DateTimeInputs
            onChangeTime={onChangeTime}
            timeValue={field.value}
            isTimeOpen={isTimeOpen}
            setIsTimeOpen={setIsTimeOpen}
          />
        }
        monthsShown={2}
        calendarClassName={styles.calendarContainer}
        monthClassName={() => styles.monthClassName}
        dayClassName={() => styles.dayClassName}
        minDate={dayjs().toDate()}
        selectsRange={false}
        closeOnScroll={false}
        shouldCloseOnSelect={true}
        onSelect={() => setIsTimeOpen(!isTimeOpen)}
        showTimeInput={false}
        timeFormat="HH:mm"
      />
    </div>
  );
};

export default DateAndTimeInput;
