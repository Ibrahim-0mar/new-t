import { locale } from '@/navigation';
import fetchHotelsPlaces from '@/services/apis/hotels/places';
import HotelsSearch from '@/views/common/results/Hotels';
import { extractHotelParams } from './utils/extractParams';

interface Props {
  params: { locale: locale; legs: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface searchBoxValues {
  hotelName: string;
  destinationCode: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number;
}

const HotelsPage: React.FC<Props> = async ({ params, searchParams }) => {
  const searchBoxValues: searchBoxValues = extractHotelParams(params, searchParams);
  const response = await fetchHotelsPlaces(searchBoxValues.hotelName, params.locale);

  return (
    <div>
      <HotelsSearch searchBoxValues={searchBoxValues} destination={response[0]} />
    </div>
  );
};

export default HotelsPage;
