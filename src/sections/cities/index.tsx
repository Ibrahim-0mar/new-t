import ArrowRight from '@/components/common/base/ArrowRight';
import PagePaginationComponent from '@/components/common/custom/PagePaginationComponent';
import { locale } from '@/navigation';
import { getCities } from '@/services/apis/common/cities';
import { backendImagesUrl } from '@/utils/config';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import { formatString } from '@/utils/helper/replacePlaceHolder';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import styles from './index.module.css';

interface CityType {
  imageAlt: string;
  image: { pathWithFilename: string };
  code: string;
  name: string;
  enName: string;
}

interface Props {
  page: number;
  locale: locale;
}

/**
 * CitiesCardSection Component
 *
 * Fetches and displays a list of cities in a card format with pagination.
 *
 * @param page - The current page number (default: 1).
 * @param locale - The locale of the content (default: 'en').
 *
 * Renders the city cards with relevant details and an arrow icon.
 * Uses the `PagePaginationComponent` to handle pagination.
 */
const CitiesCardSection = async ({ page = 1, locale = 'en' }: Props) => {
  // Fetches the list of cities based on the page number and locale
  const cities: any = await getCities(Number(page), 15, locale);
  const t = await getTranslations();

  return (
    <>
      {cities ? (
        <>
          <div className={styles.cardsContainer}>
            {cities.docs.length > 0 &&
              cities.docs.map((city: CityType, index: number) => (
                <a
                  key={index}
                  href={`/cheapest-flights/to/city/${city.code}/${formatString(city.enName)}`}
                  target="_blank"
                  aria-label={`View flights to ${city.name} (${city.code})`}
                >
                  <div className={styles.cardContainer}>
                    <Image
                      src={
                        city.image
                          ? backendImagesUrl + city.image.pathWithFilename
                          : commonImgUrl('cityDefaultSmall.png')
                      }
                      alt={t('gzeodjYd_7Hx-Bzl1_L2o', { city: city.imageAlt })}
                      className={styles.cardImage}
                      width={200}
                      height={0}
                      loading={index < 5 ? 'eager' : 'lazy'} // Prioritize loading for the first five images
                      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw" // Adjust image size based on screen width
                    />
                    <div className={styles.cardDetails}>
                      <div className={styles.nameSection}>
                        <span className={styles.cardHeader}>
                          {city.name} ({city.code})
                        </span>
                      </div>
                      <span className={styles.arrow}>
                        <ArrowRight color="#ffffff" size={20} />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
          </div>
          <PagePaginationComponent
            path="/cities"
            currentPage={page}
            hasNextPage={cities.hasNextPage}
            totalPages={cities.totalPages}
          />
        </>
      ) : (
        // Displayed if fetching cities fails
        <div className={styles.loadingFaildContainer}>
          <h2 className={styles.failureDisclaimer}>{t('MHc0_Estd6bSpGk2VccWf')}</h2>
        </div>
      )}
    </>
  );
};

export default CitiesCardSection;
