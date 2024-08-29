'use client';
import ImagesComponent from '@/app/[locale]/flights/book/components/imagesComponent';
import TicketDetails from '@/app/[locale]/flights/book/components/ticketDetails';
import Container from '@/components/common/base/Container';
import { useRouter } from '@/navigation';
import { redirectRequest } from '@/services/apis/flights/results';
import { eventsOnFlightRedirect } from '@/utils/events/flights/search';
import { agentImgUrl } from '@/utils/helper/imgUrl';
import { parse } from '@/utils/helper/json';
import { flightRedirectTracking } from '@/utils/tracking/flightRedirect';
import { flightRedirectPayloadType, flightRedirectTrackingData } from '@/utils/types/flights';
import { useReCaptcha } from 'next-recaptcha-v3';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { v4 as uuid } from 'uuid';
import { locale } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import GoogleTagManager from '@/utils/scripts/googleTagManager';

const parseLegId = (id: string) => {
  const [origin, departure, idMarketingCarriers, stopCount, destination, arrival] = id.split('-');
  const marketingCarriers = idMarketingCarriers?.split(',');
  return {
    origin,
    destination,
    departure,
    arrival,
    marketingCarriers,
    stopCount,
  };
};

const parseItineraryId = (id: string) => {
  const legs = id.split('|');
  return legs.map((leg) => parseLegId(leg));
};

const Redirect = ({
  translationContent: { ticketDetails, cabinClasses },
}: {
  translationContent: {
    ticketDetails: string;
    cabinClasses: {
      Economy: string;
      premium: string;
      First: string;
      Business: string;
    };
  };
}) => {
  const locale = useLocale() as locale;
  const t = useTranslations();

  const searchParams = useSearchParams();
  const router = useRouter();
  const itineraryId = searchParams.get('itineraryId') || '';
  const tripType = searchParams.get('tripType') || '';
  const price = searchParams.get('price') || '';
  const currency = searchParams.get('currency') || '';
  const cabin = searchParams.get('cabin') || '';
  const agentName = searchParams.get('agentName') || '';
  const itenraries = parseItineraryId(itineraryId!);
  const visitorId = globalDataGetter('client', 'visitorId') || uuid(); //visitor id used for payment so It get from local storage if not found create it 
  const searchId = searchParams.get('searchId') || '';
  const token = searchParams.get('token') || '';
  const country = searchParams.get('country') || '';
  const utm_source = searchParams.get('utm_source') || 'travolic';
  const adults = searchParams.get('adults') || 1;
  const children = searchParams.get('children') || 0;
  const infants = searchParams.get('infants') || 0;
  const segments = typeof window !== 'undefined' ? localStorage.getItem('redirectSegments') : '';
  // this is a params providers needs to be added at redirect url for some tracking side ex: tracking the users come from ad server
  const providerParams=searchParams.get('providerParams') || null;


  //recaptcha
  const { executeRecaptcha, loaded } = useReCaptcha();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleRedirect = async () => {
    const data: flightRedirectPayloadType = {
      searchId,
      visitorId,
      itineraryId,
      adults,
      children,
      infants,
      price,
      currency,
      token,
      type: tripType,
      country,
      utm_source,
      segments: segments ? parse(segments) : [],
    };

    const trackingData: flightRedirectTrackingData = {
      ...data,
      itenraries,
      cabin,
    };

    const errorURL = `book/error/?searchId=${searchId}&visitorId=${visitorId}&itineraryId=${itineraryId}&adults=${adults}&children=${children}&infants=${infants}&price=${price}&currency=${currency}&token=${token}&type=flight&country=${country}&utm_source=${utm_source}&agentName=${agentName}`;

    const response = await redirectRequest({ ...data, type: 'flight' }, locale, recaptchaToken);
    if (response) {
      if (response.url === '') {
        router.replace(errorURL);
      } else {
        eventsOnFlightRedirect(trackingData, agentName);
        setTimeout(() => {
          if (providerParams) {
            router.replace(response.url+ `&${providerParams}`);
          }else{
            router.replace(response.url)
          }
          
        }, 1500);
     
      }
    } else {
      flightRedirectTracking(trackingData, agentName, false);
      router.replace(errorURL);
    }
  };
  //recaptch generation
  const _getRecaptchaToken = async () => {
    const token = await executeRecaptcha('flightRedirect');
    setRecaptchaToken(token);
  };

  //recaptch
  useEffect(() => {
    if (!recaptchaToken && loaded) {
      _getRecaptchaToken();
    }
  }, [loaded]);

  useEffect(() => {
    if (recaptchaToken) {
      handleRedirect();
    }
  }, [recaptchaToken]);

  return (
    <Container dir="ltr" className={styles.mainContainer}>
       {/* It must be loaded first to can track redirect operations */}
       <GoogleTagManager strategy='afterInteractive' />
      <ImagesComponent agentImageUrl={agentImgUrl(agentName!)} />

      <p className={styles.textContainer} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {t.rich('1WkCZ_7Ac5eavB1zlGcri', {
          agentName,
          br: () => <br />,
        })}
      </p>
      <TicketDetails
        flgihtCost={{ amount: Number(price), currency: currency! }}
        itenraries={itenraries}
        agentImageUrl={agentImgUrl(agentName!)}
        cabinClass={cabinClasses[cabin! as keyof typeof cabinClasses] || cabin!}
        ticketDetails={ticketDetails}
      />
    </Container>
  );
};

export default Redirect;
