import AdBanner from '@/utils/ads/googleAdsense/AdBanner';
import CompareAll from '@/utils/ads/medialpha/CompareAll';

const FlightAdds = () => {
  return (
    <>
      <AdBanner className="my-2" dataAdFormat="rectangle" dataAdSlot="7910367305" />
      <CompareAll />
      <AdBanner className="sticky top-24 my-2" dataAdSlot="1234166365" dataAdFormat="vertical" />
    </>
  );
};

export default FlightAdds;
