'use client';
import Button from '@/components/common/base/Button';
import { cn } from '@/utils/helper/tailwind_cn';
import dayjs from 'dayjs';
import { CalendarDays } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import './custom-datepicker.css';
import styles from './index.module.css';
import useBodyScrollLock from '@/utils/hooks/useBodyScrollLock';
import { useTranslations } from 'next-intl';
import DatePicker from '@/components/common/custom/DatePicker/DatePicker';
import FormatDate from '@/utils/helper/FormatDateComponent';

interface DatesSelectorMobileProps {
  field: ControllerRenderProps<any, any>;
  openedMenu: string;
  setOpenedMenu: any;
}

const HotelsDatesSelectMobile = ({
  field,
  openedMenu,
  setOpenedMenu,
}: DatesSelectorMobileProps) => {
  const t = useTranslations();

  const { onChange, value } = field;
  const activeType = useSearchParams().get('trip-type') || 'round-trip';
  const isRange = activeType === 'round-trip';
  const [selectedDates, setSelectedDates] = useState(value);
  const { lockBodyScroll, unlockBodyScroll } = useBodyScrollLock();

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
            'w-full ltr:ml-5 ltr:rounded-l-full rtl:mr-5 rtl:rounded-r-full',
          )}
          onClick={() => setOpenedMenu('date')}
        >
          <CalendarDays className={styles.calenderIcon} />
          <FormatDate date={value[0]} />
        </div>
        <div
          className={cn(
            styles.dateInput,
            'w-full ltr:mr-5 ltr:rounded-r-full rtl:ml-5 rtl:rounded-l-full',
            !value[1] && styles.shdowBox,
          )}
          onClick={() => setOpenedMenu('date')}
        >
          {value[1] ? (
            <>
              <CalendarDays className={styles.calenderIcon} />
              <FormatDate date={value[1]} />
            </>
          ) : (
            <Button
              variant="default"
              className={styles.addReturnBtn}
              onClick={() => {}}
              type="button"
            >
              {t('tuYsqZXxQwckGBFo81Y8p')}
            </Button>
          )}
        </div>
      </div>
      {/* {openedMenu === 'date' && ( */}
      <div className={cn(styles.dateSelect, openedMenu !== 'date' && 'translate-y-full opacity-0')}>
        <div className={styles.dateSelectContainer}>
          <p className="mx-auto">
            <span className={styles.departure}>{t('lJHa3KmeN61oop4-2fsd7')}</span>
            <span className="px-2 text-black">&</span>
            <span className={styles.departure}>{t('ZXa0TtiFTzS97kDf4GqkE')}</span>
          </p>
        </div>
        <div id="hotel-dateContainer">
          <DatePicker
            selected={selectedDates[0]}
            onChange={(date: Date) => onDateChange(date)}
            selectsStart
            startDate={selectedDates[0]}
            endDate={isRange ? selectedDates[1] : null}
            monthsShown={12}
            calendarClassName={styles.calendarContainer}
            minDate={dayjs().toDate()}
            selectsRange={isRange}
            inline
            className="bg-red-600"
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
        <Button
          type="button"
          variant="default"
          onClick={() => {
            onChange(selectedDates);
            setOpenedMenu('');
          }}
          className={styles.doneBtn}
        >
          {t('hGBYhJKUK2tCg9j_xaosr')}
        </Button>
      </div>
    </>
  );
};

export default HotelsDatesSelectMobile;
