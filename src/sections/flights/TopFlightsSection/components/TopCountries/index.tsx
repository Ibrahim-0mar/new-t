import { TopCountryType, placeType } from '@/utils/types/flights';
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';
import styles from './index.module.css';
const Carousel = dynamic(() => import('./components/Carousel'));
const TopSectionCard = dynamic(() => import('@/components/flights/cards/TopSectionCard'));

type TopCountriesProps = {
  origin: placeType;
  topCountries: any[];
};

const TopCountries = ({ origin, topCountries }: TopCountriesProps) => {
  const deviceView = headers().get('x-viewport');
  return (
    <>
      {deviceView === 'desktop' ? (
        <div className={styles.cardsContainer}>
          {topCountries.map((item: TopCountryType) => (
            <TopSectionCard
              destination={item.country?.name}
              prices={item.prices}
              image={item.image}
              id={item.id}
              key={item.id}
              href={`/cheapest-flights/routes/airport-to-country/${origin.code}-${item.country.code}/${origin.name}/${item?.country?.name}/`}
            />
          ))}
        </div>
      ) : (
        <Carousel data={topCountries} origin={origin} />
      )}
    </>
  );
};

export default TopCountries;
