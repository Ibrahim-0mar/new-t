"use client"

import { Dispatch, createContext, useContext, useEffect, useReducer } from "react";
import { useLocale } from "next-intl";
import { setCookie } from "cookies-next";
import { languageType } from "@/utils/types/common";
import { locale } from "@/navigation";
import { languagesMap } from "@/services/data/languages";
import { defaultCountry, defaultCurrency, defaultLanguage } from "@/services/data/common";

//? Reducer Types -----------------------------------------------------------------
type ReducerState = {
  countries: CountryType[];
  currencies: CurrencyType[];
  selectedLanguage: languageType;
  selectedCountry: CountryType;
  selectedCurrency: CurrencyType;
  isCountriesLoading: boolean;
  isCurrenciesLoading: boolean;
  isCountriesError: boolean;
  isCurrenciesError: boolean;
  isRegionModalOpen: boolean;
}

type SetCountries = {
  type: "SET_COUNTRIES";
  payloud: CountryType[];
}
type SetCurrencies = {
  type: "SET_CURRENCIES";
  payloud: CurrencyType[];
}
type SetSelectedLanguage = {
  type: "SET_LANGUAGE";
  payloud: languageType;
}
type SetSelectedCountry = {
  type: "SET_COUNTRY";
  payloud: CountryType;
}
type SetSelectedCurrency = {
  type: "SET_CURRENCY";
  payloud: CurrencyType;
}
type SetIsCountriesLoading = {
  type: "SET_COUNTRIES_LOADING";
  payloud: boolean;
}
type SetIsCurrenciesLoading = {
  type: "SET_CURRENCIES_LOADING";
  payloud: boolean;
}
type SetCountriesError = {
  type: "SET_COUNTRIES_ERROR";
}
type SetIsCurrenciesError = {
  type: "SET_CURRENCIES_ERROR";
}
type SetRegionModal = {
  type: "SET_REGION_MODAL";
  payloud: boolean;
}

type Action = SetCountries | SetCurrencies | SetSelectedLanguage |
              SetSelectedCountry | SetSelectedCurrency | SetIsCountriesLoading |
              SetIsCurrenciesLoading | SetCountriesError | SetIsCurrenciesError | SetRegionModal

//? Types -------------------------------------------------------------------------
type ProviderProps = {
  children: React.ReactNode
}

interface ContextType extends ReducerState {
  dispatch: Dispatch<Action>
}

//? Reducer Functionality ---------------------------------------------------------
const initialState: ReducerState = {
  countries: [],
  currencies: [],
  isCountriesLoading: false,
  isCurrenciesLoading: false,
  selectedLanguage: defaultLanguage,
  selectedCountry: defaultCountry,
  selectedCurrency: defaultCurrency,
  isCountriesError: false,
  isCurrenciesError: false,
  isRegionModalOpen: false
}

const reducer = (state: ReducerState, action: Action): ReducerState => {
  switch (action.type) {
    case 'SET_COUNTRIES':
      return { ...state, countries: action.payloud, isCountriesLoading: false, isCountriesError: false };
    case 'SET_CURRENCIES':
      return { ...state, currencies: action.payloud, isCurrenciesLoading: false, isCurrenciesError: false, };
    case 'SET_COUNTRIES_LOADING':
      return { ...state, isCountriesError: false, isCountriesLoading: true };
    case 'SET_CURRENCIES_LOADING':
      return { ...state, isCurrenciesError: false, isCurrenciesLoading: true };
    case 'SET_COUNTRIES_ERROR':
      return { ...state, isCountriesError: true, isCountriesLoading: false };
    case 'SET_CURRENCIES_ERROR':
      return { ...state, isCurrenciesError: true, isCurrenciesLoading: false };
    case 'SET_LANGUAGE':
      return { ...state, selectedLanguage: action.payloud };
    case 'SET_COUNTRY':
      return { ...state, selectedCountry: action.payloud };
    case 'SET_CURRENCY':
      return { ...state, selectedCurrency: action.payloud };
    case 'SET_REGION_MODAL':
      return { ...state, isRegionModalOpen: action.payloud };
    default:
      return state;
  }
};

//? Context -----------------------------------------------------------------------
const RegionContext = createContext<ContextType>({...initialState, dispatch: () => {}});

export default function RegionProvider({children}: ProviderProps) {
  const [{
    countries,
    currencies,
    isCountriesLoading,
    isCurrenciesLoading,
    selectedLanguage,
    selectedCountry,
    selectedCurrency,
    isCountriesError,
    isCurrenciesError,
    isRegionModalOpen
  }, dispatch] = useReducer(reducer, initialState);
  const locale = useLocale() as locale;

  useEffect(() => {
    // Set the language object in cookies, localStorage and region provider state every time the locale changes.
    const language = languagesMap.find((l) => l.code === locale)!;
    const languageJSON = JSON.stringify(language);

    setCookie('language', languageJSON);
    localStorage.setItem('language', languageJSON);

    dispatch({ type: "SET_LANGUAGE", payloud: language})
  }, [locale])

  return <RegionContext.Provider value={{
    countries,
    currencies,
    isCountriesLoading,
    isCurrenciesLoading,
    selectedLanguage,
    selectedCountry,
    selectedCurrency,
    isCountriesError,
    isCurrenciesError,
    isRegionModalOpen,
    dispatch
  }}>
    {children}
  </RegionContext.Provider>
}

export const useRegionContext = () => {
  const context = useContext(RegionContext);

  if (!context) throw new Error("Region context was used outside of its provider scope!")

    return context
}