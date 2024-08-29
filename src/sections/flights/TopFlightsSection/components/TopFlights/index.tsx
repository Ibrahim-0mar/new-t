import TopSectionCard from '@/components/flights/cards/TopSectionCard';
import { TopFlightType, placeType } from '@/utils/types/flights';
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';
import styles from './index.module.css';

type TopFlightsProps = {
  origin: placeType;
  topFlights: TopFlightType[];
};

const Carousel = dynamic(() => import('./components/Carousel'), { ssr: false });

const TopFlights = ({ origin, topFlights }: TopFlightsProps) => {
  const deviceView = headers().get('x-viewport');

  return (
    <>
      {deviceView === 'desktop' ? (
        <div className={styles.cardsContainer}>
          {topFlights.map((item: TopFlightType) => (
            <TopSectionCard
              destination={item.airport?.name}
              prices={item.prices}
              image={item.image}
              id={item.id}
              key={item.id}
              href={`/cheapest-flights/routes/airports/${origin.code}-${item.destination}/${origin.name}/${item?.airport?.name}/`}
            />
          ))}
        </div>
      ) : (
        <Carousel data={topFlights} origin={origin} />
      )}
    </>
  );
};

export default TopFlights;
