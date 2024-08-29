import { Clock4, CopyX } from 'lucide-react';
import Image from 'next/image';
import styles from './index.module.css';
import { formatDuration } from '@/utils/helper/dates';
import ImageComponent from '@/components/common/base/ImageComponent';
import { imagesUrl } from '@/utils/config';
import { parse } from '@/utils/helper/json';
import { useLocale, useTranslations } from 'next-intl';
import { locale } from '@/navigation';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
interface Props {
  flgihtCost: { currency: string; amount: number };
  agentImageUrl: string;
  translations: { ticketDetails: string; passengers: string };
  agentName: string;
}

const TicketDetails = ({
  flgihtCost,
  agentImageUrl,
  translations: { ticketDetails, passengers },
  agentName,
}: Props) => {
  const locale = useLocale() as locale;
  const t = useTranslations();

  const legs =
    typeof window !== 'undefined'
      ? parse(localStorage.getItem('airportTransferResultsLegs') || '[]')
      : [];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.detailsHeader}>
        <h1>{ticketDetails}</h1>
        <div className={styles.agentLogo}>
          <Image
            src={agentImageUrl}
            alt={t('XPsptCVMwMMzAE11MJ0S1')}
            width={115}
            height={0}
            loading="lazy"
          />
        </div>
      </div>
      <div className={styles.detailsFooter}>
        <div className={styles.legsContainer}>
          {legs && legs.length > 0 ? (
            <div>
              <h4 className={styles.header}>
                {' '}
                {legs[0]?.viehcle_type +
                  ' ' +
                  legs[0]?.make +
                  ' ' +
                  1 +
                  ' to ' +
                  legs[0].max_passengers +
                  passengers}
              </h4>

              <div className={styles.legContainer}>
                {/* airlines images  */}
                <div className={styles.imageContainer}>
                  {legs[0].carImage_url && legs[0].carImage_url.includes('http') ? (
                    <ImageComponent
                      src={legs[0].carImage_url}
                      alt={legs[0].model}
                      width={200}
                      height={0}
                      defaultImage={imagesUrl + '/flights/defaultAirline.png'}
                    />
                  ) : (
                    <img src={legs[0].carImage_url} alt={legs[0].model} width={200} height={0} />
                  )}
                </div>
                <div className={styles.dataContainer}>
                  <p className={styles.bookingSite}>{agentName}</p>
                  <span className={styles.description}>{legs[0].description}</span>
                  <div className={styles.bottomIcons}>
                    <div className={styles.iconSection}>
                      <Clock4 size={14} className={styles.icon} />
                      {t('-HROKcWaoxNis_cZ0WRfo')}: {formatDuration(legs[0].time, locale)}
                    </div>
                    {legs[0].free_cancellation && (
                      <div className={styles.iconSection}>
                        <CopyX size={14} className={styles.icon} />
                        {t('pkuiczTjFuGrMBhxxDeiQ')}
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.costContainer}>
                  <span className={styles.flightCost}>
                    <FormatPrice price={flgihtCost.amount} currency={flgihtCost.currency} />
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.costContainer}>
              <span className={styles.flightCost}>
                <FormatPrice price={flgihtCost.amount} currency={flgihtCost.currency} />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
