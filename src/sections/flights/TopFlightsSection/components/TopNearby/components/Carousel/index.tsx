'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import styles from './index.module.css';
import TopSectionCard from '@/components/flights/cards/TopSectionCard';

export default function Carousel({ data, origin }: any) {
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
      {data.length > 0 &&
        Object.keys(data[0].data)?.map((key: string) => {
          const item = data[0].data[key];
          return (
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
          );
        })}
    </Swiper>
  );
}
