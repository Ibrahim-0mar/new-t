import Image from 'next/image';
import styles from './index.module.css';
import MoveRight from '@/components/common/base/MoveRight';
import { useTranslations } from 'next-intl';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
import FormatDate from '@/utils/helper/FormatDateComponent';

interface Props {
  flgihtCost: { currency: string; amount: number };
  itenraries: {
    origin: string;
    destination: string;
    departure: string;
    arrival: string;
    marketingCarriers: string[];
    stopCount: string;
  }[];
  agentImageUrl: string;
  cabinClass: string;
  ticketDetails: string;
}

const TicketDetails = ({
  flgihtCost,
  itenraries,
  agentImageUrl,
  cabinClass,
  ticketDetails,
}: Props) => {
  const t = useTranslations();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.detailsHeader}>
        <h1>{ticketDetails}</h1>
        <div className={styles.agentLogo}>
          <Image
            src={agentImageUrl}
            alt={t('XPsptCVMwMMzAE11MJ0S1')}
            width={135}
            height={0}
            loading="lazy"
          />
        </div>
      </div>
      <div className={styles.detailsFooter}>
        <div className={styles.legsContainer}>
          {itenraries.map((leg, index) => (
            <div key={index} className={styles.routesContainer}>
              <span className={styles.routes}>
                ({leg.origin})
                <MoveRight size={15} />({leg.destination})
              </span>
              <span className={styles.legDate}>
                <FormatDate date={leg.departure} />
              </span>
            </div>
          ))}
        </div>
        <div className={styles.costContainer}>
          <span className={styles.flightClass}>{cabinClass}</span>
          <span className={styles.flightCost}>
            <FormatPrice price={flgihtCost.amount} currency={flgihtCost.currency} />
            <span>{flgihtCost.currency}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
