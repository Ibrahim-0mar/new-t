import { Link, locale } from '@/navigation';
import { defaultCurrency } from '@/services/data/common';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { formatString } from '@/utils/helper/replacePlaceHolder';
import { FlightPoint } from '@/utils/types/common/dynamicPages';
import { getLocale, getTranslations } from 'next-intl/server';
import countries from './Countries.json';
import styles from './index.module.css';
import SitemapSectionWrappr from './wrapper';
import { getPlaceNameByCode } from '@/services/apis/flights/places';
import { fetchTredingDestionRequest } from '@/services/apis/flights/trending/fetchTrendingDestinations';

const SiteMapOptions = async ({ place }: { place: FlightPoint }) => {
  const locale = (await getLocale()) as locale;
  // const locale = 'en';
  const t = await getTranslations();

  const currency = (await globalDataGetter('server', 'currency')) || defaultCurrency;
  //This endporint take only airport code so, don't call it at other case city or country
  const trendingCitiesdata =
    place.code && place.type === 'airport'
      ? (await fetchTredingDestionRequest({
          code: place.code,
          limit: 100,
          currency: currency?.code || 'USD',
          locale,
        })) || []
      : [];

  const citiesdata:any =
    trendingCitiesdata && trendingCitiesdata.length > 0
      ? trendingCitiesdata
          .map((item: any) => ({ name: item?.city?.name, code: item?.destination }))
          .filter((item: any) => item.code !== place?.code)
      : [];

    const placeEnglishName = await getPlaceNameByCode(
      {
        code: place.code,
        type: place.type,
      },
      "en",
    );
    
  const LinksWrapper = (
    linksArray: {
      name: string;
      code: string;
      translation: { language: string; name: string }[];
    }[],
    type: 'city' | 'country',
    direction: 'from' | 'to',
  ) => {
    return (
      <div className={styles.sitmapLinksContainer}>
        {linksArray.map((link, index) => {
          const name =
            link?.translation?.find((translation) => translation.language === locale)?.name ||
            link?.name;
          const code = link.code;

          switch (direction) {
            case 'to':
              return (
                <Link
                  href={`/cheapest-flights/routes/${
                    type !== place?.type
                      ? `${type}-to-${place?.type}`
                      : type === 'city'
                        ? 'cities'
                        : 'countries'
                  }/${code}-${place?.code}/${formatString(link?.name)}/${formatString(placeEnglishName as string)}`}
                  key={index}
                  target="_blank"
                  className={styles.sitmapLink}
                >
                  {name} {t('aWVshCVtiZfVEf80ychRM', { place: place?.name || '' })}
                </Link>
              );
            case 'from':
              return (
                <Link
                  href={`/cheapest-flights/routes/${
                    type !== place?.type
                      ? `${place?.type}-to-${type}`
                      : type === 'city'
                        ? 'cities'
                        : 'countries'
                  }/${place?.code}-${code}/${formatString(placeEnglishName as string)}/${formatString(link?.name)}`}
                  key={index}
                  target="_blank"
                  className={styles.sitmapLink}
                >
                  {place?.name} {t('aWVshCVtiZfVEf80ychRM', { place: name })}
                </Link>
              );
          }
        })}
      </div>
    );
  };
  return (
    <div className={styles.mainContainer}>
      <h2>{t('JiAolMmuM8nAv-hvVW2wW', { place: place?.name })}</h2>
      <SitemapSectionWrappr isCitiesdata={citiesdata.length > 0}>
        {citiesdata.length > 0 && LinksWrapper(citiesdata, 'city', 'to')}
        {citiesdata.length > 0 && LinksWrapper(citiesdata, 'city', 'from')}
        {LinksWrapper(countries, 'country', 'to')}
        {LinksWrapper(countries, 'country', 'from')}
      </SitemapSectionWrappr>
    </div>
  );
};

export default SiteMapOptions;
