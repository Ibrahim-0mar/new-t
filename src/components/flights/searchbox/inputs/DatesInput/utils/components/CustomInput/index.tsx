'use client';
import ChevronLeft from '@/components/common/base/ChevronLeft';
import ChevronRight from '@/components/common/base/ChevronRight';
import { addDays, substractDays } from '@/utils/helper/dates';
import { cn } from '@/utils/helper/tailwind_cn';
import dayjs from 'dayjs';
import { CalendarDays, Plus } from 'lucide-react';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';
import FormatDate from '@/utils/helper/FormatDateComponent';

type CustomInputType = {
  value: string | undefined;
  updateHandler: (date: Date) => void;
  minDate: Date;

  showAddDateText?: boolean;
  showTwoInputs?: boolean;
  handleAddDateClick?: () => void;
};

const CustomInput = ({
  value,
  updateHandler,
  minDate,
  showAddDateText,
  showTwoInputs,
  handleAddDateClick,
}: CustomInputType) => {
  const t = useTranslations();

  const isSubstractDisabled = dayjs(value).isBefore(minDate) || dayjs(value).isSame(minDate);

  const handleSubstractClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    updateHandler(substractDays(dayjs(value).toDate(), 1));
  };

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    updateHandler(addDays(dayjs(value).toDate(), 1));
  };

  return dayjs(value).isValid() && !showAddDateText ? (
    <div className={cn(styles.dateInputContainer, showTwoInputs ? 'w-1/2' : 'w-full')}>
      <CalendarDays className={styles.calenderIcon} />
      <span>
        <FormatDate date={value!} />
      </span>
      <button
        aria-label={t('zdN8c7RbK0N67MDbe3lh7')}
        className={cn(styles.arrowIcon, isSubstractDisabled ? styles.disabled : '')}
        onClick={handleSubstractClick}
        disabled={isSubstractDisabled}
      >
        <ChevronLeft />
      </button>

      <button
        aria-label={t('cHp2PYBqATAK6TYCQ5cV-')}
        className={styles.arrowIcon}
        onClick={handleAddClick}
      >
        <ChevronRight />
      </button>
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

export default CustomInput;
