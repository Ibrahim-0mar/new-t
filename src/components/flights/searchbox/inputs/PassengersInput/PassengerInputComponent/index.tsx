import { Icon } from '@iconify/react/dist/iconify.js';
import styles from './index.module.css';

type PassngerInputType = {
  header: string;
  subHeader: string;
  value: number;
  iconName: string;
  min: number;
  max: number;
  increaseFunction: () => void;
  decreaseFunction: () => void;
};

const PassengerInput = (props: PassngerInputType) => {
  const {
    header,
    subHeader,
    value,
    iconName,
    min,
    max,
    increaseFunction,
    decreaseFunction,
  } = props;
  const isDecreaseDisabled = value <= min;
  const isIncreaseDiabled = value >= max;
  return (
    <div className={styles.rowContainer}>
      <Icon icon={iconName} className={styles.passengerIcon} />
      <div className={styles.headerContainer}>
        <p className={styles.header}>{header}</p>
        <span className={styles.subHeader}>{subHeader}</span>
      </div>
      <div className={styles.counterContainer}>
        <button
          type="button"
          className={isDecreaseDisabled ? styles.disabledButton : styles.button}
          onClick={(e) => {
            e.preventDefault();
            decreaseFunction();
          }}
          disabled={isDecreaseDisabled}
        >
          -
        </button>
        <h4>{value}</h4>
        <button
          type="button"
          className={isIncreaseDiabled ? styles.disabledButton : styles.button}
          onClick={(e) => {
            e.preventDefault();
            increaseFunction();
          }}
          disabled={isIncreaseDiabled}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default PassengerInput;
