import Button from '@/components/common/base/Button';
import { Building2, Coffee, Dumbbell } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import imageExample from '../../../../../HotelResultCard/hotel-rooms-8146308.webp';
import FareOptionCard from './fareOptionCard';
import styles from './index.module.css';

const amenities = [
  { icon: <Coffee size={20} />, text: 'Tea/Cofee maker' },
  { icon: <Building2 size={20} />, text: 'Room service' },
  { icon: <Dumbbell size={20} />, text: 'Fitness center' },
  { icon: <Coffee size={20} />, text: 'Tea/Cofee maker' },
  { icon: <Building2 size={20} />, text: 'Room service' },
  { icon: <Dumbbell size={20} />, text: 'Fitness center' },
  { icon: <Coffee size={20} />, text: 'Tea/Cofee maker' },
];

const deals = [...Array(6)];

const firstFares = deals.slice(0, 3);
const restOfFares = deals.slice(2, deals.length);

const OptionsCard = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className={styles.container}>
      <h3>Deluxe Double Room with Pool Access</h3>
      <div className={styles.amenities}>
        {amenities.map((amenity, index) => (
          <div key={index} className={styles.amenity}>
            {amenity.icon}
            <span>{amenity.text}</span>
          </div>
        ))}
      </div>
      <div className={styles.fares}>
        <Image
          src={imageExample}
          alt=""
          width={350}
          height={0}
          className={styles.image}
        />
        <div className={styles.faresSubContainer}>
          {firstFares.map((_, index) => (
            <FareOptionCard key={index} />
          ))}
          {showAll &&
            restOfFares.map((_, index) => <FareOptionCard key={index} />)}
          <Button
            variant="default"
            onClick={() => setShowAll(!showAll)}
            className={styles.viewAllDealsBtn}
          >
            View all deals ({deals.length})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OptionsCard;
