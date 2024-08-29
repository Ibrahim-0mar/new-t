
export const _updateBookingSitesPrice = (itinerary: any, bookingSites: any) => {
    itinerary.pricingOptions.forEach((option: any) => {
      if (!Object.hasOwn(bookingSites,option.agent)) {
        bookingSites[option.agent] = Number(option.price.amount) || 0;
      } else {
        if (Number(bookingSites[option.agent]) > Number(option.price.amount)) {
          bookingSites[option.agent] = Number(option.price.amount);
        }
      }
    });

  };
  
  export const _updateAirlinesPrices = (itinerary: any, airlines: any) => {
  if (itinerary.legs.every((leg: any) => leg.marketingCarriers.every((airline:AirlineType) => airline === itinerary.legs[0].marketingCarriers[0]))) {
    const carrier = itinerary.legs[0].marketingCarriers[0];    
    if (!Object.hasOwn(airlines,carrier) ) {
          airlines[carrier] = itinerary.minPrice;
        } else {
          if (airlines[carrier] > itinerary.minPrice) {
            airlines[carrier] = itinerary.minPrice;
          }
        }
  }else{
    if (!Object.hasOwn(airlines,"combination")) {
      airlines.combination = itinerary.minPrice;
    } else {
      if (airlines.combination > itinerary.minPrice) {
        airlines.combination = itinerary.minPrice;
      }
    }
  }
  };
  
  
  export const _updateAirportsPrices = (itinerary: any, airports: any) => {
    itinerary.legs.forEach((leg: any) => {
      if (!airports.departure[leg.origin]) {
        airports.departure[leg.origin] = Number(itinerary.minPrice);
      } else {
        if (airports.departure[leg.origin] > itinerary.minPrice) {
          airports.departure[leg.origin] = Number(itinerary.minPrice);
        }
      }
      if (!airports.arrival[leg.destination]) {
        airports.arrival[leg.destination] = Number(itinerary.minPrice);
      } else {
        if (
          Number(airports.arrival[leg.destination]) > Number(itinerary.minPrice)
        ) {
          airports.arrival[leg.destination] = Number(itinerary.minPrice);
        }
      }
    });
  };
  export const _updateStopoversPrices = (itinerary: any, stopovers: any) => {
    itinerary.legs.forEach((leg: any) => {
      if (leg.segments.length > 1) { // check if the leg has stopovers "not direct flight"
        leg.segments.forEach((segment: any) => {
          if (segment.origin != leg.origin) {  // this check for prevent add the departure airports as stopovers
            if (!stopovers[segment.origin]) {
              stopovers[segment.origin] =
                itinerary.minPrice;
            } else {
              if (
                stopovers[segment.origin] >
                itinerary.minPrice
              ) {
                stopovers[segment.origin] =
                  itinerary.minPrice;
              }
            }
          }
          if (segment.destination != leg.destination) { // this check for prevent add the arrival airports as stopovers
            if (!stopovers[segment.destination]) {
              stopovers[segment.destination] =
                itinerary.minPrice;
            } else {
              if (
                stopovers[segment.destination] >
                itinerary.minPrice
              ) {
                stopovers[segment.destination] =
                  itinerary.minPrice;
              }
            }
          }
        });
      }
    });
  };
  
  