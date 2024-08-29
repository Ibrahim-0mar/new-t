
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
  
  export const _updateVehicleMake = (itinerary: any, vehicleMake: any) => {
    itinerary.legs.forEach((leg: any) => {
      if (!Object.hasOwn(leg, 'make')) return;
      if (
        leg.make === 'null' ||
        leg.make === 'undefined' ||
        leg.make === '' ||
        leg.make === null ||
        leg.make === undefined
      ) { // here will show all other types which not has a specific vehicle type
        if (!Object.hasOwn(vehicleMake, '~')) { // using ~ here to make this type as the last type shown 
          vehicleMake['~'] = itinerary.minPrice;
        } else {
          if (vehicleMake['~'] > itinerary.minPrice) {
            vehicleMake['~'] = itinerary.minPrice;
          }
        }
      } else {
        if (!Object.hasOwn(vehicleMake, leg.make)) {
          vehicleMake[leg.make] = itinerary.minPrice;
        } else {
          if (vehicleMake[leg.make] > itinerary.minPrice) {
            vehicleMake[leg.make] = itinerary.minPrice;
          }
        }
      }
    });
  };

  export const _updateVehicleType = (itinerary: any, vehicleType: any) => {
    itinerary.legs.forEach((leg: any) => {
      if (!Object.hasOwn(leg, 'viehcle_type')) return;
      if (
        leg.viehcle_type === 'null' ||
        leg.viehcle_type === 'undefined' ||
        leg.viehcle_type === '' ||
        leg.viehcle_type === null ||
        leg.viehcle_type === undefined
      ) { // here will show all other types which not has a specific vehicle type
        if (!Object.hasOwn(vehicleType, '~')) { // using ~ here to make this type as the last type shown 
          vehicleType['~'] = itinerary.minPrice;
        } else {
          if (vehicleType['~'] > itinerary.minPrice) {
            vehicleType['~'] = itinerary.minPrice;
          }
        }
      } else {
        if (!Object.hasOwn(vehicleType, leg.viehcle_type)) {
          vehicleType[leg.viehcle_type] = itinerary.minPrice;
        } else {
          if (vehicleType[leg.viehcle_type] > itinerary.minPrice) {
            vehicleType[leg.viehcle_type] = itinerary.minPrice;
          }
        }
      }
    });
  }
  