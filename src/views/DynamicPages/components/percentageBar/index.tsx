import { cn } from '@/utils/helper/tailwind_cn';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

const PercentageBar = ({
  bgColor = 'white',
  percentage,
  month,
}: {
  percentage: number;
  bgColor: 'white' | 'blue';
  month: { price: number; currency: string };
}) => {
  const t = useTranslations();

  const minWidth = 10;

  return (
    <div
      style={{ width: `${percentage > minWidth ? percentage : minWidth}%` }}
      className={cn(
        'col-span-11 flex h-14 items-center justify-end rounded-lg bg-eighth p-2 max-md:col-span-10 max-sm:min-w-[28%] min-[768px]:min-w-[16%] lg:min-w-[10%]',
        bgColor === 'blue' && 'bg-seventh',
      )}
    >
      <span className={styles.word}>
        {t.rich(
          'dOSKhUxKtlt06ZmDEcMbl',
          { price: month.price },
          {
            number: {
              currency: { style: 'currency', currency: month.currency, numberingSystem: 'latn' },
            },
          },
        )}
      </span>
    </div>
  );
};

export default PercentageBar;
