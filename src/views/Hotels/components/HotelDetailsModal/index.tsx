'use client';
import styles from './index.module.css';
import Button from '@/components/common/base/Button';
import React from 'react';
import HotelSummarySection from './components/HotelSummarySection';
import Container from '@/components/common/base/Container';
// import OverViewSection from './components/overViewSection';
// import ReviewsSection from './components/ReviewsSection';
import NearbySection from './components/nearbySection';
import AmenitiesSection from './components/AmenitiesSection';
import { useRouter } from '@/navigation';
// import CompareRoomsSection from './components/CompareSection';

const HotelDetailsModal = (props: any) => {
  const { hotel, amenities } = props;

  const router = useRouter();

  return (
    <div className={styles.container}>
      <Button variant="default" className={styles.closeBtn} onClick={() => router.back()}>
        Back
      </Button>
      <Container>
        <HotelSummarySection {...props} />
        {/* <OverViewSection /> */}
        {/* <CompareRoomsSection /> */}
        {/* <ReviewsSection /> */}
        <NearbySection {...hotel} />
        <AmenitiesSection amenities={amenities} />
      </Container>
    </div>
  );
};

export default HotelDetailsModal;
