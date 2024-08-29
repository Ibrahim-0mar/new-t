import Container from '@/components/common/base/Container';
import styles from './index.module.css';
import NearByCard from '@/components/hotels/NearByCard';

interface NearByHotels {
  id: string;
  name: string;
  image: string;
  rating: number;
}

const NearByHotels = async () => {
  const data = [
    {
      id: '1',
      name: 'Hotel 1',
      image: '/hotel.webp',
      rating: 4,
      price: 100,
    },
    {
      id: '2',
      name: 'Hotel 2',
      image: '/hotel.webp',
      rating: 4,
      price: 100,
    },
    {
      id: '3',
      name: 'Hotel 3',
      image: '/hotel.webp',
      rating: 4,
      price: 100,
    },
    {
      id: '4',
      name: 'Hotel 4',
      image: '/hotel.webp',
      rating: 4,
      price: 100,
    },
    {
      id: '5',
      name: 'Hotel 5',
      image: '/hotel.webp',
      rating: 4,
      price: 100,
    },
    {
      id: '6',
      name: 'Hotel 6',
      image: '/hotel.webp',
      rating: 4,
      price: 100,
    },
  ];

  return (
    <Container className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.header}>Near By Hotels </h2>
          <h4 className={styles.subHeader}>
            Here are the flight deals with the lowest prices. Act fast – they
            all depart within the next three months
          </h4>
          <div className={styles.cardsContainer}>
            {data.map((item) => (
              <NearByCard
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                rating={item.rating}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NearByHotels;
