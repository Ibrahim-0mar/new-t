'use client';
import ImagesComponent from '@/app/[locale]/airport-transfers/book/components/imagesComponent';
import TicketDetails from '@/app/[locale]/airport-transfers/book/components/ticketDetails';
import Container from '@/components/common/base/Container';
import { locale, useRouter } from '@/navigation';
import { redirectRequest } from '@/services/apis/flights/results';
import { eventsOnAirportTransferRedirect } from '@/utils/events/airportTransfers/search';
import { airportTransfersAgentImgUrl } from '@/utils/helper/imgUrl';
import { parse } from '@/utils/helper/json';
import { useLocale, useTranslations } from 'next-intl';
import { useReCaptcha } from 'next-recaptcha-v3';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { AirportTransfersRedirectPayloadType } from '@/utils/types/airport-transfers/results';
import GoogleTagManager from '@/utils/scripts/googleTagManager';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { v4 as uuid } from 'uuid';

const Redirect = ({
  translationContent: { ticketDetails, header, subHeader, passengers },
}: {
  translationContent: {
    ticketDetails: string;
    header: string;
    subHeader: string;
    passengers: string;
  };
}) => {
  const locale = useLocale() as locale;
  const t = useTranslations();

  const searchParams = useSearchParams();
  const router = useRouter();
  const itineraryId = searchParams.get('itineraryId') || '';
  const price = searchParams.get('price') || '';
  const currency = searchParams.get('currency') || '';
  const agentName = searchParams.get('agentName') || '';
  const visitorId = globalDataGetter('client', 'visitorId') || uuid(); //visitor id used for payment so It get from local storage if not found create it ;
  const searchId = searchParams.get('searchId') || '';
  const token = searchParams.get('token') || '';
  const country = searchParams.get('country') || '';
  const utm_source = searchParams.get('utm_source') || 'travolic';
  const adults = searchParams.get('adults') || 1;
  const children = searchParams.get('children') || 0;
  const infants = searchParams.get('infants') || 0;
  const maxBags = searchParams.get('maxBags');
  const maxPassengers = searchParams.get('maxPassengers');
  const viehcleType = searchParams.get('viehcleType');
  const isCheapest = searchParams.get('isCheapest');
  const legs =
    typeof window !== 'undefined' ? localStorage.getItem('airportTransferredirectLegs') : '';

  //recaptcha
  const { executeRecaptcha, loaded } = useReCaptcha();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleRedirect = async () => {
    const data: AirportTransfersRedirectPayloadType = {
      utm_source,
      legs: legs ? parse(legs) : [],
      searchId,
      visitorId,
      itineraryId,
      adults,
      children,
      infants,
      price,
      currency,
      token,
      type: 'transfer',
    };
    const redirectTrackingData = { ...data, maxBags, maxPassengers, viehcleType, isCheapest };

    const errorURL = `book/error/?searchId=${searchId}&visitorId=${visitorId}&itineraryId=${itineraryId}&adults=${adults}&children=${children}&infants=${infants}&price=${price}&currency=${currency}&token=${token}&type=transfer&country=${country}&utm_source=${utm_source}&agentName=${agentName}`;
    const response = await redirectRequest(data, locale, recaptchaToken);
    if (response) {
      if (response.url === '') {
        router.replace(errorURL);
      } else {
        eventsOnAirportTransferRedirect(redirectTrackingData, agentName, true);
        setTimeout(() => {  
          router.replace(response.url);
        }, 3000);
      }
    } else {
      eventsOnAirportTransferRedirect(redirectTrackingData, agentName, false);
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
      <h3 className={styles.header}>{header}</h3>
      <p className={styles.subHeader}>{subHeader}</p>
      <ImagesComponent agentImageUrl={airportTransfersAgentImgUrl(agentName!)} />

      <p className={styles.textContainer}>{t('HDxRETX_S8xBR3HaRYQtr', { agentName })}</p>
      <TicketDetails
        flgihtCost={{ amount: Number(price), currency: currency! }}
        agentImageUrl={airportTransfersAgentImgUrl(agentName!)}
        translations={{ ticketDetails, passengers }}
        agentName={agentName!}
      />
    </Container>
  );
};

export default Redirect;
