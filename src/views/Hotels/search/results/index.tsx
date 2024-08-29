'use client';
import { useSearchParams } from 'next/navigation';
import HotelResultCard from '../../components/HotelResultCard';
import styles from './index.module.css';



const HotelsResults = ({data}:any) => {
  //   const params = useParams();
  const searchParams=useSearchParams()
  const adults= Number(searchParams.get('adults')) || 1;
   const  children= Number(searchParams.get('children')) || 0;

  return (
    <div className={styles.results}>
      <div className={styles.properties}>
        <span>5462 of 25417 properties</span>
        <span>Sort by: Recommended</span>
      </div>
      {data.dataList.map((hotel:any, index:number) => (
        <HotelResultCard key={index} {...hotel} numberOfGuests={adults+children} />
      ))}
    </div>
  );
};

export default HotelsResults;
