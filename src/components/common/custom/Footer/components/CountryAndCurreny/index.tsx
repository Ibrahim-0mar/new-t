'use client';
// import CountryInput from '../../../RegionModel/components/CountryInput';
// import CurrencyInput from '../../../RegionModel/components/CurrencyInput';
// import { country, currency } from '@/utils/types/common';
import styles from './index.module.css';
// type Props = {
//   country: country;
//   currency: currency;
// };
const CountryAndCurrency = () => {
  return (
    <div className={styles.componentAlign}>
      {/* <CountryInput country={country} varient="secondary" /> */}
      <div className={styles.componentAlign}>
        {/* <CurrencyInput currency={currency} varient="secodary" /> */}
      </div>
    </div>
  );
};
export default CountryAndCurrency;
