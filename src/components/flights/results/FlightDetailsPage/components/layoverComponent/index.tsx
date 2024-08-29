import FlightLineVector from '../flightLineVector';
import styles from './index.module.css';
import {  useTranslations } from 'next-intl';


const LayoverComponent = ({
  message,
  layoverDuration,
}: {
  message: string;
  layoverDuration: string;
}) => {
  const t =useTranslations()



  return (
    <div className={styles.container}>
      <div className={styles.leftCol}></div>
      <div className={styles.rightCol}>
        <FlightLineVector noCircles />
        <div className={styles.layoverDetails}>
          {message}
          <p>
            {t('Yin17E0vmDQ1ldsm6weM2')}
            <span>{' ' + layoverDuration}</span>
          </p>
          {/* <p className={styles.disclaimer}>
            Please check with the airline if you need a transit visa
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default LayoverComponent;
