import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';
import ArrowRight from '@/components/common/base/ArrowRight';

interface NearByHotels {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: number;
}
const NearByCard = ({ image, name, rating, price }: NearByHotels) => {
  return (
    <Link href={''} className={styles.cardContainer} target="_blank">
      <Image className={styles.cardImage} src={image} alt={name} fill priority />
      <div className={styles.contentContainer}>
        <div className={styles.priceContainer}>
          <h4 className={styles.name}>destination</h4>
          <p className={styles.rating}>
            {[...Array(rating)].map((_, i) => (
              <span key={i}>★</span>
            ))}
            <span>Very Good</span>
          </p>
          <p className={styles.price}>
            <span>{price}</span>
            <span>EGP</span>
          </p>
        </div>
        <div className={styles.iconSection}>
          <div className={styles.iconContainer}>
            <div className={styles.icon}>
              <ArrowRight />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NearByCard;
