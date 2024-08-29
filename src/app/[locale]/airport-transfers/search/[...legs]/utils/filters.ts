export interface AirportTransfersFilterType {
  duration: 'all' | [number, number];
  price: 'all' | [number, number];
  bookingSites: 'all' | string[];
  vehicleMake: 'all' | string[];
  vehicleType: 'all' | string[];
}



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







// filter by booking sites
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

export const filterByVehicleMake = (
  filters: 'all' | string[],
  itineraries: any[],
) => {
  if (filters.length == 0) {
    return [];
  } else if (filters === 'all') {
    return itineraries;
  } else {
    const filteredItineraries: any = [];
    filters.map((make) => {
      if (make ==="~") { // for which vehicle make not retuned
        filteredItineraries.push(
          ...itineraries.filter((itinerary) => {
            return itinerary.legs.some((leg: any) =>leg.make === 'null' ||
            leg.make === 'undefined' ||
            leg.make === '' ||
            leg.make === null ||
            leg.make === undefined);
          }),
        );
      }else{
      filteredItineraries.push(
        ...itineraries.filter((itinerary) => {
          return itinerary.legs.some((leg: any) => leg.make?.toLowerCase() === make?.toLowerCase());
        }),
      );
    }
    });
    
    return filteredItineraries;
     
  }
};

export const filterByVehicleType = (
  filters: 'all' | string[],
  itineraries: any[],
) => {
  if (filters.length == 0) {
    return [];
  } else if (filters === 'all') {
    return itineraries;
  } else {
    const filteredItineraries: any = [];
    filters.map((type) => {
      if (type ==="~") { // for which not have vehicle make returned
        filteredItineraries.push(
          ...itineraries.filter((itinerary) => {
            return itinerary.legs.some((leg: any) => leg.viehcle_type === 'null' ||
            leg.viehcle_type === 'undefined' ||
            leg.viehcle_type === '' ||
            leg.viehcle_type === null ||
            leg.viehcle_type === undefined);
          }),
        );
      }else{
      filteredItineraries.push(
        ...itineraries.filter((itinerary) => {
          return itinerary.legs.some((leg: any) => leg.viehcle_type?.toLowerCase()  === type?.toLowerCase());
        }),
      );
    }
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






export const _getLegsFromParams = (legs: any) => {
  const updatedLegs: any = [];
  legs.map((leg: any, index: number) => {
    if (index % 2 === 0) {
      updatedLegs.push(leg.split('-'));
    }
  });
  return updatedLegs;
};
