'use client';
import Button from '@/components/common/base/Button';
import { cn } from '@/utils/helper/tailwind_cn';
import dayjs from 'dayjs';
import { CalendarDays } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { OpenedMenuTypes } from '../..';
import './utils/custom-datepicker.css';
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
  minDate: Date;
}

const AirportTransfersDateSelectorMobile = ({
  field,
  openedMenu,
  setOpenedMenu,
  showTwoInputs,
  minDate,
}: DatesSelectorMobileProps) => {
  const t = useTranslations();

  const { lockBodyScroll, unlockBodyScroll } = useBodyScrollLock();

  const { onChange, value } = field;

  const handleDone = () => {
    setOpenedMenu('');
  };

  useEffect(() => {
    if (openedMenu === 'pickupDate') {
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
          onClick={() => setOpenedMenu('pickupDate')}
        >
          <CalendarDays className={styles.calenderIcon} />
          <FormatDate date={value} />
        </div>
      </div>
      {openedMenu === 'pickupDate' && (
        <div className={cn(styles.dateSelect, true && styles.dateAnimate)}>
          <div className={styles.dateSelectContainer}>
            <span className={styles.departure}>{t('lJHa3KmeN61oop4-2fsd7')}</span>
            <span className={styles.placeHolder}>{t('ycCcV8KT5uaPS_Nbo1jgf')}</span>
          </div>
          <div id="transfers-dateContainer">
            <DatePicker
              selected={dayjs(value).toDate()}
              onChange={onChange}
              monthsShown={12}
              calendarClassName={styles.calendarContainer}
              minDate={minDate}
              selectsRange={false}
              inline
            />
          </div>
        </div>
      )}
      <div
        className={cn(
          styles.actionsContainer,
          openedMenu !== 'pickupDate' && 'translate-y-full opacity-0',
        )}
      >
        <Button
          className={styles.cancelBtn}
          variant="default"
          onClick={() => {
            setOpenedMenu('');
          }}
        >
          {t('CVrkwmzVSFjUNa7fDJ5qc')}
        </Button>
        <Button variant="default" onClick={handleDone} className={styles.doneBtn} type='button'>
          {t('hGBYhJKUK2tCg9j_xaosr')}
        </Button>
      </div>
    </>
  );
};

export default AirportTransfersDateSelectorMobile;