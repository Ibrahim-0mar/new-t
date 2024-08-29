'use client';
import RegionSelect from '@/components/common/base/Select/RegionSelect';
import { fetchCountries } from '@/services/apis/common/region';
import { country } from '@/utils/types/common';
import styles from './index.module.css';
import { useLocale, useTranslations } from 'next-intl';
import { locale } from '@/navigation';
import { useEffect, useState } from 'react';
type Props = {
  flag: string;
  country: CountryType | null;
  handleChange: (country: country) => void;
};
const CountryInput = ({ country, flag, handleChange }: Props) => {
  const locale = useLocale() as locale;
  const t = useTranslations();
  const [data,setData]=useState<CountryType[]>([])
  const _getData=async()=>{
    const response =await fetchCountries(locale);
    setData(response);
  }
  useEffect(()=>{
    _getData()
  },[])

  const handleCountryChange = (country: country) => {
    handleChange(country);
  };

  return (
    <>
      {' '}
      {/* {data && ( */}
        <div>
          <RegionSelect
            selected={country}
            menuClassName={styles.options}
            inputClassName={styles.inputClassName}
            itemClassName={styles.itemClassName}
            options={data}
            label={<h4 className={styles.inputTitle}>{t('iQDslT0RdD5Kpa-qoodeR')}</h4>}
            optionsTitle={<h4 className={styles.optionsTitle}>{t('63ORnO2Dyy0Z-4-s3Crk_')}</h4>}
            placeholder={t('QWAOtKX78W3rAnbmKo6ss')}
            itemsType="country"
            handleChange={handleCountryChange}
            defaultValue={country?.name || t('Oy7HK_yQDVPJ7zKsHELcE')}
            flag={flag}
          />
        </div>
      {/* )} */}
    </>
  );
};
export default CountryInput;
