'use client';
import RegionSelect from '@/components/common/base/Select/RegionSelect';
import { fetchCurrencies } from '@/services/apis/common/region';
import globalDataSetter from '@/utils/helper/cookies/globalDataSetter';
import { currency } from '@/utils/types/common';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { defaultCurrency } from '@/services/data/common';
import { useLocale, useTranslations } from 'next-intl';
import { locale } from '@/navigation';

type Props = {
  currency: CurrencyType | null;
  handleChange: (currency: currency) => void;
};
const CurrencyInput = ({ currency, handleChange }: Props) => {
  const locale = useLocale() as locale;
  const t = useTranslations();
  const [data,setData]=useState([])
  const [defaultValue, setDefaultValue] = useState({
    name: defaultCurrency.name,
    code: defaultCurrency.code,
  });

  const getCurrency = () => {
    if (currency) setDefaultValue({ name: currency?.name, code: currency?.code });
  };

  const _getData=async()=>{
    const response =await fetchCurrencies(locale);
    setData(response);
  }
  useEffect(()=>{
    _getData()
  },[])


  useEffect(() => {
    const storedCurrency = globalDataGetter('client', 'currency');

    if (!storedCurrency) {
      globalDataSetter('currency', defaultCurrency);
    }
  }, []);

  useEffect(() => {
    getCurrency();
  }, [currency]);

  const handleCurrencyChange = (currency: currency) => {
    setDefaultValue({ name: currency?.name, code: currency?.code });
    handleChange(currency);
  };
  return (
        <div>
          <RegionSelect
            selected={currency}
            menuClassName={styles.options}
            inputClassName={styles.inputClassName}
            itemClassName={styles.itemClassName}
            options={data}
            label={<h4 className={styles.inputTitle}>{t('EjSZW1aBhj_u4MsUDNB0b')}</h4>}
            optionsTitle={<h4 className={styles.optionsTitle}>{t('Lyzza_DhO-z-78mJYjWNp')}</h4>}
            placeholder={t('9f9DK9si5N9UNlUYfc2C1')}
            itemsType="currency"
            handleChange={handleCurrencyChange}
            defaultValue={`${defaultValue?.name} (${defaultValue?.code})`}
          />
        </div>
  );
};
export default CurrencyInput;
