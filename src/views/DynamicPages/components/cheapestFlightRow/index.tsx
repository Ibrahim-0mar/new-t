import PercentageBar from '../percentageBar';
import styles from './index.module.css';
import FormatDate from '@/utils/helper/FormatDateComponent';

const CheapestFlightRow = ({
  bgColor,
  percentage,
  month,
}: {
  percentage: number;
  bgColor: 'white' | 'blue';
  month: { name: string; price: number; currency: string };
}) => {
  return (
    <div className={styles.container}>
      <span className={styles.month}>
        <FormatDate
          date={new Date(`9999, 1, ${month.name}`)}
          replaceFormatWith={{
            month: 'short',
          }}
        />
      </span>
      <PercentageBar
        bgColor={bgColor}
        month={{ price: month.price, currency: month.currency }}
        percentage={percentage}
      />
    </div>
  );
};

export default CheapestFlightRow;
