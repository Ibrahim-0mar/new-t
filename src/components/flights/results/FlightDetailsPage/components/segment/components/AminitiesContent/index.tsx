import Button from '@/components/common/base/Button';
import styles from './index.module.css';
import { cn } from '@/utils/helper/tailwind_cn';
import {
  Armchair,
  Cable,
  CupSoda,
  Tv,
  UtensilsCrossed,
  Wifi,
  Luggage,
  Briefcase,
  Salad,
  TicketCheck,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const AminitiesItem = ({
  content,
  icon,
  className = '',
}: {
  content: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(styles.aminitiesItem, className)}>
      {icon}
      <span className={styles.amenititiesMessage}>{content}</span>
    </div>
  );
};

export const AmenitiesContent = ({ aminities }: any) => {
  const t = useTranslations();

  const openLink = (link: string, title: string) => {
    window?.open(link, title, 'width=320,height=700');
  };

  return (
    <div className={styles.aminitiesContainer}>
      <div>
        {aminities?.plane?.brandModel && (
          <span className=" my-3">
            {aminities?.plane?.brandModel + ' ' + '(' + aminities?.plane?.windowSize + ')'}
          </span>
        )}
      </div>
      {aminities?.plane?.aircraftType && (
        <span className="my-1">{aminities?.plane?.aircraftType}</span>
      )}

      <div>
        {aminities?.wifi?.exists ||
          (aminities?.wifi?.availability && (
            <AminitiesItem
              content={aminities?.wifi?.availability || t('mKMjOXWCvSbI2sk95S9f2')}
              icon={<Wifi size={16} className={styles.aminitiesIcon} />}
            />
          ))}

        {aminities?.entertainment?.exists ||
          (aminities?.entertainment?.availability && (
            <AminitiesItem
              content={
                <div>
                  {aminities?.entertainment?.cost && (
                    <span className="block">
                      {t('uTq3nHuwgaUutlK_WWrfF') + ' ' + aminities?.entertainment?.cost}
                    </span>
                  )}
                  {aminities?.entertainment?.availability && (
                    <span className="block">
                      {t('SJ9Hw6kA5OLCPoAzqLsxR') + ' ' + aminities?.entertainment?.availability}
                    </span>
                  )}
                  {aminities?.deliveryType?.cost && (
                    <span className="block">
                      {t('8DrVjPIH_b4ya6oCK8vU0') +
                        ':' +
                        ' ' +
                        aminities?.entertainment?.deliveryType}
                    </span>
                  )}
                </div>
              }
              icon={<Tv size={16} className={styles.aminitiesIcon} />}
            />
          ))}

        {aminities?.power?.exists ||
          (aminities?.power?.availability && (
            <AminitiesItem
              content={aminities?.power?.availability || t('vP0vPmTfZlbpWCQs8mHsZ')}
              icon={<Cable size={16} className={styles.aminitiesIcon} />}
            />
          ))}
        {aminities?.foodAndBeverages?.foodExists && (
          <AminitiesItem
            content={t('kNVd4kwzvusTGALOXYbpj')}
            icon={<UtensilsCrossed size={16} className={styles.aminitiesIcon} />}
          />
        )}
        {aminities?.availability && (
          <AminitiesItem
            content={aminities?.availability}
            icon={<TicketCheck size={16} className={styles.aminitiesIcon} />}
          />
        )}
        {aminities?.foodCost && (
          <AminitiesItem
            content={t('CM8tKjKJJjaEIlymvsRWb') + aminities?.foodCost}
            icon={<Salad size={16} className={styles.aminitiesIcon} />}
          />
        )}

        {aminities?.foodAndBeverages?.beveragesExists && (
          <AminitiesItem
            content={t('YUyBuV59NgzG5Nn8-4_Xb')}
            icon={<CupSoda size={16} className={styles.aminitiesIcon} />}
          />
        )}

        {aminities?.co2?.type && (
          <AminitiesItem
            content={
              t('4FCMQeroLt6M4n7q-Cc01') +
              aminities?.co2?.type +
              ' (' +
              Math.floor(aminities?.co2?.co2EmissionPerPax) +
              ' )'
            }
            icon={<span className={styles.co2}>{t('9Le7fQlpX_GqjGPxeu3LE')}</span>}
          />
        )}

        {aminities?.cabin && (
          <AminitiesItem
            content={
              <div>
                {aminities.cabin?.pitch && (
                  <span className="block">
                    {t('NRsu3PQxZaDPsY-_ta2uM') + ' ' + aminities.cabin?.pitch}
                  </span>
                )}
                {aminities?.cabin?.recline && (
                  <span className="block">
                    {t('xxmw4K2__aMYfahl4D_12') + ' ' + aminities?.cabin?.recline}
                  </span>
                )}
                {aminities?.cabin?.type && (
                  <span className="block">
                    {t('lD3hD0wFzQgRjmm4lxY2E') + ' ' + aminities?.cabin?.type}
                  </span>
                )}
                {aminities.cabin?.pitch && (
                  <span className="block">
                    {t('NRsu3PQxZaDPsY-_ta2uM') + ' ' + aminities.cabin?.pitch}
                  </span>
                )}
                {aminities?.cabin?.width && (
                  <span className="block">
                    {t('VVphNY9GGUgUY68yXsIad') + ' ' + aminities?.cabin?.width}
                  </span>
                )}
              </div>
            }
            icon={<Armchair size={16} className={styles.aminitiesIcon} />}
          />
        )}
      </div>
      <div className={styles.buttonsContainer}>
        {aminities?.baggage?.cabinItemInfoUrl && (
          <Button
            variant="default"
            className={styles.aminitiesButton}
            onClick={() =>
              openLink(aminities?.baggage?.cabinItemInfoUrl, t('cwZeCU-1NqamE2HByd970'))
            }
          >
            <Luggage size={16} strokeWidth={1.3}/>
            {t('cwZeCU-1NqamE2HByd970')}
          </Button>
        )}
        {aminities?.baggage?.checkinItemInfoUrl && (
          <Button
            variant="default"
            className={styles.aminitiesButton}
            onClick={() =>
              openLink(aminities?.baggage?.checkinItemInfoUrl, t('VuRmC7Sn8XXcQ3C2dSBRe'))
            }
          >
            <Briefcase size={16} className={styles.buttonIcon} strokeWidth={1.3} />
            {t('VuRmC7Sn8XXcQ3C2dSBRe')}
          </Button>
        )}
      </div>
    </div>
  );
};
