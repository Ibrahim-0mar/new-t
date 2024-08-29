'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import styles from './index.module.css';
import TopSectionCard from '@/components/flights/cards/TopSectionCard';
import { TopFlightType } from '@/utils/types/flights';

export default function Carousel({ data, origin }: { data: TopFlightType[]; origin: any }) {
  return (
    <Swiper
      className={styles.sliderContainer}
      effect={'coverflow'}
      grabCursor={true}
      slidesPerView={'auto'}
      autoplay={{ delay: 4000, waitForTransition: true }}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      modules={[Pagination, Autoplay]}
    >
      {data.map((item: TopFlightType) => (
        <SwiperSlide className={styles.slide} key={item.id}>
          <TopSectionCard
            destination={item.airport?.name}
            prices={item.prices}
            image={item.image}
            id={item.id}
            key={item.id}
            href={`/cheapest-flights/routes/airports/${origin.code}-${item.destination}/${origin.name}/${item?.airport?.name}/`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
