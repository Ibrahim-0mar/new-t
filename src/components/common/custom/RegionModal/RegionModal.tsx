"use client"

//? Libraries ---------------------------------------------------------------------
import { Banknote, Flag, Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from 'sonner';

//? Services & Utilities ----------------------------------------------------------
import { locale, usePathname, useRouter } from "@/navigation";
import { getCountry } from "@/services/apis/common/countries";
import { fetchCountries, fetchCurrencies, fetchCurrency } from "@/services/apis/common/region";
import { languagesMap } from "@/services/data/languages";
import { backendImagesUrl } from "@/utils/config";
import globalDataSetter from "@/utils/helper/cookies/globalDataSetter";
import { commonImgUrl } from "@/utils/helper/imgUrl";
import { useRegionContext } from "@/utils/lib/providers/RegionProvider/RegionProvider";


//? Custom Components & Styles ----------------------------------------------------
import Button from "../../base/Button";
import Select from "./components/select/select";
import styles from './index.module.css';

//? Types -------------------------------------------------------------------------
export default function RegionModal() {
  //# Internationalization
  const t = useTranslations();
  const locale = useLocale() as locale

  //# Routing
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()

  //# State
  // This a special state to set the currency input value whenever the country is selected to make them in sync
  const [currencyInputValue, setCurrencyInputValue] = useState<string | undefined>();
  const [retryCount, setRetryCount] = useState(0);

  //# Context
  const {
    countries,
    currencies,
    isCountriesLoading,
    isCurrenciesLoading,
    selectedLanguage,
    selectedCountry,
    selectedCurrency,
    isCountriesError,
    isCurrenciesError,
    dispatch
  } = useRegionContext();

  //# Variables
  const countryFlag = backendImagesUrl + `/public/images/flags/${selectedCountry?.code?.toLowerCase() || 'us'}.svg`;
  const sortedCurrencies = useMemo(() => {
    const popularCurrenciesCode = new Set(['USD', 'EUR', 'GBP', 'CNY', 'INR', 'CAD', 'EGP']);

    // Loop over all currencies, check if the current currency in loop is among the popular ones, if so display it
    // before other currencies. The slice() is to take a deep copy.
    return currencies.slice().sort((a, b) => {
      const isAPopular = popularCurrenciesCode.has(a.code);
      const isBPopular = popularCurrenciesCode.has(b.code);

      if (isAPopular && !isBPopular) return -1; // If A is popular and B is not, A comes before B
      if (isBPopular && !isAPopular) return 1; // If B is popular and A is not, B comes before A

      return a.name.localeCompare(b.name, locale) // Sort them alphabetically if they're equal in popularity
    })

  } , [currencies, locale])

  //# Functions ---------------------------------------------------------
  // Save the new configuration
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get Search params
    const newSearchParams = new URLSearchParams(searchParams);
    const searchParamsString = newSearchParams.toString();

    // Set the new data in cookies and localStorage
    await globalDataSetter('language', selectedLanguage);

    // Fetch and set the country based on the language locale to make sure it matches the new locale (if changed)
    const countryData = getCountry(selectedCountry?.code || 'US', selectedLanguage.code as locale) as Promise<CountryType>;
    const currencyData = fetchCurrency(selectedCurrency?.code || 'USD', selectedLanguage.code as locale);

    // Fetch and set the currency based on the language locale to make sure it matches the new locale (if changed)
    try {
      const [country, currency] = await Promise.all([countryData, currencyData])

      if (country?.currency) await globalDataSetter('country', country);
      if (currency?.length) await globalDataSetter('currency', currency[0]);

    } catch (error) {
      const countryFailed = t('qqEoOmqGMPHEk77vzifJt');
      const currencyFailed = t('o2HDZy3zShqe5kM7TbDj-');
      toast.error(countryFailed, { duration: countryFailed.length * 150 })
      toast.error(currencyFailed, { duration: currencyFailed.length * 150 });
    }

    // This is required to set the locale in the `NEXT_LOCALE` cookie for next-intl library before reloading
    router.replace(`${pathname}?${searchParamsString}`, {
      locale: selectedLanguage.code as locale,
    });

    // Reload for a fresh-updated data fetching based on the new language, currency & country
    window.location.replace(`${window.location.origin}/${selectedLanguage.code}/${pathname}?${searchParamsString}`);
  };

  //# Effects
  // Add an event listener to close the modal upon clicking 'ESC'
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch({ type: "SET_REGION_MODAL", payloud: false });
      }
    }

    // Close the modal upon pressing ESC keyboard button
    window.addEventListener('keydown', listener);

    // Remove the listener on destroy
    return () => removeEventListener('keydown', listener)
  })

// A memoized function to fetch countries and currencies data from the API
const fetchCountriesAndCurrencies = useCallback(async () => {
  try {
    // Dispatch loading actions to update the state indicating data is being fetched
    dispatch({ type: 'SET_COUNTRIES_LOADING', payloud: true });
    dispatch({ type: 'SET_CURRENCIES_LOADING', payloud: true });

    // Fetch countries and currencies data concurrently using Promise.all
    const [countriesData, currenciesData] = await Promise.all([
      fetchCountries(locale),
      fetchCurrencies(locale),
    ]);

    // Check if the fetched data is empty, if so, throw an error to trigger the catch block
    if (!countriesData?.length || !currenciesData?.length) {
      throw new Error('Empty data received');
    }

    // Dispatch actions to update the state with the fetched countries and currencies data
    dispatch({ type: 'SET_COUNTRIES', payloud: countriesData });
    dispatch({ type: 'SET_CURRENCIES', payloud: currenciesData });
  } catch (error) {
    // Handle any errors that occur during the API calls
    console.error("Couldn't fetch the countries or currencies!", error);

    // Dispatch error actions to update the state indicating an error occurred
    dispatch({ type: 'SET_COUNTRIES_ERROR' });
    dispatch({ type: 'SET_CURRENCIES_ERROR' });

    // Retry the API call if it fails, but only up to 2 times
    if (retryCount < 2) {
      setRetryCount((prevState) => prevState + 1);
    }
  }
}, [locale, retryCount, dispatch]);

// useEffect hook to trigger the fetchCountriesAndCurrencies function when the component mounts
// or when any dependencies (locale, retryCount, dispatch) change.
useEffect(() => {
  fetchCountriesAndCurrencies();
}, [fetchCountriesAndCurrencies]);


  return (
    <div className={styles.modal}>
      {/* Container ----------------------------------------------------------- */}
      <div className={styles.container}>

        {/* Overlay */}
        <span className={styles.overlay}></span>

        {/* Content ----------------------------------------------------------- */}
        <form className={styles.content} onSubmit={handleSubmit}>
          {/* Travolic logo */}
          <Image
            src={commonImgUrl('coloredLogo.png')}
            alt={t('jpfnq7PrnrlgPnrJdgd06')}
            className={styles.logo}
            width={150}
            height={0}
            priority
          />

          {/* Region Inputs --------------------------------------------------- */}
          <ul className={styles.inputs}>
            {/* Language Selection --------------------------- */}
            <li>
              <Select
                label={<><Languages size={20} /> {t('MpWrxopxYh9TZaVXDLRDI')}</>}
                placeholder={t('-Zhd8xv21dtkctC4RbG-o')}
                options={languagesMap.map(l => { return { id: l.code, value: `${l.name} (${l.country})` } })}
                selectedOption={{ id: selectedLanguage?.code, value: `${selectedLanguage.name} (${selectedLanguage.country})` }}
                setSelectedOption={
                  (option) => dispatch({ type: "SET_LANGUAGE", payloud: languagesMap.find(l => l.code === option.id)!})
                }
                disabled={!selectedLanguage}
              />
            </li>

            {/* Country Selection ---------------------------- */}
            <li>
              <Select
                label={<><Flag size={20} /> {t('iQDslT0RdD5Kpa-qoodeR')}</>}
                placeholder={t('QWAOtKX78W3rAnbmKo6ss')}
                // Sort countires by name befor mapping through
                options={countries.sort((a, b) => a.name.localeCompare(b.name, locale)).map(c => {
                  return { id: c.code, value: c.name }
                })}
                selectedOption={{
                  id: selectedCountry?.code,
                  value: selectedCountry?.name,
                  jsx: <Image src={countryFlag} height={30} width={30} alt={selectedCountry?.name || ''} className={styles.flag} />
                }}
                setSelectedOption={
                  (option) => {
                    const country = countries.find(c => c.code === option.id)!;
                    dispatch({ type: "SET_COUNTRY", payloud: country})
                    dispatch({ type: "SET_CURRENCY", payloud: country.currency})
                    setCurrencyInputValue(`${country.currency.name} (${country.currency.symbol})`);
                  }
                }
                isLoading={isCountriesLoading}
                isError={isCountriesError}
              />
            </li>

            {/* Currency Selection --------------------------- */}
            <li>
              <Select
                label={<><Banknote size={20}/> {t('EjSZW1aBhj_u4MsUDNB0b')}</>}
                placeholder={t('9f9DK9si5N9UNlUYfc2C1')}
                options={sortedCurrencies.map(c => {
                  return {
                    id: c.code,
                    value: `${c.name} (${c.symbol})`,
                  }
                })}
                selectedOption={{ id: selectedCurrency?.code, value: `${selectedCurrency?.name} (${selectedCurrency?.symbol})` }}
                setSelectedOption={
                  (option) => dispatch({ type: "SET_CURRENCY", payloud: currencies.find(r => r.code === option.id)!})
                }
                customInputValue={currencyInputValue}
                dropdownPosition="top"
                isLoading={isCurrenciesLoading}
                isError={isCurrenciesError}
              />
            </li>
          </ul>

          {/* Action Buttons --------------------------------- */}
          <ul className={styles.actionBtns}>
            <li>
              <Button
                variant="graphite"
                type="button" onClick={() => dispatch({ type: "SET_REGION_MODAL", payloud: false })}
                >
                  {t('CVrkwmzVSFjUNa7fDJ5qc')}
              </Button>
            </li>
            <li><Button variant="secondary" type="submit">{t('bIqtnLcHhWjNhdQau3kil')}</Button></li>
          </ul>
          {/* ----------------------------------------------------------------- */}
        </form>
        {/* / Content --------------------------------------------------------- */}

      </div>
      {/* / Container --------------------------------------------------------- */}
    </div>
  )
}