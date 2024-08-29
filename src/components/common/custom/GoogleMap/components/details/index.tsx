import { cn } from '@/utils/helper/tailwind_cn';
import { FoldVertical, Check } from 'lucide-react';
import Button from '../../../../base/Button';
import styles from './index.module.css';
import { Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';

interface DetailsProps {
  routes: google.maps.DirectionsRoute[];
  routeIndex: number;
  setRouteIndex: Dispatch<SetStateAction<number>>;
  toggleDetails: Dispatch<SetStateAction<boolean>>;
  withRouteAlternatives: boolean;
}

const Details = ({
  toggleDetails,
  routes,
  setRouteIndex,
  routeIndex,
  withRouteAlternatives,
}: DetailsProps) => {
  const t=useTranslations();
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];
  const summary = withRouteAlternatives
    ? selected?.summary.length > 30
      ? `${selected?.summary.slice(0, 30)}...`
      : selected?.summary
    : selected?.summary;

  return (
    <div className={styles.detailsContainer}>
      <Button
        variant="default"
        onClick={(toggle) => toggleDetails(!toggle)}
        className={cn(styles.toggleBtn, styles.hideBtn)}
      >
        {t('tHvj0oWalj6UBBf7eCh7l')}
        <FoldVertical size={15} />
      </Button>
      <h2 className="text-fifth">{summary}</h2>
      <p>
        {t('_EWd-qWRwQrcRPMmhzQxr')}
        <span>{leg?.start_address?.split(',')[0]}</span>
      </p>
      <p>
        {t('QtGvxrL3O3Lq6nMh6i5mm')}
        <span>{leg?.distance?.text}</span>
      </p>
      <p>
        {t('GX8X2AIq_YUJk85c8EqiI')}
        <span>{leg?.duration?.text}</span>
      </p>
      {/* Alternative routes */}
      {routes.length > 1 && (
        <>
          <h2 className="mt-2">{t('t5aI9PzQQwsmvbvxKIy9h')}</h2>
          <ul>
            {routes.map((route, index) => (
              <Button
                key={index}
                variant="default"
                onClick={() => setRouteIndex(index)}
                className={cn(
                  styles.routeButton,
                  routeIndex === index && styles.activeRoute,
                )}
              >
                {routeIndex === index && <Check size={15} />}
                <li
                  key={index}
                  className={cn(
                    styles.routeLi,
                    routeIndex === index && 'list-none pl-0 text-left indent-0',
                  )}
                >
                  {route?.summary}
                </li>
              </Button>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Details;
