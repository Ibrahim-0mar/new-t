import Container from '@/components/common/base/Container';
import styles from './index.module.css';
import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';

interface Props {
  data?: {
    id: string;
    name: string;
    image: string;
    rating: number;
    reviews: number;
    distance: string;
  }[];
}

const HotelsViewed = ({
  data = [
    {
      id: '1',
      name: 'Hotel Monterosa - Astotel',
      image: '/hotel.webp',
      rating: 4,
      reviews: 1826,
      distance: '2.10 Km from city center',
    },
    {
      id: '1',
      name: 'Hotel Monterosa - Astotel',
      image: '/hotel.webp',
      rating: 4,
      reviews: 1826,
      distance: '2.10 Km from city center',
    },
    {
      id: '1',
      name: 'Hotel Monterosa - Astotel',
      image: '/hotel.webp',
      rating: 4,
      reviews: 1826,
      distance: '2.10 Km from city center',
    },
  ],
}: Props) => {
  return (
    <Container as="section" className={styles.container}>
      <div>
        <h2 className={styles.header}>Hotels You have Viewed</h2>
      </div>
      <div className={styles.cardsContainer}>
        {data.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image src={item.image} alt={item.name} fill priority />
              <div className={styles.ratingContainer}>
                <div className="flex">
                  {[...Array(item.rating)].map((_, index) => (
                    <Star key={index} size={20} fill="#ffdd00" />
                  ))}
                </div>
                <p className={styles.hotelName}>{item.name}</p>
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.location}>
                <MapPin size={30} />
                <p>2.10 Km from city center</p>
              </div>
              <div className={styles.rating}>
                <p className="text-4xl font-bold">{item.rating}</p>
                <p className="text-twelfth">{item.reviews} reviews</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default HotelsViewed;
