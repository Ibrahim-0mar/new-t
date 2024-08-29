import Script from 'next/script';
import AdSense from '../ads/googleAdsense/AdSense';
import GoogleTagManager from './googleTagManager';

const Scripts = () => {
  return (
    <>
      <AdSense pId="3467222094751265" />
      <GoogleTagManager />
      <Script async src="https://content.travolic.com/scripts/medialpha.js" strategy="lazyOnload" />
    </>
  );
};

export default Scripts;
