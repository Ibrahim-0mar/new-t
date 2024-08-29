'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import styles from './index.module.css';
import { TopCountryType } from '@/utils/types/flights';
import TopSectionCard from '@/components/flights/cards/TopSectionCard';

export default function Carousel({ origin, data }: { origin: any; data: TopCountryType[] }) {
  return (
    <Swiper
      className={styles.sliderContainer}
      effect={'coverflow'}
      grabCursor={true}
      autoplay={{ delay: 4000, waitForTransition: true }}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      modules={[Pagination, Autoplay]}
    >
      {data.map((item: TopCountryType) => (
        <SwiperSlide className={styles.slide} key={item.id}>
          <TopSectionCard
            destination={item.country?.name}
            prices={item.prices}
            image={item.image}
            id={item.id}
            key={item.id}
            href={`/cheapest-flights/routes/airport-to-country/${origin.code}-${item.country.code}/${origin.name}/${item?.country?.name}/`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
