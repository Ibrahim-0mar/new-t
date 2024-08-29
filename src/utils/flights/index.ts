
export const getAllSegmentsFromItinerary = (itinerary:TransformedItineraryType) => {
    const segments: TransformedSegmentType[] = [];
    itinerary.legs.map((leg:TransformedLegType) =>
      leg.segments.map((segment:TransformedSegmentType) => {
        segments.push(segment);
      })
    );
    return segments;
  };

export const getFlightTripType = (legs:TransformedLegType[]) => {
  if (legs.length === 1) {
    return 'oneway';
  }
  else if (legs.length === 2) {
    if (JSON.stringify(legs[0].origin) != JSON.stringify(legs[1].destination) || JSON.stringify(legs[1].origin) != JSON.stringify(legs[0].destination)){
      return 'multi';
    } else {
      return 'round'
    }
  } else {
    return 'multi';
  }


};