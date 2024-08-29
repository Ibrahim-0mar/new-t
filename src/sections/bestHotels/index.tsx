'use client';
import Button from '@/components/common/base/Button';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import hotelImage from './bg@3x.jpg';
import styles from './index.module.css';
import ChevronRight from '@/components/common/base/ChevronRight';
import ArrowRight from '@/components/common/base/ArrowRight';
import { Link } from '@/navigation';
import FormatPrice from '@/utils/helper/FormatPriceComponent';

const dummyHotelsDeals = [
  { hotelName: 'Hotel 1', price: 100, image: hotelImage },
  { hotelName: 'Hotel 2', price: 200, image: hotelImage },
  { hotelName: 'Hotel 3', price: 300, image: hotelImage },
  { hotelName: 'Hotel 4', price: 400, image: hotelImage },
  { hotelName: 'Hotel 6', price: 500, image: hotelImage },
  { hotelName: 'Hotel 6', price: 500, image: hotelImage },
  { hotelName: 'Hotel 6', price: 500, image: hotelImage },
  { hotelName: 'Hotel 6', price: 500, image: hotelImage },
  { hotelName: 'Hotel 6', price: 500, image: hotelImage },
  { hotelName: 'Hotel 6', price: 500, image: hotelImage },
];

const BestHotelsSection = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Best Hotels deals in Dubai</h2>
      <div className={styles.subHeading}>
        <span>Check out the best places in {'dubai'}</span>
        <Link href="?" className={styles.viewMore}>
          View more <ChevronRight size={18} />
        </Link>
      </div>
      <div className={styles.cardsContainer}>
        <Swiper
          className={styles.sliderContainer}
          effect={'coverflow'}
          grabCursor={true}
          autoplay={{ delay: 4000, waitForTransition: true }}
          slidesPerView={'auto'}
          spaceBetween={70}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[Pagination, Autoplay]}
        >
          {dummyHotelsDeals.map((hotel, index) => (
            <SwiperSlide className={styles.slide} key={index}>
              <Link
                key={index}
                href={`/flights/to-city/${hotel.hotelName}`}
                className={styles.cardLink}
              >
                <div className={styles.cardContainer}>
                  <Image
                    src={hotel.image}
                    alt={hotel.hotelName}
                    className={styles.cardImage}
                    width={200}
                    height={0}
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <div className={styles.cardDetails}>
                    <div className={styles.cardHeader}>
                      <span>{hotel.hotelName}</span>
                      <span className={styles.price}>
                        {<FormatPrice price={hotel.price} currency="usd" />}
                      </span>
                    </div>
                    <span className={styles.arrow}>
                      <ArrowRight color="#ffffff" size={20} />
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Button variant="default" className={styles.showMoreBtn}>
        Show more results
      </Button>
    </div>
  );
};

export default BestHotelsSection;
