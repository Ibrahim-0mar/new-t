import { sortAscending } from '@/utils/helper/numbers';
export const mergeResults =(
  source: FlightResultType,
  target: FlightResultType,
) => {
  return {
    ...source,
    airlines: { ...source.airlines,  ...(target.airlines ||{}) },
    airports: { ...source.airports, ...(target.airports||{}) },
    agents: { ...source.agents, ...(target.agents||{}) },
    legs: { ...source.legs, ...(target.legs||{}) },
    segments: { ...source.segments, ...(target.segments||{}) },
    itineraries: mergeIneraries(source.itineraries, target.itineraries),
    flightDetails: { ...source.flightDetails, ...(target.flightDetails||{}) },
    codeShare: { ...source.codeShare, ...(target.codeShare||{}) },
    filterAirports: {
      departure: {
        ...source.filterAirports?.departure,
        ...(target.filterAirports?.departure||{}),
      },
      arrival: {
        ...source.filterAirports?.arrival,
        ...(target.filterAirports?.arrival||{}),
      },
    },
    searchId: target.searchId,
  };
};
const mergeIneraries = (
  source: BackendItinerariesType,
  target: BackendItinerariesType,
) => {
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
          if (
            pricingOptions[index1].price?.amount >
            pricingOptions[index2].price?.amount
          ) {
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

const _handlePricingOptions = (pricingOptions: any) => {
  const filteredProviders = pricingOptions.reduce((acc:any, current:any) => {
    const existing :any | undefined = acc.find((agent: any) => agent.agent === current.agent);
    if (existing &&typeof existing !== 'undefined' ) {
      // If found and current price is lower, update the price
      if (existing.price > current.price) {
        existing.price = current.price;
      }
    } else {
      // If not found, add the provider to the accumulator
      acc.push(current);
    }
    return acc;
  }, []);

  return filteredProviders.sort((a: any, b: any) =>
    sortAscending(Number(a.price.amount), Number(b.price.amount)),
  );
};
const _handleTotalBaggage = (pricingOptions: PricingOption[]) => {
  const maxBagaggeValues: FlightBaggageAllowance = {
    totalPieces: 0,
    totalKilos: 0,
    totalBaggages: 0,
    BaggagesInKilos: 0,
    totalHandbages: 0,
    HandbagesInKilos: 0,
    totalPrice: 0,
    totalBaggagePrice: 0,
    totalHandbagPrice: 0,
  };
  Object.keys(maxBagaggeValues).forEach((key) => {
    const baggageKey = key as keyof FlightBaggageAllowance;

    maxBagaggeValues[baggageKey] = pricingOptions.reduce(
      (
        max: number,
        option: { meta?: { baggage?: FlightBaggageAllowance } },
      ) => {
        if (
          option.meta &&
          option.meta.baggage &&
          option.meta.baggage[baggageKey]
        ) {
          return Math.max(max, option.meta.baggage[baggageKey]!);
        }
        return max;
      },
      0,
    );
  });

  return maxBagaggeValues
}

const _handleAvailableRetrictions = (
  pricingOptions: PricingOption[],
): Restrictions => {
  const availableRestrictions: Restrictions = {
    refundable: false,
    changePenalties: false,
    changable: false,
  };

  pricingOptions.forEach((option) => {
    const restrictions = option.meta?.restrictions;

    if (restrictions) {
      Object.keys(restrictions).forEach((key) => {
        const RestrictionKey = key as keyof Restrictions;

        if (restrictions[RestrictionKey]) {
          availableRestrictions[RestrictionKey] = true;
        }
      });
    }
  });

  // Check if any key in availableRestrictions is true
  const hasTrueValue = Object.values(availableRestrictions).some(
    (value) => value === true,
  );

  // Return availableRestrictions only if any key is true, otherwise return an empty object
  return hasTrueValue ? availableRestrictions : {};
};

const getItineraryDetails = (
  itinerary: BackendItineraryType,
  data: FlightResultType,
) => {
  const legs: TransformedLegType[] = _getLegs(itinerary.legs, data);
  const pricingOptions = _handlePricingOptions(itinerary.pricingOptions);

  const itineraryWithLegs = {
    ...itinerary,
    minPrice: Number(pricingOptions[0].price.amount),
    maxBagaggeValues: _handleTotalBaggage(pricingOptions),
    availableRestrictions: _handleAvailableRetrictions(pricingOptions),
    pricingOptions,
    legs,
    duration: _getTotalDuration(legs),
  }; // add the legs to the itinerary
  return itineraryWithLegs; // return the itinerary with the legs
};

const _getTotalDuration = (legs: TransformedLegType[]) => {
  let totalDuration = 0;
  for (let i = 0; i < legs.length; i++) {
    totalDuration += Number(legs[i].duration);
  }
  return totalDuration;
};
const _getSegments = (segments: string[], data: FlightResultType) => {
  return segments.map((segment: string) => {
    if (typeof segment === 'string') {
      const marketingCarrierDetails = getAirlineDetails(
        data.segments[segment].marketingCarrier,
        data.airlines,
      );
      const operatingCarrierDetails = getAirlineDetails(
        data.segments[segment].operatingCarrier,
        data.airlines,
      );
      const originDetails = data.airports[data.segments[segment].origin];
      const destinationDetails =
        data.airports[data.segments[segment].destination];
      return {
        ...data.segments[segment],
        operatingCarrierDetails,
        marketingCarrierDetails,
        originDetails,
        destinationDetails,
      };
    }
    return segment;
  });
};
const getAirlineDetails = (code: string, airlines: AirlinesType) => {
  if (typeof code === 'string') {
    return airlines[code];
  }
  return code;
};
const _getLegs = (legs: string[], data: FlightResultType) => {
  const updatedLegs = legs.map((leg: string) => {
    if (typeof leg === 'string') {
      const segments = _getSegments(data.legs[leg].segments, data);
      const marketingCarriersDetails = data.legs[leg].marketingCarriers.map(
        (code: string) => getAirlineDetails(code, data.airlines),
      );
      return { ...data.legs[leg], segments, marketingCarriersDetails };
    }
    return leg;
  });
  return updatedLegs;
};

export const handleItineriesShape = (
  data: FlightResultType,
): FlightResultType => {
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
    itinerariesDuration: Object.values(itineraries).sort((a: any, b: any) =>
      sortAscending(a.duration, b.duration),
    ),
  };
};
