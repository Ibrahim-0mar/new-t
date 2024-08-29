// Utility function to calculate countries with their respective airports.
export const calculateCountriesWithAirports = (stopover: any[]) => {
  const countries: { [index: string]: any } = {};
  stopover.forEach((airport: any) => {
    if (countries[airport?.city?.country?.name]) {
      countries[airport?.city?.country?.name] = [
        ...countries[airport?.city?.country?.name],
        airport,
      ];
    } else {
      countries[airport?.city?.country?.name] = [airport];
    }
  });
  return countries;
};
