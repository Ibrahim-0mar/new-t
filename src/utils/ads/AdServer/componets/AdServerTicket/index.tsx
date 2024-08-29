import FlightItinerary from '@/components/flights/results/Itinerary';
import styles from './index.module.css';
import { adServerType } from '../../types';
import Image from 'next/image';
import Button from '@/components/common/base/Button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { eventsOnFlightSelect } from '@/utils/events/flights/search';
import { SortBarData } from '@/views/flights/search/FlightResults';


export default function AdServerTicket({
  data,
  searchId,
  searchPayload,
  sortedData
}: {
  data: { ticket: TransformedItineraryType; adData: adServerType };
  searchPayload:any;
  searchId:string,
  sortedData: SortBarData
}) {
  const { ticket, adData } = data;
  const [isExpanded,setIsExpanded]=useState(false);
  const t=useTranslations();


  useEffect(()=>{
    if (process.env.NODE_ENV ==="production" && adData.beacons.length>0) {
      fetch(adData.beacons[0].url)
    }
  },[])

  const onClickOpen =()=>{
    try {
      eventsOnFlightSelect({
        fare: ticket.pricingOptions[0],
        searchId: searchId,
        adults: searchPayload.adults,
        childrenNo: searchPayload.children,
        infants: searchPayload.infants,
        itineraryId: ticket.id,
        tripType: searchPayload.tripType,
        cabinClass: searchPayload.cabinClass,
        sortedData,
        legs: ticket.legs,
        sponsored: true,
      })
    } catch (err) {}    
      
    let url=`${window?.location?.hostname}/flights/book?adults=${searchPayload.adults}&agentName=${adData.customization.brand}&children=${searchPayload.children}&country=US&currency=${ticket.pricingOptions[0].price.currency}&infants=${searchPayload.infants}&itineraryId=${ticket.id}&price=${ticket.minPrice}&searchId=${searchId}&token=${ticket.pricingOptions[0].deepLink}&visitorId=${searchPayload.visitorId}&tripType=${searchPayload.tripType}&cabin=${searchPayload.tripType}`;
    // some providers need to add thier own params to check the traffic come from ad server
    // it passed here and retrieve from redirect page params then added to the redirect url
    if (adData.customization.queryParams) {
      url +=`&providerParams=${adData.customization.queryParams}`
      
    }
    window.open(adData.clickUrl.replace("https%3A%2F%2Ftravolic.com%2F", url),"_blank")
  }
  return (
    <div className={styles.container}>
      <div
        className={styles.infoSection}
        style={{ backgroundColor: adData.customization['background-color'] }}
      >
        <div className={styles.shownSection}>
        <div className={styles.dataSection}>
          <div className='w-3/12'>
        <Image
          
          src={adData.images[0].url}
          width={window && window.innerWidth < 768 ? 80 : 150}
          height={0}
          alt={adData.title}
        />
        </div>
        <div className={styles.titlesSection}>
        <p className={styles.title}>{adData.title ||t('-Gt9H6jiiJeX0L_EboCCN',{provider:adData.title})} </p>
        <p className={styles.subTitle}>{adData.subtitle ||  t('V1AdlSamb1lkGUQ1skzuX')}</p>
        </div>
        </div>

  
          <Button variant='default' className={styles.moreInfoButton} onClick={()=>setIsExpanded(!isExpanded)}>
           {isExpanded ? t('MYEe2oTKiXesQKYnwnRT1') : t('hJ_ceWsYiWjkVdf16_p51')    } 
           {isExpanded ? <ChevronUp size={19}/>:<ChevronDown size={19}/>  }
          </Button>
          </div>
          {isExpanded && <p className={styles.description}>{adData.description}</p>}
      </div>
     
      <FlightItinerary
        itinerary={ticket}
        ticketPosition={1}
        openDetails={onClickOpen}
        isModalOpen={false}
        isSponsored={true}
        buttonText={adData.ctaText}
        />
        </div>
  );
}