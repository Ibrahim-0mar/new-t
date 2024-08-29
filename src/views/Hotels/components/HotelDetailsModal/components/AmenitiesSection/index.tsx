'use client';
import Button from '@/components/common/base/Button';
import {
  Building2,
  ChevronDown,
  ChevronUp,
  Coffee,
  Dumbbell,
  Utensils,
  WifiIcon,
} from 'lucide-react';
import styles from './index.module.css';
import { ReactElement, useState } from 'react';

const amenitiesContent :{[key:string]:{icon: ReactElement<any, any> , text:string}} = {
  wifi:{ icon: <WifiIcon size={28} />, text: 'Wi-Fi available in all areas'},
  coffe:{ icon: <Coffee size={28} />, text: 'Tea/Cofee maker' },
  service:{ icon: <Building2 size={28} />, text: 'Room service' },
  fitness:{ icon: <Dumbbell size={28} />, text: 'Fitness center' },
  breakfast:{icon:<Utensils size={28} />, text:'Breakfast available'}

};

const AmenitiesSection = ({amenities}:{amenities:{[key:string]:boolean}}) => {
  const [isShowAll, setShowAll] = useState(false);


  const handleShowAll = () => {
    setShowAll(!isShowAll);
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Amenities</h2>
      <div className={styles.amenities}>
        {Object.keys(amenities).slice(0,isShowAll ?Object.keys(amenities).length :4).map((key:string) =>{
          if (amenities[key]) {
            return (
              <div key={key} className={styles.amenity}>
                {amenitiesContent[key].icon}
                <span>{amenitiesContent[key].text}</span>
              </div>
            )
          }
        })}
       
      </div>
      {Object.keys(amenities).length > 6 &&
      <Button
        variant="outline"
        className={styles.showAllBtn}
        onClick={handleShowAll}
      >
        Show {isShowAll ? 'Less' : 'All'}{' '}
        {isShowAll ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
      </Button>
}
    </div>
  );
};

export default AmenitiesSection;
