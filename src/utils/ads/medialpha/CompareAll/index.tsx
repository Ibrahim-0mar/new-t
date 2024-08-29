import { Skeleton } from '@/components/common/base/Skeleton';
import { parse } from '@/utils/helper/json';
import { cn } from '@/utils/helper/tailwind_cn';
import { useParams, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useState } from 'react';
import {
  getSessionId,
  getUtmCampaign,
  getUtmContent,
  getUtmMedium,
  getUtmSource,
  getUtmTerm,
} from '../../actions';
import { UserAgentDetails } from '../soloAdvertiser';
import { generateNewVisitorId } from '../functions';

const CompareAll = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const params = useParams();
  const searchParams = useSearchParams();

  const departure_origins = params.legs[0].split('-')[0].split('_');
  const departure_destinations = params.legs[0].split('-')[1].split('_');
  const departure_date = params.legs[1];
  const return_origins = params.legs[2]?.split('-')[0]?.split('_');
  const return_destinations = params.legs[2]?.split('-')[1]?.split('_');
  const return_date = params.legs[3];

  // searchParams
  const children = searchParams.get('children') || '0';
  const adults = searchParams.get('adults') || '1';
  const infants = searchParams.get('infants') || '0';
  const cabin = searchParams.get('cabin') || 'Economy';
  const stops = searchParams.get('stops') || '0';
  const nearby_origin = searchParams.get('nearby_origin');

  const tripType = (() => {
    const departureTrip = params.legs[0];
    const returnTrip = params.legs[2];

    if (departureTrip && returnTrip) {
      return checkTripType(departureTrip, returnTrip);
    } else {
      return 'oneway';
    }
  })();

  function checkTripType(string1: string, string2: string) {
    // Split each string into parts based on the '-' delimiter
    const parts1 = string1.split('-');
    const parts2 = string2.split('-');

    // Check if the cities are in reverse order
    if (parts1[0] === parts2[1] && parts1[1] === parts2[0]) {
      return 'round';
    } else {
      return 'multi';
    }
  }

  // sub IDs
  const getFlights = () => {
    if (return_origins && return_destinations && return_date) {
      return [
        {
          date: departure_date,
          origin: departure_origins[0].substring(0,3), //todo: use array instead of first index
          destination: departure_destinations[0].substring(0,3), //todo: use array instead of first index
          time: 'Morning',
        },
        {
          date: return_date,
          origin: return_origins[0].substring(0,3), //todo: use array instead of first index
          destination: return_destinations[0].substring(0,3), //todo: use array instead of first index
          time: 'Morning',
        },
      ];
    } else {
      return [
        {
          date: departure_date,
          origin: departure_origins[0], //todo: use array instead of first index
          destination: departure_destinations[0], //todo: use array instead of first index
          time: 'Morning',
        },
      ];
    }
  };

  const handleScriptLoad = async () => {
    const visitorId = parse(localStorage.getItem('visitorId') as string) || generateNewVisitorId();
    const userEmail = parse(localStorage.getItem('HUE') as string);
    const localStorateData: UserAgentDetails = parse(
      localStorage.getItem('userAgentDetails') as string,
    );
    const [sessionID, utmSource, utmCampaign, utmTerm, utmContent, utmMedium] = await Promise.all([
      getSessionId(),
      getUtmSource(),
      getUtmCampaign(),
      getUtmTerm(),
      getUtmContent(),
      getUtmMedium(),
    ]);

    if (typeof window != undefined && typeof window.MediaAlphaExchange__load == 'function') {
      window.MediaAlphaExchange = {
        data: {
          add_car: 0,
          add_hotel: 0,
          flexible_dates: 0,
          flights: getFlights(),
          max_stops: stops ? parseInt(stops) : 10,
          nearby_airports: nearby_origin === 'true' ? 1 : 0,
          num_adults: adults ? parseInt(adults) : 1,
          num_children: children ? parseInt(children) : 0,
          num_infants_in_lap: 0,
          num_infants_in_seat: 0,
          num_seniors: 0,
          preferred_airlines: [],
          preferred_cabin_class:
            cabin === 'Premium_Economy' ? 'Premium Economy' : cabin ? cabin : 'Economy',
          refundable_fare: 0,
        },
        locale: 'en',
        placement_id: ['Zqo4UIo7JA8UKjncK3aQoGjeKj16GA'],
        sub_1: `id=${userEmail || visitorId}&BW=${localStorateData.browser.name}&OS=${localStorateData.os.name}&DV=${localStorateData.device.type}`,
        sub_2: `O=${departure_origins}&D=${departure_destinations}&TT=${tripType}&DP=${departure_date}&RE=${return_date}&AD=${adults}&CD=${children}&IF=${infants}&TC=${
          cabin === 'Premium_Economy' ? 'Premium Economy' : cabin ? cabin : 'Economy'
        }`,
        sub_3: `SC=${utmSource}&CA=${utmCampaign}&TM=${utmTerm}&CN=${utmContent}&MM=${utmMedium}&SI=${parse(sessionID as string)}`,
        type: 'ad_unit',
        version: '17',
        callbacks: {
          success: () => {
            setIsLoaded(false);
          },
        },
      };

      window.MediaAlphaExchange__load({
        Zqo4UIo7JA8UKjncK3aQoGjeKj16GA: 'mediaAlpha_sideRail',
      });
    }
  };

  return (
    <>
      {isLoaded && <Skeleton className="h-[300px] w-[300px]" />}
      <div id="mediaAlpha_sideRail" className={cn('w-[300px]', isLoaded ? 'hidden' : 'block')}>
        <span className="sr-only">Compare all prices</span>
      </div>

      <Script
        defer
        async
        id="mediaAlpha_sideRail"
        src="https://content.travolic.com/scripts/medialpha.js"
        strategy="lazyOnload"
        onLoad={handleScriptLoad}
      />
    </>
  );
};

export default CompareAll;
