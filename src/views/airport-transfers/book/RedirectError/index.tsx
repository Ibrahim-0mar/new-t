'use client';
import Container from '@/components/common/base/Container';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import { useSearchParams } from 'next/navigation';
import styles from './index.module.css';

import { sendRedirectFailureDataRequest } from '@/services/apis/flights/results';

import Image from 'next/image';
import Button from '@/components/common/base/Button';
import { parse } from '@/utils/helper/json';
import { useLocale, useTranslations } from 'next-intl';
import { locale } from '@/navigation';
import { AirportTransfersRedirectPayloadType } from '@/utils/types/airport-transfers/results';
import { useReCaptcha } from 'next-recaptcha-v3';
import { useEffect, useState } from 'react';

const RedirectError = () => {
  const t = useTranslations();
  const locale = useLocale() as locale;

  const searchParams = useSearchParams();
  const itineraryId = searchParams.get('itineraryId') || '';
  const price = searchParams.get('price') || '';
  const currency = searchParams.get('currency') || '';
  const agentName = searchParams.get('agentName') || '';
  const visitorId = searchParams.get('visitorId') || '';
  const searchId = searchParams.get('searchId') || '';
  const token = searchParams.get('token') || '';
  const utm_source = searchParams.get('utm_source') || 'travolic';
  const adults = searchParams.get('adults') || 1;
  const children = searchParams.get('children') || 0;
  const infants = searchParams.get('infants') || 0;
  // const segments =
  //   typeof window !== 'undefined'
  //     ? localStorage.getItem('redirectSegments')
  //     : '';
  const legs =
    typeof window !== 'undefined' ? localStorage.getItem('airportTransferredirectLegs') : '';

  //recaptcha
  const { executeRecaptcha, loaded } = useReCaptcha();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleRedirectError = () => {
    if (window) {
      window.close();
    }
  };

  const sendFailRequest =async()=>{
    const data: AirportTransfersRedirectPayloadType = {
      searchId,
      visitorId,
      itineraryId,
      adults,
      children,
      infants,
      price,
      currency,
      legs: legs ? parse(legs) : [],
      token,
      type: 'transfer',
      utm_source,
    };
    if (recaptchaToken) {
      await sendRedirectFailureDataRequest(data, locale,recaptchaToken);
    }
   
  }
    //recaptch generation
    const _getRecaptchaToken = async () => {
      const token = await executeRecaptcha('flightRedirect');
      setRecaptchaToken(token);
    };
  

   //recaptch
   useEffect(() => {
    if (!recaptchaToken && loaded) {
      _getRecaptchaToken();
    }
  }, [loaded]);

  useEffect(()=>{
    sendFailRequest()
  },[recaptchaToken])

  return (
    <Container dir="ltr" className={styles.mainContainer}>
      <Image src={commonImgUrl('redirectError.png')} alt={agentName} width={300} height={300} />
      <h1 className={styles.errorMessage}>{t('o20RIRnPtcXSYLit9ljTR', { provider: agentName })}</h1>

      <Button className={styles.redirectButton} onClick={handleRedirectError} variant="primary">
        {t('H-Lb79VnibJhKYJ9HCtLB')}
      </Button>
    </Container>
  );
};

export default RedirectError;
