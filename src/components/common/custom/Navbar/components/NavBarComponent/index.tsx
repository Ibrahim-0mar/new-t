'use client';
import { locale, usePathname } from '@/navigation';
import { getCountry } from '@/services/apis/common/countries';
import { fetchCurrency } from '@/services/apis/common/region';
import { defaultCountry, defaultCurrency } from '@/services/data/common';
import { languagesMap } from '@/services/data/languages';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import globalDataSetter from '@/utils/helper/cookies/globalDataSetter';
import { storeDataInCookies } from '@/utils/helper/cookies/server';
import { cn } from '@/utils/helper/tailwind_cn';
import { country } from '@/utils/types/common';
import { getCookie, setCookie } from 'cookies-next';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { Suspense, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import UAParser from 'ua-parser-js';
import { v4 as uuid } from 'uuid';

import styles from './index.module.css';

import Button from '@/components/common/base/Button';
import Container from '@/components/common/base/Container';
import { getNearbyAirport } from '@/services/apis/common/airports';
import { backendImagesUrl } from '@/utils/config';
import { useRegionContext } from '@/utils/lib/providers/RegionProvider/RegionProvider';
import Image from 'next/image';
import Logo from '../../../Logo';
import RegionModal from '../../../RegionModal/RegionModal';
import SideMenu from '../../../SideMenu';
import SignModel from '../../../SigninModel';
import { transparentNavItems } from '../../transparentNavItems';
import NavbarList from '../NavbarList';

type NavbarVariants = 'primary' | 'secondary'; // Add more variants as needed

interface NavbarProps {
  variant?: NavbarVariants;
  sessionId: string;
  airports: any;
  locale: locale;
}

const NavBarComponent: React.FC<NavbarProps> = ({ sessionId, airports, locale }) => {
  const t = useTranslations();

  const language = useMemo(() => languagesMap.find((l) => l.code === locale)!, [locale]);

  const [nearbyAirport, setNearbyAirport] = useState<NearbyAirportType | null>(airports);
  const [country, setCountry] = useState<CountryType | null>(globalDataGetter('client', 'country'));
  const [currency, setCurrency] = useState<CurrencyType | null>(
    globalDataGetter('client', 'currency'),
  );
  const [scrollNav, setScrollNav] = useState<boolean>();

  const pathname = usePathname();
  const { data: session } = useSession();

  const { isRegionModalOpen, dispatch } = useRegionContext();

  const isScrollNavItem =
    pathname === `/`
      ? true
      : pathname.includes('cheapest-flights')
        ? true
        : transparentNavItems.some(
            (item) => pathname === item.href || pathname === locale + '/' + item.href,
          );

  const countryFlag =
    backendImagesUrl + `/public/images/flags/${country?.code?.toLowerCase() || 'us'}.svg`;

  /*
    This useEffect is used to set 4 things the first time the user visits the website:-
    1) The visitorId in the localStorage and cookies for the whole app.
    2) The user's timezone in a cookie to use it in next-intl configs file (i18n.ts) in the server-side.
    3) The device type in localStorage.
    4) The country & currency based on the nearbyAirport if they don't exist,
        or set them to their defaults if anything wrong happens.
  */
  useEffect(() => {
    /**
     * A function to reset whenever we want to set the country and currency
     * @param {CountryType} country - The country object
     * @param {CurrencyType} currency - The currency object
     */
    function setRegionalData(country: CountryType, currency: CurrencyType) {
      if (country) {
        setCountry(country);
        dispatch({ type: 'SET_COUNTRY', payloud: country });
        globalDataSetter('country', country);
      }

      if (currency) {
        setCurrency(currency);
        dispatch({ type: 'SET_CURRENCY', payloud: currency });
        globalDataSetter('currency', currency);
      }
    }

    // Set the visitorId in the localStorage and cookies for the whole app.
    if (!globalDataGetter('client', 'visitorId')) {
      const visitorId = uuid();
      globalDataSetter('visitorId', visitorId);
    }

    // Set the user's timezone in a cookie to use it in next-intl configs file (i18n.ts) in the server-side.
    if (!getCookie('timezone')) {
      setCookie('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone, { path: '/' });
      window.location.reload;
    }

    // Set the device type in localStorage
    if (typeof window !== 'undefined') {
      const parser = new UAParser(navigator.userAgent);
      const result = parser.getResult();
      const isDesktop = result.device.type === undefined;

      localStorage.setItem(
        'userAgentDetails',
        JSON.stringify(
          result.device.type
            ? result
            : {
                ...result,
                device: { ...result.device, type: isDesktop ? 'pc' : 'mobile' },
              },
        ),
      );
    }

    // Get the country & currency based on the nearbyAirport if they don't exist,
    // or set them to their defaults if anything wrong happened.
    (async () => {
      // If one of both country & currency doesn't exist, set the currency and country based on the nearbyAirport
      if (!country || !currency) {
        if (nearbyAirport) {
          try {
            const data: country = await getCountry(nearbyAirport.countryCode, locale);

            if (data?.currency) setRegionalData(data, data.currency);
            else throw new Error('There is no country/currency with the specified arguments!');
          } catch (error) {
            console.error(error);
            // If there's no returned data or there's an error,
            // set the country and currency to their defaults.
            setRegionalData(defaultCountry, defaultCurrency);
          }
        } else {
          // If the nearbyAirport doesn't exist, try to fetch it
          try {
            // If we have a reponse, set the nearbyAirport...
            setNearbyAirport(airports);
            globalDataSetter('nearbyAirport', airports);

            // and then get the country to set both country and currency based on the nearbyAirport
            const data: country = await getCountry(airports.countryCode, locale);

            if (data?.currency) setRegionalData(data, data.currency);
            else throw new Error('There is no country/currency with the specified arguments!');
          } catch (error) {
            console.error(error);
            /*
              If there's an error in getting the nearbyAirport,
              or there's no returned data from the getCountry function,
              or there's an error occured while fetching using getCountry,
              set both country and currency to their defaults.
            */
            setRegionalData(defaultCountry, defaultCurrency);
          }
        }
      }
    })();

    // Adding nearbyAirport, country or currency will break the login and might cause infinit rerendering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
    This useEffect is used to set 3 things whenever the locale changes:-
    1) Set the nearbyAirport.
    2) Reset the currency & country.
  */
  useEffect(() => {
    /**
     * A function to reset whenever we want to set the country and currency
     * @param {CountryType} country - The country object
     * @param {CurrencyType} currency - The currency object
     */
    function setRegionalData(country?: CountryType | null, currency?: CurrencyType) {
      if (country) {
        setCountry(country);
        dispatch({ type: 'SET_COUNTRY', payloud: country });
        globalDataSetter('country', country);
      }

      if (currency) {
        setCurrency(currency);
        dispatch({ type: 'SET_CURRENCY', payloud: currency });
        globalDataSetter('currency', currency);
      }
    }

    // Set the nearbyAirport based on the locale.
    getNearbyAirport(locale).then((airports) => {
      setNearbyAirport(airports);
      // globalDataSetter('nearbyAirport', airports);
    });

    // Reset the currency & country based on the locale whenever it changes.
    if (currency && country) {
      (async () => {
        // Try to refetch the country based on the new locale
        try {
          const data: country = await getCountry(country.code, locale);

          if (data?.currency) {
            setRegionalData(country);
            globalDataSetter('country', data);
          } else {
            throw new Error('There is no country with the specified arguments!');
          }
        } catch (error) {
          console.error(error);
          // If there's no returned data or there's an error,
          // DO NOTHING! since there was already some data, we don't need to set it to default.
        }

        // Try to refetch the currency based on the new locale
        try {
          const currencyData = await fetchCurrency(currency.code, locale);

          if (currencyData?.length) {
            setRegionalData(undefined, currencyData[0]);
            globalDataSetter('currency', currencyData[0]);
          } else {
            throw new Error('There is no currency with the specified arguments!');
          }
        } catch (error) {
          console.error(error);
          // If there's no returned data or there's an error,
          // DO NOTHING! since there was already some data, we don't need to set it to default.
        }
      })();
    }

    // Adding currency and country will cause an infinite rerending
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  // this useEffect is used to set the sessionId in the cookies (if NOT already exists) for the whole app
  // the first time the user visits the website.
  useEffect(() => {
    if (!sessionId) {
      const newSessionId = uuid();
      const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
      const expiryDate = new Date(Date.now() + thirtyMinutes);

      storeDataInCookies('sessionId', newSessionId, {
        expires: expiryDate,
      });
    }
  }, [sessionId]);

  useLayoutEffect(() => {
    if (window.scrollY >= 20) setScrollNav(true);
    const changeNavBackground = () => {
      setScrollNav(window.scrollY >= 20);
    };
    window.addEventListener('scroll', changeNavBackground);
    return () => window.removeEventListener('scroll', changeNavBackground);
  }, [pathname]);

  return (
    <div
      className={
        isScrollNavItem
          ? cn(styles.tarnsparentNavRoot, scrollNav && styles.scrollNavRoot)
          : styles.scrollNavRoot
      }
    >
      <Container>
        <nav>
          <div className={styles.navContent}>
            <Logo
              className="max-lg:hidden"
              width={100}
              variant={isScrollNavItem ? (scrollNav ? 'colored' : 'white') : 'colored'}
            />
            <Logo className="lg:hidden" width={100} variant="colored" />
            {isScrollNavItem ? scrollNav && <NavbarList /> : <NavbarList />}
            <div className={styles.modalsContainer}>
              {isRegionModalOpen && <RegionModal />}
              <Button
                className={cn(
                  styles.regionButton,
                  isScrollNavItem ? scrollNav : true && styles.regionButtonBg,
                )}
                variant="default"
                onClick={() => dispatch({ type: 'SET_REGION_MODAL', payloud: true })}
              >
                {country ? (
                  <Image
                    src={countryFlag}
                    alt={t('amYU-eUKHfZmgN1ZqAsbN')}
                    className={styles.flag}
                    width={20}
                    height={0}
                  />
                ) : (
                  <div className={styles.placeholder} />
                )}
                <span className={styles.languageText}>
                  {language?.code ? language?.code.toUpperCase() : 'EN'}
                </span>
                {currency ? (
                  <span className={styles.countryText}>
                    {currency?.code ? currency?.code : 'USD'}
                  </span>
                ) : (
                  <div className={styles.placeholder} />
                )}
              </Button>
              <Suspense fallback={<div />}>
                <SignModel session={session} btnBg={isScrollNavItem ? scrollNav : true} />
              </Suspense>
              <SideMenu />
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default NavBarComponent;
