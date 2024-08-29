import styles from './index.module.css';
import Country from '../Country';
import Currency from '../Currency';
import Language from '../Language';
import { country, language } from '@/utils/types/common';
import { cn } from '@/utils/helper/tailwind_cn';
import ActionButtons from '../ActionButtons';
import { useEffect, useState } from 'react';
import { backendImagesUrl } from '@/utils/config';

type RegionInputsProps = {
  language: language;
  country: CountryType | null;
  currency: CurrencyType | null;
  className?: string;
};
const RegionInputs = ({ language, country, currency, className }: RegionInputsProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<language>(language);
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(country);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType | null>(currency);

  const _resetValues = () => {
    setSelectedLanguage(language);
    setSelectedCountry(country);
    setSelectedCurrency(currency);
  };

  const defaultFlag = backendImagesUrl + '/public/images/flags/us.svg';
  const countryFlag =
    backendImagesUrl + `/public/images/flags/${selectedCountry?.code?.toLowerCase()}.svg`;

  const handleCountryChange = (country: country) => {
    setSelectedCountry(country);
    setSelectedCurrency(country.currency);
  };

  // Update the selected currency and country if they're changed in the parent to make sure they match the locale
  useEffect(() => {
    setSelectedCountry(country);
    setSelectedCurrency(currency)
  }, [country, currency])

  return (
    <div className={cn(styles.modalStyle, className)}>
      <div className={styles.inputWrapper}>
        <Language language={selectedLanguage} handleChange={setSelectedLanguage} />
        <Country
          flag={selectedCountry?.code ? countryFlag : defaultFlag}
          country={selectedCountry}
          handleChange={handleCountryChange}
        />
        <Currency currency={selectedCurrency} handleChange={setSelectedCurrency} />
        <ActionButtons
          country={selectedCountry}
          currency={selectedCurrency}
          language={selectedLanguage}
          resetValues={_resetValues}
        />
      </div>
    </div>
  );
};

export default RegionInputs;
