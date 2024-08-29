import { sortAscending } from '@/utils/helper/numbers';
import {
  AirportTransfersLegType,
  AirportTransfersResultType,
} from '@/utils/types/airport-transfers/results';
export const mergeResults = (
  source: AirportTransfersResultType,
  target: AirportTransfersResultType,
) => {
  return {
    ...source,
    agents: { ...source.agents, ...target.agents },
    legs: { ...source.legs, ...target.legs },
    itineraries: mergeIneraries(source.itineraries, target.itineraries),
    searchId: target.searchId,
  };
};
const mergeIneraries = (source: BackendItinerariesType, target: BackendItinerariesType) => {
  if (!target) return source;

  const targetKeys = Object.keys(target);

  if (!source || !target) {
    return source;
  }
  const newItineraries = { ...source };

  targetKeys.forEach((key) => {
    const pricingOptions = [
      ...target[key].pricingOptions,
      ...(source[key] ? source[key].pricingOptions : []),
    ];

    for (let index1 = 0; index1 < pricingOptions.length; index1++) {
      for (let index2 = index1 + 1; index2 < pricingOptions.length; index2++) {
        if (pricingOptions[index1].agent === pricingOptions[index2].agent) {
          if (pricingOptions[index1].price?.amount > pricingOptions[index2].price?.amount) {
            const index = pricingOptions.indexOf(pricingOptions[index1]);
            pricingOptions.splice(index, 1);
          } else {
            const index = pricingOptions.indexOf(pricingOptions[index2]);
            pricingOptions.splice(index, 1);
          }
        }
      }
    }

    newItineraries[key] = {
      ...target[key],
      pricingOptions,
    };
  });
  return newItineraries;
};

const getItineraryDetails = (itinerary: BackendItineraryType, data: AirportTransfersResultType) => {
  const legs: any[] = _getLegs(itinerary.legs, data);
  const itineraryWithLegs = {
    ...itinerary,
    minPrice: Number(itinerary.pricingOptions[0].price.amount),
    // pricingOptions: _handlePricingOptions(itinerary.pricingOptions),
    legs,
    duration: _getTotalDuration(legs),
  }; // add the legs to the itinerary
  return itineraryWithLegs; // return the itinerary with the legs
};

const _getTotalDuration = (legs: AirportTransfersLegType[]) => {
  let totalDuration = 0;
  for (let i = 0; i < legs.length; i++) {
    totalDuration += Number(legs[i].time);
  }
  return totalDuration;
};

const _getLegs = (legs: string[], data: AirportTransfersResultType) => {
  const updatedLegs = legs.map((leg: string) => {
    if (typeof leg != 'object') {
      return data.legs[leg];
    } else {
      return leg;
    }
  });
  return updatedLegs;
};

export const handleItineriesShape = (
  data: AirportTransfersResultType,
): AirportTransfersResultType => {
  const itineraries = Object.keys(data.itineraries).reduce((acc, current) => {
    const details = getItineraryDetails(data.itineraries[current], data);
    return {
      ...acc, // the last itineraries
      [current]: details,
    };
  }, {});

  return {
    ...data,
    itineraries,
    itinerariesPrice: Object.values(itineraries).sort((a: any, b: any) =>
      sortAscending(a.minPrice, b.minPrice),
    ),
  };
};
