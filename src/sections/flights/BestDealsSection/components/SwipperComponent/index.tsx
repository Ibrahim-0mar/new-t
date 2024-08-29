'use client';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './index.module.css';
import { Autoplay, Pagination } from 'swiper/modules';
import { BestDealsCardType } from '@/utils/types/flights';
import RenderItem from '../RenderItem';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { defaultCurrency } from '@/services/data/common';

interface CustonSwiper {
  data: Array<any>;
}
const BestDealsSwiper = (props: CustonSwiper) => {
  const { data } = props;

  const { code: currencyCode } = globalDataGetter('client', 'currency') || defaultCurrency;
  const nearbyAirport = globalDataGetter('client', 'nearbyAirport');

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
      {data.map((item: BestDealsCardType) => (
        <SwiperSlide className={styles.slide} key={item.id}>
          <RenderItem
            item={item}
            currencyCode={currencyCode}
            origin={nearbyAirport}
            cardClassName="!w-full"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BestDealsSwiper;
