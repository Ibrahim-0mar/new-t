import Button from '@/components/common/base/Button';
import {
  getSessionId,
  getUtmCampaign,
  getUtmContent,
  getUtmMedium,
  getUtmSource,
  getUtmTerm,
} from '@/utils/ads/actions';
import { parse } from '@/utils/helper/json';
import { cn } from '@/utils/helper/tailwind_cn';
import { ArrowUp, SquareCheckBig, X } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { UserAgentDetails } from '../../soloAdvertiser';
import styles from './index.module.css';
import { generateNewVisitorId } from '../../functions';

const CompareAllMobile = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalRef = useRef<null | HTMLDialogElement>(null);

  const params = useParams();
  const searchParams = useSearchParams();

  const departure_origins = params.legs[0].split('-')[0].split('_');
  const departure_destinations = params.legs[0].split('-')[1].split('_');
  const departure_date = params.legs[1];
  const return_origins = params.legs[2]?.split('-')[0]?.split('_');
  const return_destinations = params.legs[2]?.split('-')[1]?.split('_');
  const return_date = params.legs[3];

  // searchParams
  const children = searchParams.get('children');
  const adults = searchParams.get('adults');
  const infants = searchParams.get('infants');
  const cabin = searchParams.get('cabin');
  const stops = searchParams.get('stops');
  const nearby_origin = searchParams.get('nearby_origin');

  const tripType = (() => {
    const departureTrip = params.legs[0];
    const returnTrip = params.legs[2];

    if (departureTrip && returnTrip) {
      return checkTripType(departureTrip, returnTrip);
    } else {
      return 'one-way';
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
          origin: departure_origins[0], //todo: use array instead of first index
          destination: departure_destinations[0], //todo: use array instead of first index
          time: 'Morning',
        },
        {
          date: return_date,
          origin: return_origins[0], //todo: use array instead of first index
          destination: return_destinations[0], //todo: use array instead of first index
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
      };

      window.MediaAlphaExchange__load({
        Zqo4UIo7JA8UKjncK3aQoGjeKj16GA: 'mediaAlpha_sideRailMobile',
      });
    }
  };

  const openModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const closeModal = (event: MouseEvent) => {
    if (event.target === modalRef.current) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      modalElement.addEventListener('click', closeModal);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener('click', closeModal);
      }
    };
  }, [showModal]);

  return (
    <>
      <div className={styles.container}>
        <Button onClick={openModal} variant="secondary" className={styles.button}>
          <SquareCheckBig />
          Compare
        </Button>
      </div>
      <section
        ref={modalRef}
        className={cn(
          'inset-0 z-[100] flex items-center justify-center bg-black/40',
          showModal ? 'fixed' : 'hidden',
        )}
      >
        <div className={cn('min-h-[30vh] w-[90%] rounded-md bg-white  shadow-lg ')}>
          <div className="flex items-center justify-between bg-gray-100">
            <p className="flex items-center justify-start gap-2 px-5 text-2xl font-semibold">
              Compare all prices <ArrowUp className="rotate-45" size={20} />
            </p>
            <Button
              onClick={openModal}
              variant="default"
              className="border-2 border-black/70 !py-5"
            >
              <X size={30} />
            </Button>
          </div>
          <div id="mediaAlpha_sideRailMobile"></div>
        </div>
      </section>
      <Script
        defer
        async
        id="mediaAlpha_sideRailMobile"
        src="https://content.travolic.com/scripts/medialpha.js"
        strategy="lazyOnload"
        onLoad={handleScriptLoad}
      />
    </>
  );
};

export default CompareAllMobile;
