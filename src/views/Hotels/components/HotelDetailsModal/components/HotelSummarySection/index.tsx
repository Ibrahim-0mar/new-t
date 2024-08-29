import Button from '@/components/common/base/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import image1 from '../../../HotelResultCard/hotel-rooms-8146308.webp';
import image2 from '../../../HotelResultCard/marquis-3-min.jpg';
import image3 from '../../../HotelResultCard/pexels-pixabay-164595.jpg';
import styles from './index.module.css';
import FormatPrice from '@/utils/helper/FormatPriceComponent';

const HotelSummarySection = (props: any) => {
  const { hotel, images, minPrice, stars, pricingOptions, rating } = props;
  const { name } = hotel;

  const starsCount = [...Array(stars)];
  const renderRatingStatus = (rating: number) => {
    if (rating <= 2) return 'Poor';
    else if (rating <= 3) return 'Medium';
    else if (rating <= 3.5) return 'Good';
    else if (rating <= 4.25) return 'Very Good';
    else if (rating <= 5) return 'Wonderful';
  };

  return (
    <>
      <div className={styles.sectionContainer}>
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              <h2>{name}</h2>
              <div className={styles.stars}>
                {starsCount.map((star) => (
                  <Icon key={star} icon="mdi:star" width="27" style={{ color: '#d6de29' }} />
                ))}
              </div>
            </div>
            <div className={styles.reviews}>
              <span className={styles.score}>{Number(rating) * 2}</span>
              <div className={styles.rankContainer}>
                <h5>{renderRatingStatus(rating)}</h5>
                {/* <span>7,599 reviews</span> */}
              </div>
            </div>
          </div>
          <div className={styles.priceContainer}>
            {/* TODO: undo comment here after integrate fav & share */}
            {/* <div className={styles.shareAndLike}>
              <Heart />
              <Forward size={29} strokeWidth={2} />
            </div> */}
            <div className={styles.price}>
              <h2>
                <FormatPrice price={minPrice} currency={pricingOptions[0]?.price?.currency} />
              </h2>
              <Button variant="secondary">View Deal</Button>
            </div>
          </div>
        </div>
        <div className={styles.imagesMasonry}>
          <div className={styles.firstImageContainer}>
            <Image src={images} alt="" fill priority={true} />
          </div>
          <div className={styles.secondImageContainer}>
            <Image src={image2} alt="" fill priority={true} />
          </div>
          <div className={styles.thirdImageContainer}>
            <Image src={image3} alt="" width={500} height={0} priority={true} className="h-full" />
          </div>
          <div className={styles.thirdImageContainer}>
            <Image src={image1} alt="" width={500} height={0} priority={true} className="h-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelSummarySection;
