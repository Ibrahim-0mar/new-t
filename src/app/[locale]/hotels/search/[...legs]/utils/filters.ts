import {
  oneWorld,
  skyTeam,
  starAlliance,
  valueAlliance,
} from '@/services/data/flights/aliances';
import dayjs from 'dayjs';

export interface FLightsFilterType {
  stops: any;
  departure: 'all' | { [x: number]: [number, number] };
  return: 'all' | { [x: number]: [number, number] };
  duration: 'all' | [number, number];
  price: 'all' | [number, number];
  airlines: 'all' | string[];
  aliances: any;
  stopover: 'all' | string[];
  bookingSites: 'all' | string[];
  airports: any;
}

export interface HotelsFilterType {
  price: 'all' | [number, number];
}

export const _getAirlines = (airlines: any, prices: any) => {
  const updatedAirlines = [];

  for (let i = 0; i < Object.keys(airlines).length; i++) {
    const key = Object.keys(airlines)[i];
    if (
      typeof airlines[key] === 'object' &&
      Object(airlines[key]).hasOwnProperty('code') &&
      airlines[key]?.code?.length > 0 &&
      prices[key]
    ) {
      updatedAirlines.push({ ...airlines[key], price: prices[key] });
    }
  }
  return updatedAirlines;
};

export const _getStopovers = (airports: any, prices: any) => {
  const stopovers = [];

  for (let i = 0; i < Object.keys(airports).length; i++) {
    const key = Object.keys(airports)[i];
    if (
      typeof airports[key] === 'object' &&
      airports[key]?.code?.length > 0 &&
      prices[key]
    ) {
      stopovers.push({ ...airports[key], price: prices[key] });
    }
  }
  return stopovers;
};

export const _getBookingSites = (agents: any, prices: any) => {
  const updatedBookingSites = [];

  for (let i = 0; i < Object.keys(agents).length; i++) {
    const key = Object.keys(agents)[i];
    if (typeof agents[key] === 'object') {
      updatedBookingSites.push({ ...agents[key], price: prices[key] });
    }
  }
  return updatedBookingSites;
};

const getDirectItineraries = (itineraries: any) =>
  itineraries.filter((itinerary: any) =>
    itinerary.legs.every((leg: any) => leg.segments.length === 1),
  );

// get itineraries that has a one stop at (one stop & direct only)
const getTO1Itineraries = (itineraries: any) =>
  itineraries.filter(
    (itinerary: any) =>
      itinerary.legs.some((leg: any) => leg.segments.length === 2) &&
      itinerary.legs.every((leg: any) => leg.segments.length < 3),
  );

const getTO2Itineraries = (itineraries: any) =>
  itineraries.filter((itinerary: any) =>
    itinerary.legs.some((leg: any) => leg.segments.length > 2),
  );

export const filterByStops = (filters: any, itineraries: any) => {
  let stopsItineraries: any[] = [];
  if (filters === 'all' || filters?.length === 3) {
    stopsItineraries = [...itineraries];
  } else if (filters.length === 0) {
    stopsItineraries = [];
  } else {
    if (filters.includes(0)) {
      stopsItineraries = [
        ...stopsItineraries,
        ...getDirectItineraries(itineraries),
      ];
    }
    if (filters.includes(1)) {
      stopsItineraries = [
        ...stopsItineraries,
        ...getTO1Itineraries(itineraries),
      ];
    }
    if (filters.includes(2)) {
      stopsItineraries = [
        ...stopsItineraries,
        ...getTO2Itineraries(itineraries),
      ];
    }
  }
  return stopsItineraries;
};

//***********  alliances *************/

const getOneWorldItineraries = (itineraries: any) =>
  itineraries.filter((itinerary: any) =>
    itinerary.legs.every((leg: any) =>
      leg.marketingCarriers.every((airline: string) =>
        oneWorld.includes(airline),
      ),
    ),
  );

const getSkyTeamItineraries = (itineraries: any) =>
  itineraries.filter((itinerary: any) =>
    itinerary.legs.every((leg: any) =>
      leg.marketingCarriers.every((airline: string) =>
        skyTeam.includes(airline),
      ),
    ),
  );

const getStarAllianceItineraries = (itineraries: any) =>
  itineraries.filter((itinerary: any) =>
    itinerary.legs.every((leg: any) =>
      leg.marketingCarriers.every((airline: string) =>
        starAlliance.includes(airline),
      ),
    ),
  );

const getValueItineraries = (itineraries: any) =>
  itineraries.filter((itinerary: any) =>
    itinerary.legs.every((leg: any) =>
      leg.marketingCarriers.every((airline: string) =>
        valueAlliance.includes(airline),
      ),
    ),
  );

export const filterByAlliances = (
  filters: string[] | string,
  itineraries: any[],
) => {
  const alliancesItineraries: any[] = [];

  if (filters === 'all' || filters.length === 4) {
    return itineraries;
  }
  if (filters.includes('oneWorld')) {
    alliancesItineraries.push(...getOneWorldItineraries(itineraries));
  }
  if (filters.includes('skyTeam')) {
    alliancesItineraries.push(...getSkyTeamItineraries(itineraries));
  }
  if (filters.includes('starAlliance')) {
    alliancesItineraries.push(...getStarAllianceItineraries(itineraries));
  }
  if (filters.includes('valueAlliance')) {
    alliancesItineraries.push(...getValueItineraries(itineraries));
  }

  return alliancesItineraries;
};

// filter by airlines
export const filterByAirlines = (
  filters: 'all' | string[],
  itineraries: any[],
) => {
  if (filters.length == 0) {
    return [];
  } else if (filters === 'all') {
    return itineraries;
  } else {
    const filteredItineraries: any = [];
    filters.map((airline) => {
      filteredItineraries.push(
        ...itineraries.filter((itinerary) => {
          return itinerary.legs.every((leg: any) => {
            return leg.marketingCarriers.every(
              (carrier: any) => carrier === airline,
            );
          });
        }),
      );
    });
    if (filters.includes('combination')) {
      filteredItineraries.push(
        ...itineraries.filter((itinerary) => {
          return itinerary.legs.some((leg: any) => {
            return leg.marketingCarriers.some(
              (carrier: any) =>
                carrier != itinerary.legs[0].marketingCarriers[0], // check if there is different airlines in the same itinerary
            );
          });
        }),
      );
    }
    return filteredItineraries;
  }
};
// filter by airlines
export const filterByBookingSites = (
  filters: 'all' | string[],
  itineraries: any[],
) => {
  if (filters.length == 0) {
    return [];
  } else if (filters === 'all') {
    return itineraries;
  } else {
    return itineraries
      .map((itinerary) => {
        return {
          ...itinerary,
          pricingOptions: itinerary.pricingOptions.filter(
            (pricingOption: any) =>
              filters.indexOf(pricingOption.agentId || pricingOption.agent) !==
              -1,
          ),
        };
      })
      .filter((itinerary) => itinerary.pricingOptions.length > 0);
  }
};

// filter by stopovers
export const filterByStopovers = (
  filters: 'all' | string[],
  itineraries: any[],
) => {
  if (filters.length == 0) {
    return [];
  } else if (filters === 'all') {
    return itineraries;
  } else {
    const filteredItineraries: any = [];
    filters.map((airport) => {
      filteredItineraries.push(
        ...itineraries.filter((itinerary) => {
          return itinerary.legs.some((leg: any) => {
            return leg.segments.some(
              (segment: any) =>
                segment.origin === airport || segment.destination === airport,
            );
          });
        }),
      );
    });

    return filteredItineraries;
  }
};

export const filterByPrice = (
  filters: 'all' | [number, number],
  itineraries: any[],
) => {
  if (filters === 'all') {
    return itineraries;
  } else {
    const filteredItineraries: any = [];

    filteredItineraries.push(
      ...itineraries.filter((itinerary) => {
        return (
          itinerary.minPrice >= filters[0] && itinerary.minPrice <= filters[1]
        );
      }),
    );

    return filteredItineraries;
  }
};

// filter by duration

export const filterByDuration = (
  filters: 'all' | [number, number],
  itineraries: any[],
) => {
  if (filters === 'all') {
    return itineraries;
  } else {
    const filteredItineraries: any = [];

    filteredItineraries.push(
      ...itineraries.filter((itinerary) => {
        return (
          itinerary.duration >= filters[0] && itinerary.duration <= filters[1]
        );
      }),
    );

    return filteredItineraries;
  }
};

// filter by Departure

export const filterByDeparture = (
  filters: 'all' | { [x: number]: [number, number] },
  itineraries: any[],
) => {
  if (filters === 'all') {
    return itineraries;
  } else {
    const filteredItineraries: any = [];
    Object.keys(filters).map((key: string) => {
      filteredItineraries.push(
        ...itineraries.filter((itinerary) => {
          return (
            dayjs(itinerary.legs[Number(key)].departure).valueOf() >=
              filters[Number(key)][0] &&
            dayjs(itinerary.legs[Number(key)].departure).valueOf() <=
              filters[Number(key)][1]
          );
        }),
      );
    });

    return filteredItineraries;
  }
};

// filter by arrival time

export const filterByArrival = (
  filters: 'all' | { [x: number]: [number, number] },
  itineraries: any[],
) => {
  if (filters === 'all') {
    return itineraries;
  } else {
    const filteredItineraries: any = [];
    Object.keys(filters).map((key: string) => {
      filteredItineraries.push(
        ...itineraries.filter((itinerary) => {
          return (
            dayjs(itinerary.legs[Number(key)].arrival).valueOf() >=
              filters[Number(key)][0] &&
            dayjs(itinerary.legs[Number(key)].arrival).valueOf() <=
              filters[Number(key)][1]
          );
        }),
      );
    });

    return filteredItineraries;
  }
};

// filter by arrival

export const filterByArrivalAirports = (
  filters: string[],
  itineraries: any[],
) => {
  if (filters.length === 0) {
    return [];
  } else {
    const filteredItineraries: any = [];
    itineraries.map((itinerary) => {
      if (itinerary.legs.some((leg: any) => filters.includes(leg.destination))) {
        filteredItineraries.push(itinerary);
      }
    })

    return filteredItineraries;
  }
};

// filter by arrival

export const filterByDepartureAirports = (
  filters: string[],
  itineraries: any[],
) => {
  if (filters.length === 0) {
    return [];
  } else {
    const filteredItineraries: any = [];
    itineraries.map((itinerary) => {
      if (itinerary.legs.some((leg: any) => filters.includes(leg.origin))) {
        filteredItineraries.push(itinerary);
      }
    })
    return filteredItineraries;
  }
};

export const _getInitialAirports = (
  legs: any,
  type: 'origin' | 'destination',
) => {
  const airports: string[] = [];
  legs.map((leg: any, index: number) => {
    if (index % 2 === 0) {
      airports.push(
        ...[...leg.split('-')[type === 'origin' ? 0 : 1].split('_')],
      );
    }
  });
  return airports;
};

export const _getLegsFromParams = (legs: any) => {
  const updatedLegs: any = [];
  legs.map((leg: any, index: number) => {
    if (index % 2 === 0) {
      updatedLegs.push(leg.split('-'));
    }
  });
  return updatedLegs;
};
