'use client';
import ChevronLeft from '@/components/common/base/ChevronLeft';
import ChevronRight from '@/components/common/base/ChevronRight';
import { addDays, substractDays } from '@/utils/helper/dates';
import FormatDate from '@/utils/helper/FormatDateComponent';
import { cn } from '@/utils/helper/tailwind_cn';
import dayjs from 'dayjs';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import styles from './index.module.css';

type CustomInputType = {
  value: string | undefined;
  updateHandler: (date: Date) => void;
  minDate: Date;

  showAddDateText?: boolean;
  showTwoInputs?: boolean;
  handleAddDateClick?: () => void;
};

const HotelCustomInput = ({
  value,
  updateHandler,
  minDate,
  showAddDateText,
  showTwoInputs,
  handleAddDateClick,
}: CustomInputType) => {
  const t = useTranslations();

  const isSubstractDisabled = dayjs(value).isBefore(minDate) || dayjs(value).isSame(minDate);

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    updateHandler(addDays(dayjs(value).toDate(), 1));
  };

  const handleSubstractClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    updateHandler(substractDays(dayjs(value).toDate(), 1));
  };

  return dayjs(value).isValid() && !showAddDateText ? (
    <div className={cn(styles.dateInputContainer, showTwoInputs ? 'w-1/2' : 'w-full')}>
      <div className={styles.date}>
        <span>
          <FormatDate date={value!} additionalFormats={{
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
          }} />
        </span>
        <span className={styles.arrows}>
          <button
            className={cn(styles.arrowIcon, isSubstractDisabled && styles.disabled)}
            aria-label={t('zdN8c7RbK0N67MDbe3lh7')}
            onClick={handleSubstractClick}
            disabled={isSubstractDisabled}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            aria-label={t('cHp2PYBqATAK6TYCQ5cV-')}
            className={styles.arrowIcon}
            onClick={handleAddClick}
          >
            <ChevronRight size={16} />
          </button>
        </span>
      </div>
    </div>
  ) : (
    <div
      className={cn(styles.dateInputContainer, styles.addDateContainer)}
      onClick={handleAddDateClick}
    >
      <Plus />
      <span>{t('eOyJsFEKEFo1BX3ywqJTj')}</span>
    </div>
  );
};

export default HotelCustomInput;
