import { sortAscending } from '@/utils/helper/numbers';
export const mergeResults = (
  source: HotelResultType,
  target: HotelResultType,
) => {
  const data = mergeIneraries(source.data, target.data);
  return {
    ...source,
    agents: { ...source.agents, ...target.agents },
    hotels: { ...source.hotels, ...target.hotels },
    data,
    // dataList:Object.values(data).sort((a: any, b: any) =>
    //   sortAscending(a.pricingOptions[0].price.amount, b.pricingOptions[0].price.amount),
    // ),
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

// const _handlePricingOptions = (pricingOptions: PricingOption[]) => {
//   const filteredProviders = pricingOptions.reduce((acc, current) => {
//     const existing = acc.find((agent: any) => agent.agent === current.agent);
//     if (existing) {
//       // If found and current price is lower, update the price
//       if (existing.price > current.price) {
//         existing.price = current.price;
//       }
//     } else {
//       // If not found, add the provider to the accumulator
//       acc.push(current);
//     }
//     return acc;
//   }, []);

//   return filteredProviders.sort((a: any, b: any) =>
//     sortAscending(a.price.amount, b.price.amount),
//   );
// };
const getItineraryDetails = (
  itinerary: HotelCardType,
  data: HotelResultType,
) => {
  const itineraryWithLegs = {
    ...itinerary,
    minPrice: Number(itinerary.pricingOptions[0].price.amount),
    hotel: data.hotels[itinerary.hotelId],
    // pricingOptions: _handlePricingOptions(itinerary.pricingOptions),
  }; // add the legs to the itinerary
  return itineraryWithLegs; // return the itinerary with the legs
};


export const handleItineriesShape = (
  response: HotelResultType,
): HotelResultType => {
  const data = Object.keys(response.data).reduce((acc, current) => {
    const details = getItineraryDetails(response.data[current], response);

    return {
      ...acc, // the last itineraries
      [current]: details,
    };
  }, {});
  return {
    ...response,
    data,
    dataList: Object.values(data).sort((a: any, b: any) =>
      sortAscending(a.minPrice, b.minPrice),
    ),
  };
};
