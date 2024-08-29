import TopSectionCard from '@/components/flights/cards/TopSectionCard';
import { placeType } from '@/utils/types/flights';
import { headers } from 'next/headers';

import styles from './index.module.css';
import Carousel from './components/Carousel';

type TopNearbyProps = {
  origin: placeType;
  topNearby: any[];
};

// It now take the data of top flights untill bakcend handle the response shape
const TopNearby = ({ origin, topNearby }: TopNearbyProps) => {
  const deviceView = headers().get('x-viewport');

  return (
    <>
      {deviceView === 'desktop' ? (
        <div className={styles.cardsContainer}>
          {topNearby.length > 0 &&
            Object.keys(topNearby[0].data)?.map((key: string) => {
              const item = topNearby[0].data[key];
              return (
                <TopSectionCard
                  destination={item.airport?.name}
                  prices={item.prices}
                  image={item.image}
                  id={item.id}
                  key={item.id}
                  href={`/cheapest-flights/routes/airports/${origin.code}-${item.destination}/${origin.name}/${item?.airport?.name}/`}
                />
              );
            })}
        </div>
      ) : (
        <Carousel data={topNearby} origin={origin} />
      )}
    </>
  );
};

export default TopNearby;
