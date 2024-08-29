'use client';

import DatePicker from '@/components/common/custom/DatePicker/DatePicker';
import '@/utils/lib/datepicker/DesktopDatePicker.css';
import dayjs from 'dayjs';
import React, { forwardRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import HotelCustomInput from './components/CustomInput';
import styles from './index.module.css';

interface CustomInputProps {
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddDateClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const DatesInput = ({
  isRange,
  showTwoInputs,
  field,
  handleAddDateClick,
}: {
  field: any;
  handleAddDateClick: any;
  isRange?: boolean;
  showTwoInputs?: boolean;
}) => {
  const updateDepartureDate = (date: Date) => {
    field.onChange([date, field.value[1]]);
    if (dayjs(date).isAfter(field.value[1])) {
      field.onChange([date, dayjs(date).add(7, 'days').toDate()]);
    }
  };

  const CustomInputs = forwardRef<HTMLDivElement, CustomInputProps>(({ value, onClick }, ref) => {
    return (
      <div
        className={styles.datesContainer}
        ref={ref}
        onClick={(e) => {
          onClick?.(e);
        }}
      >
        <HotelCustomInput
          value={value?.split('-')[0]}
          updateHandler={(date: Date) => updateDepartureDate(date)}
          minDate={dayjs().toDate()}
          showAddDateText={false}
          showTwoInputs={showTwoInputs}
        />
        {isRange || showTwoInputs ? (
          <HotelCustomInput
            value={isRange ? value?.split('-')[1] : undefined}
            updateHandler={(date: Date) => field.onChange([field.value[0], date])}
            minDate={dayjs(field.value[0]).toDate()}
            showAddDateText={showTwoInputs}
            showTwoInputs={showTwoInputs}
            handleAddDateClick={handleAddDateClick}
          />
        ) : null}
      </div>
    );
  });
  CustomInputs.displayName = 'CustomInputs';
  const onChange = (dates: Date | null | [Date | null, Date | null]) => {
    if (isRange && Array.isArray(dates)) {
      const [start, end] = dates;
      field.onChange([start, end]);
    } else {
      field.onChange([dates, null]);
    }
  };

  return (
    <div className={styles.datePickerContainer}>
      <DatePicker
        className="w-full"
        selected={field.value[0]}
        onChange={(date) => onChange(date)}
        selectsStart
        startDate={field.value[0]}
        endDate={isRange ? field.value[1] : null}
        customInput={<CustomInputs />}
        monthsShown={2}
        calendarClassName={styles.calendarContainer}
        monthClassName={() => styles.monthClassName}
        dayClassName={() => styles.dayClassName}
        minDate={dayjs().toDate()}
        selectsRange={isRange}
        closeOnScroll={false}
      />
    </div>
  );
};

export default DatesInput;
