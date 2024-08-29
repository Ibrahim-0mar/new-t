'use client';
import Button from '@/components/common/base/Button';
import { cn } from '@/utils/helper/tailwind_cn';
import dayjs from 'dayjs';
import { CalendarDays } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ControllerRenderProps, UseFormSetValue } from 'react-hook-form';
import { OpenedMenuTypes } from '../..';
import './custom-datepicker.css';
import styles from './index.module.css';
import useBodyScrollLock from '@/utils/hooks/useBodyScrollLock';

import { useTranslations } from 'next-intl';
import DatePicker from '@/components/common/custom/DatePicker/DatePicker';
import FormatDate from '@/utils/helper/FormatDateComponent';

interface DatesSelectorMobileProps {
  field: ControllerRenderProps<any, any>;
  openedMenu: string;
  setOpenedMenu: Dispatch<SetStateAction<OpenedMenuTypes>>;
  showTwoInputs?: boolean;
  setValue: UseFormSetValue<any>;
  tripType: 'one-way' | 'round-trip' | 'multi-city';
}

const DatesSelectorMobile = ({
  field,
  openedMenu,
  setOpenedMenu,
  showTwoInputs,
  setValue,
  tripType: activeType,
}: DatesSelectorMobileProps) => {
  const t = useTranslations();

  const { onChange, value } = field;
  const isRange = activeType === 'round-trip';
  const [selectedDates, setSelectedDates] = useState(value);
  const { lockBodyScroll, unlockBodyScroll } = useBodyScrollLock();

  const handleAddDateClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenedMenu('date');
    setValue('tripType', 'round-trip');
  };

  const handleDone = () => {
    onChange(selectedDates);
    setOpenedMenu('');
  };

  const onDateChange = (dates: Date | null | [Date | null, Date | null]) => {
    if (isRange && Array.isArray(dates)) {
      const [start, end] = dates;
      setSelectedDates([start, end]);
    } else {
      setSelectedDates([dates, null]);
    }
  };

  useEffect(() => {
    if (openedMenu === 'date') {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }

    return () => {
      unlockBodyScroll();
    };
  }, [openedMenu]);

  return (
    <>
      <div className={styles.datesContainer}>
        <div
          className={cn(
            styles.dateInput,
            showTwoInputs ? 'w-full ltr:rounded-l-full rtl:rounded-r-full' : 'w-full rounded-full',
          )}
          onClick={() => setOpenedMenu('date')}
        >
          <CalendarDays className={styles.calenderIcon} />
          <FormatDate date={value[0]} />
        </div>
        {showTwoInputs && (
          <div
            className={cn(
              styles.dateInput,
              'w-full ltr:rounded-r-full rtl:rounded-l-full',
              !value[1] && styles.shdowBox,
            )}
            onClick={() => setOpenedMenu('date')}
          >
            {activeType === 'round-trip' && value[1] ? (
              <>
                <CalendarDays className={styles.calenderIcon} />
                <FormatDate date={value[1]} />
              </>
            ) : (
              <Button
                variant="default"
                className={styles.addReturnBtn}
                onClick={handleAddDateClick}
                type="button"
              >
                {t('tuYsqZXxQwckGBFo81Y8p')}
              </Button>
            )}
          </div>
        )}
      </div>
      <div className={cn(styles.dateSelect, openedMenu !== 'date' && 'translate-y-full opacity-0')}>
        <div className={styles.dateSelectContainer}>
          <span className={styles.departure}>
            {t('lJHa3KmeN61oop4-2fsd7')} & {t('ZXa0TtiFTzS97kDf4GqkE')}
          </span>
          {/* <span className={styles.placeHolder}>
            {selectedDates[1]
              ? t('ycCcV8KT5uaPS_Nbo1jgf')
              : t('3a6SAW7HbWbgbc25l2DP7')}
          </span> */}
        </div>
        <div id="flights-DateContainer">
          <DatePicker
            selected={selectedDates[0]}
            onChange={(date: Date) => onDateChange(date)}
            selectsStart
            startDate={selectedDates[0]}
            endDate={isRange ? selectedDates[1] : null}
            monthsShown={12}
            calendarClassName={styles.calendarContainer}
            minDate={dayjs().toDate()}
            showMonthDropdown
            selectsRange={isRange}
            inline
          />
        </div>
      </div>
      <div
        className={cn(
          styles.actionsContainer,
          openedMenu !== 'date' && 'translate-y-full opacity-0',
        )}
      >
        <Button
          type="button"
          className={styles.cancelBtn}
          variant="default"
          onClick={() => {
            setSelectedDates(value);
            setOpenedMenu('');
          }}
        >
          {t('CVrkwmzVSFjUNa7fDJ5qc')}
        </Button>
        <Button type="button" variant="default" onClick={handleDone} className={styles.doneBtn}>
          {t('hGBYhJKUK2tCg9j_xaosr')}
        </Button>
      </div>
    </>
  );
};

export default DatesSelectorMobile;
