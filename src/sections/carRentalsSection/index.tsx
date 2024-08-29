'use client';
import Button from '@/components/common/base/Button';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import carImage from './bg.jpg';
import styles from './index.module.css';
import ArrowRight from '@/components/common/base/ArrowRight';
import ChevronRight from '@/components/common/base/ChevronRight';
import { Link } from '@/navigation';
import FormatPrice from '@/utils/helper/FormatPriceComponent';

const dummyCarDeals = [
  { carName: 'Car 1', price: 100, image: carImage },
  { carName: 'Car 2', price: 200, image: carImage },
  { carName: 'Car 3', price: 300, image: carImage },
  { carName: 'Car 4', price: 400, image: carImage },
  { carName: 'Car 6', price: 500, image: carImage },
  { carName: 'Car 6', price: 500, image: carImage },
  { carName: 'Car 6', price: 500, image: carImage },
  { carName: 'Car 6', price: 500, image: carImage },
  { carName: 'Car 6', price: 500, image: carImage },
  { carName: 'Car 6', price: 500, image: carImage },
];

const CarRentalSection = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Rent a car with best deals</h2>
      <div className={styles.subHeading}>
        <span>Check out the best prices in {'dubai'}</span>
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
          {dummyCarDeals.map((car, index) => (
            <SwiperSlide className={styles.slide} key={index}>
              <Link href={`?`} className={styles.cardLink}>
                <div className={styles.cardContainer}>
                  <Image
                    src={car.image}
                    alt={car.carName}
                    className={styles.cardImage}
                    width={200}
                    height={0}
                    layout="intrinsic"
                    loading="lazy"
                  />
                  <div className={styles.cardDetails}>
                    <div className={styles.cardHeader}>
                      <span>{car.carName}</span>
                      <span className={styles.price}>
                        {<FormatPrice price={car.price} currency="USD" />}
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

export default CarRentalSection;
