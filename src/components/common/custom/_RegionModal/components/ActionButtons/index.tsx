'use client';
import styles from './index.module.css';
import { useSearchParams } from 'next/navigation';
import { language } from '@/utils/types/common';
import globalDataSetter from '@/utils/helper/cookies/globalDataSetter';
import { locale, usePathname, useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { getCountry } from '@/services/apis/common/countries';
import { defaultCountry, defaultCurrency } from '@/services/data/common';
import { fetchCurrency } from '@/services/apis/common/region';

const ActionButtons = ({
  language,
  country,
  currency,
  resetValues,
}: {
  language: language;
  country: CountryType | null;
  currency: CurrencyType | null;
  resetValues: () => void;
}) => {
  const t = useTranslations();

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const handleClose = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('regionmodal');
    router.push(`?${newSearchParams.toString()}`, { scroll: false });
    resetValues();
  };

  const handleSave = async () => {
    // Get the search params and hide the regional modal by deleting its search param
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('regionmodal');
    const searchParamsString = newSearchParams.toString();

    // Set the new data in cookies and localStorage
    await globalDataSetter('language', language);
    // await globalDataSetter('country', country);
    // await globalDataSetter('currency', currency);

    // Fetch and set the country based on the locale to make sure it matches the locale language
    await getCountry(country?.code || 'US', language.code as locale)
      .then((country) => {
        if (country?.currency) globalDataSetter('country', country);
        else globalDataSetter('country', defaultCountry);
      })
      .catch(() => globalDataSetter('country', defaultCountry));

    // Fetch and set the currency based on the locale to make sure it matches the locale language
    await fetchCurrency(currency?.code || 'USD', language.code as locale)
      .then(async (currencyData) => {
        if (currencyData?.length) await globalDataSetter('currency', currencyData[0])
        else await globalDataSetter('currency', defaultCurrency);
      })
      .catch(() => globalDataSetter('currency', defaultCurrency));

    // This is required to set the locale in the `NEXT_LOCALE` cookie for next-intl library before reloading
    router.replace(`${pathName}?${searchParamsString}`, {
      locale: language.code as locale,
    });

    // Reload for a fresh-updated data fetching based on the new language, currency & country
    window.location.replace(`${window.location.origin}/${pathName}?${searchParamsString}`);

  };

  return (
    <div className={styles.container}>
      <button className={styles.cancelButton} onClick={handleClose}>
        {t('CVrkwmzVSFjUNa7fDJ5qc')}
      </button>
      <button className={styles.saveButton} onClick={handleSave}>
        {t('bIqtnLcHhWjNhdQau3kil')}
      </button>
    </div>
  );
};

export default ActionButtons;
