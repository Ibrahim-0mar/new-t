'use client';
import { ControllerRenderProps } from 'react-hook-form';
import './utils/custom-timepicker.css';
import styles from './index.module.css';
import dayjs from 'dayjs';
import DatePicker from '@/components/common/custom/DatePicker/DatePicker';

interface DatesSelectorMobileProps {
  field: ControllerRenderProps<any, any>;
}

const AirportTransfersTimeSelectorMobile = ({ field }: DatesSelectorMobileProps) => {
  const { onChange, value } = field;

  return (
    <>
      <div className={styles.datesContainer}>
        <div className={styles.dateInput} id="transfers-timeContainer">
          <DatePicker
            selected={dayjs(value).toDate()}
            onChange={onChange}
            inline
            timeCaption=""
            showTimeInput={true}
            showTimeSelectOnly
          />
        </div>
      </div>
    </>
  );
};

export default AirportTransfersTimeSelectorMobile;
