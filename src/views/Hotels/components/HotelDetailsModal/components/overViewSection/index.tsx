import styles from './index.module.css';
import Button from '@/components/common/base/Button';
import Image from 'next/image';
import Image1 from '../../../HotelResultCard/hotel-rooms-8146308.webp';
import Image2 from '../../../HotelResultCard/marquis-3-min.jpg';
import Image3 from '../../../HotelResultCard/pexels-pixabay-164595.jpg';
import { Link } from '@/navigation';

const adv = [
  {
    title: 'Modeern location',
    bgImage: Image1,
  },
  {
    title: 'Near Park',
    bgImage: Image2,
  },
  {
    title: 'Near museum',
    bgImage: Image3,
  },
  {
    title: 'Near convention center',
    bgImage: Image1,
  },
  {
    title: 'Good breakfast',
    bgImage: Image2,
  },
];

const OverViewSection = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Overview</h2>
      <div className={styles.details}>
        <div className={styles.overview}>
          <p>
            This smoke-free hotel features a restaurant, an outdoor pool, and a bar/lounge. Free
            buffet breakfast and free WiFi in public areas are also provided. Other amenities
            include concierge services, a 24-hour front desk, and tour/ticket assistance. All 3…
          </p>
          <Button variant="secondary" className={styles.readMore}>
            Read more
          </Button>
        </div>
        <div>
          <h3 className={styles.sustainableProperty}>Travel Sustainable property</h3>
          <Link href="#" className={styles.learnMore}>
            Learn more
          </Link>
        </div>
      </div>
      <div className={styles.advantages}>
        <div className={styles.scoreContainer}>
          <span className={styles.score}>7.7</span>
          <span className={styles.rank}>Good</span>
          <span className={styles.reviewsCount}>7,599 reviews</span>
        </div>
        {adv.map((item, index) => (
          <div key={index} className={styles.advantage}>
            <Image src={item.bgImage} alt="" fill loading="lazy" />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverViewSection;
