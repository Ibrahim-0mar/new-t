import { multiCitySearchType } from '@/components/common/custom/searchboxes/DefaultSearchbox/components/flights/FlightsSearch';
import { parse } from '@/utils/helper/json';
import { soloAdvertiserSchema } from '@/utils/schemas/common';
import { flightSearchboxOriginType } from '@/utils/types/flights';
import dayjs from 'dayjs';
import {
  getSessionId,
  getUtmCampaign,
  getUtmContent,
  getUtmMedium,
  getUtmSource,
  getUtmTerm,
} from '../../actions';
import { generateNewVisitorId } from '../functions';
import { KayakDomains } from '@/services/data/car-rental/kayakDomains';

interface tripType {
  origin: flightSearchboxOriginType[];
  destination: flightSearchboxOriginType[];
  date: [Date, Date | undefined];
}

export interface UserAgentDetails {
  ua: string;
  browser: {
    name: string;
    version: string;
    major: string;
  };
  engine: {
    name: string;
    version: string;
  };
  os: {
    name: string;
    version: string;
  };
  device: {
    type: string;
  };
  cpu: {
    architecture: string;
  };
}

const soloAdvertiser = async (data: multiCitySearchType) => {
  const schemaValue = await soloAdvertiserSchema
    .validate(data)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });

  const sub_tripType =
    data.tripType === 'round-trip' ? 'round' : data.tripType === 'one-way' ? 'oneway' : 'multi';

  const localStorateData: UserAgentDetails = parse(
    localStorage.getItem('userAgentDetails') as string,
  );

  const visitorId = parse(localStorage.getItem('visitorId') as string) || generateNewVisitorId();
  const userEmail = parse(localStorage.getItem('HUE') as string);
  // const country = parse(localStorage.getItem('country') as string);
  const [sessionID, utmSource, utmCampaign, utmTerm, utmContent, utmMedium] = await Promise.all([
    getSessionId(),
    getUtmSource(),
    getUtmCampaign(),
    getUtmTerm(),
    getUtmContent(),
    getUtmMedium(),
  ]);

  const convertTrips = (trips: tripType[]) => {
    return trips
      .map((trip) => {
        const tripData = [];

        switch (data.tripType) {
          case 'one-way':
            tripData.push({
              date: dayjs(trip.date[0]).format('YYYY-MM-DD'),
              destination: trip.destination[0].code.substring(0, 3),
              origin: trip.origin[0].code.substring(0, 3),
              time: 'Morning',
            });
            break;
          case 'round-trip':
            tripData.push({
              date: dayjs(trip.date[0]).format('YYYY-MM-DD'),
              destination: trip.destination[0].code.substring(0, 3),
              origin: trip.origin[0].code.substring(0, 3),
              time: 'Morning',
            });
            if (trip.date[1]) {
              tripData.push({
                date: dayjs(trip.date[1]).format('YYYY-MM-DD'),
                destination: trip.origin[0].code.substring(0, 3), // Assuming return to original origin
                origin: trip.destination[0].code.substring(0, 3),
                time: 'Morning',
              });
            }
            break;
          case 'multi-city':
            trip.origin.forEach((origin, index) => {
              if (trip.destination[index] && trip.date[index]) {
                tripData.push({
                  date: dayjs(trip.date[index]).format('YYYY-MM-DD'),
                  destination: trip.destination[index].code.substring(0, 3),
                  origin: origin.code.substring(0, 3),
                  time: 'Morning',
                });
              }
            });
            break;
          default:
            console.error('Unknown trip type:', data.tripType);
        }

        return tripData;
      })
      .flat();
  };

  // this for open kayak car rental search when mediaalpha solo not opened
  const openKayakPlacement = () => {
    const country = parse(localStorage.getItem('country') as string);
    const domain =
      country && Object(KayakDomains).hasOwnProperty(country?.code?.toUpperCase())
        ? KayakDomains[country?.code?.toUpperCase()].fullDomainName.replace('kayak', 'cheapflights')
        : 'https://www.kayak.com';

    let dates = dayjs(data?.trips[0]?.date[0]).format('YYYY-MM-DD');

    if (data.tripType != 'oneway') {
      dates += `/${dayjs(data?.trips[0]?.date[1]).format('YYYY-MM-DD')}`;
    }

    const url = `${domain}/in?a=kan_220420&encoder=27_1&enc_lid=solo_ad&enc_pid=deep
  link&url=/s/horizon/flights/search/brands/cheapflights/Redirect?url=flight-search/${data?.trips[0]?.origin[0]?.code}-${data?.trips[0]?.destination[0]?.code}/${dates}/${data.passengers[0]}adults`;
    window.location.replace(url);
  };

  if (
    typeof window != undefined &&
    typeof window.MediaAlphaExchange__load == 'function' &&
    schemaValue
  ) {
    window.MediaAlphaExchange = {
      data: {
        add_car: 0,
        add_hotel: 0,
        flexible_dates: 0,
        flights: convertTrips(data.trips),
        max_stops: 10,
        nearby_airports: 1,
        num_adults: data.passengers[0],
        num_children: data.passengers[1],
        num_infants_in_lap: 0,
        num_infants_in_seat: 0,
        num_seniors: 0,
        preferred_airlines: [],
        preferred_cabin_class: data.cabin.value,
        refundable_fare: 0,
      },
      locale: 'en',
      placement_id: ['daURJww0ioAX_T9hqEpRf_Z4ggGg1g'],
      sub_1: `id=${userEmail || visitorId}&BW=${localStorateData.browser.name}&OS=${localStorateData.os.name}&DV=${localStorateData.device.type}`,
      sub_2: `O=${data.trips[0].origin[0].code.substring(0, 3)}&D=${data.trips[0].destination[0].code.substring(0, 3)}&TT=${sub_tripType}&DP=${dayjs(data.trips[0].date[0]).format('YYYY-MM-DD')}&RE=${dayjs(data.trips[0].date[1]).format('YYYY-MM-DD')}&AD=${data.passengers[0] || 1}&CD=${data.passengers[1] || 0}&IF=${data.passengers[2] || 0}&TC=${data.cabin.id}`,
      sub_3: `SC=${utmSource}&CA=${utmCampaign}&TM=${utmTerm}&CN=${utmContent}&MM=${utmMedium}&SI=${parse(sessionID as string)}`,
      type: 'ad_unit',
      version: '17',
      callbacks: {
        error: () => {
          if (process.env.NODE_ENV === 'production') {
            openKayakPlacement(); //Open Kayak car rental when error occured
          }
        },
        success: () => {
          // if success but not opened and user still on travolic domain
          setTimeout(() => {
            if (
              process.env.NODE_ENV === 'production' &&
              window.location.href.includes(
                process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://travolic.com',
              )
            ) {
              openKayakPlacement(); //Open Kayak car rental when error occured
            }
          }, 3000);
        },
        search_error: () => {
          if (process.env.NODE_ENV === 'production') {
            openKayakPlacement(); //Open Kayak car rental when error occured
          }
        },
      },
    };

    window.MediaAlphaExchange__load({
      daURJww0ioAX_T9hqEpRf_Z4ggGg1g: 'solo_advertiser',
    });
  }
};

export default soloAdvertiser;
