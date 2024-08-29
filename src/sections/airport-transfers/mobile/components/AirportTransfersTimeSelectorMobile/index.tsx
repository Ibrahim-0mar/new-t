'use client';
import dayjs from 'dayjs';
import { ControllerRenderProps } from 'react-hook-form';
import styles from './index.module.css';
import './utils/custom-timepicker.css';
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
          <div className="flex w-full items-center justify-center">
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
      </div>
    </>
  );
};

export default AirportTransfersTimeSelectorMobile;
