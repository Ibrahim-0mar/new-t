import ArrowRight from '@/components/common/base/ArrowRight';
import PagePaginationComponent from '@/components/common/custom/PagePaginationComponent';
import { locale } from '@/navigation';
import { getCountries } from '@/services/apis/common/countries';
import { backendImagesUrl } from '@/utils/config';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import { formatString } from '@/utils/helper/replacePlaceHolder';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import styles from './index.module.css';

interface CountryType {
  imageAlt: string;
  image?: { pathWithFilename: string };
  code: string;
  name: string;
  enName: string;
  _id: string;
  currency: CurrencyType;
}

interface Props {
  page: number;
  locale: locale;
}

/**
 * CountriesCardSection Component
 *
 * Fetches and displays a list of Countries in a card format with pagination.
 *
 * @param page - The current page number (default: 1).
 * @param locale - The locale of the content (default: 'en').
 *
 * Renders the  Country cards with relevant details and an arrow icon.
 * Uses the `PagePaginationComponent` to handle pagination.
 */
const CountriesCardSection = async ({ page = 1, locale = 'en' }: Props) => {
  // Fetches the list of  Countries based on the page number and locale
  const countries = await getCountries(Number(page), 15, locale);

  const countryName = (name: string) => {
    return name.length > 8 ? name.slice(0, 8) + '...' : name;
  };
  const t = await getTranslations();

  return (
    <>
      {countries ? (
        <>
          <div className={styles.cardsContainer}>
            {countries?.docs.length > 0 &&
              countries.docs.map((country: CountryType, index: number) => (
                <a
                  key={index}
                  href={`/cheapest-flights/to/country/${country.code}/${formatString(country.enName || country.name)}`}
                  target="_blank"
                  aria-label={`View flights to ${country.name} (${country.code})`}
                >
                  <div className={styles.cardContainer}>
                    <Image
                      src={
                        country.image
                          ? backendImagesUrl + country.image.pathWithFilename
                          : commonImgUrl('cityDefaultSmall.png')
                      }
                      alt={country.imageAlt || `Image of ${country.name}`}
                      className={styles.cardImage}
                      width={200}
                      height={0}
                      loading={index < 5 ? 'eager' : 'lazy'} // Prioritize loading for the
                    />
                    <div className={styles.cardDetails}>
                      <span className={styles.cardHeader}>
                        {countryName(country.name)} ({country.code})
                      </span>
                      <span className={styles.arrow}>
                        <ArrowRight color="#ffffff" size={20} />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
          </div>

          <PagePaginationComponent
            path="/countries"
            currentPage={page}
            hasNextPage={countries.hasNextPage}
            totalPages={countries.totalPages}
          />
        </>
      ) : (
        // Displayed if fetching Countries fails
        <div className={styles.loadingFaildContainer}>
          <h2 className={styles.failureDisclaimer}>{t('JlJPZ54lgmycsZPAyJUNo')}</h2>
        </div>
      )}
    </>
  );
};

export default CountriesCardSection;
