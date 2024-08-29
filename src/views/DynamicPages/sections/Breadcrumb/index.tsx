import ChevronRight from '@/components/common/base/ChevronRight';
import { Link, locale } from '@/navigation';
import { getAirport } from '@/services/apis/common/airports';
import { getCity } from '@/services/apis/common/cities';
import { FlightPoint } from '@/utils/types/common/dynamicPages';
import { getLocale, getTranslations } from 'next-intl/server';
import styles from './index.module.css';

interface Props {
  origin: FlightPoint;
  destination?: FlightPoint;
}

const Breadcrumb = async ({ origin, destination }: Props) => {
  const locale = (await getLocale()) as locale;
  const t = await getTranslations();

  const getPlacesData = async (point: FlightPoint) => {
    switch (point.type) {
      case 'airport':
        return await getAirport(point.code!, locale);

      case 'city':
        return await getCity(point.code!, locale);

      case 'country':
        return point;
    }
  };

  const data = await getPlacesData(origin);

  if (!data) {
    return null;
  }

  const countryData = origin.type === 'airport' ? data?.city?.country : data?.country;
  const cityData = origin.type === 'airport' ? data?.city : data;

  return (
    <div className={styles.container}>
      <div className={styles.linksContainer}>
        <Link href={'/'} className={styles.link}>
          {t('xx5m7bnO0YCsdch7L2s-F')}
        </Link>
        <ChevronRight className={styles.chevronRight} />
        {origin.type !== 'country' ? (
          <>
            {/* Country */}
            <Link href={`/cheapest-flights/from/country/${countryData?.code}/${countryData?.name}`}>
              <span className={styles.link}>{countryData?.name}</span>
            </Link>
            <ChevronRight className={styles.chevronRight} />
            {/* city */}
            {destination ? (
              <Link
                href={`/cheapest-flights/from/${origin?.type}/${cityData?.code}/${cityData?.name}`}
              >
                <span className={destination ? styles.link : styles.dest}>{cityData?.name}</span>
              </Link>
            ) : (
              <span className={destination ? styles.link : styles.dest}>{cityData?.name}</span>
            )}
            <ChevronRight className={styles.chevronRight} />
          </>
        ) : (
          <>
            <span className={styles.dest}>{origin?.name}</span>
            <ChevronRight className={styles.chevronRight} />
          </>
        )}

        {destination && (
          <>
            {/* dest */}
            <span className={styles.dest}>{destination?.name}</span>
            <ChevronRight className={styles.chevronRight} />
          </>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
