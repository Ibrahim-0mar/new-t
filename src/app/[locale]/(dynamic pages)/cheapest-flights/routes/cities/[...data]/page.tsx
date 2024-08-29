import Container from '@/components/common/base/Container';
import { locale } from '@/navigation';
import AppDownloadSection from '@/sections/common/AppDownloadSection';
import SearchboxSection from '@/sections/common/SearchboxSection';
import { cheapestTicketApi } from '@/services/apis/dynamicPages';
import { getPlaceNameByCode } from '@/services/apis/flights/places';
import { defaultCurrency } from '@/services/data/common';
import { languagesMap } from '@/services/data/languages';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { formatString } from '@/utils/helper/replacePlaceHolder';
import { DynamicPageSectionProps } from '@/utils/types/common/dynamicPages';
import Breadcrumb from '@/views/DynamicPages/sections/Breadcrumb';
import AirlinesPriceComparison from '@/views/DynamicPages/sections/airlinesPriceComparison';
import CheapestFlightFound from '@/views/DynamicPages/sections/cheapestFlightFound';
import CheapestTicket from '@/views/DynamicPages/sections/cheapestTicket';
import FlightInformations from '@/views/DynamicPages/sections/flightInformations';
import HowToFind from '@/views/DynamicPages/sections/howToFind';
import PopularAirlines from '@/views/DynamicPages/sections/popularAirlines';
import SiteMapOptions from '@/views/DynamicPages/sections/sitemapOptions';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params: { data, locale },
}: {
  params: { data: string[]; locale: locale };
}): Promise<Metadata> {
  const codes = data[0]?.split('-');
  const originCode = codes[0]?.toUpperCase();
  const destinationCode = codes[1]?.toUpperCase();

  const language = languagesMap.find((l) => l.code === locale)!;

  const origin = await getPlaceNameByCode(
    {
      code: originCode,
      type: 'city',
    },
    locale,
  );
  const destination = await getPlaceNameByCode(
    {
      code: destinationCode,
      type: 'city',
    },
    locale,
  );

  const currency = (await globalDataGetter('server', 'currency')) || defaultCurrency;

  const props: DynamicPageSectionProps = {
    origin: { code: originCode, type: 'city', name: origin },
    destination: { code: destinationCode, type: 'city', name: destination },
  };

  const cheapestData = await cheapestTicketApi(
    props.origin,
    props.destination,
    currency,
    locale,
    language,
  );

  const t = await getTranslations();

  const cheapestPrice: string | undefined = cheapestData?.[0]?.price?.toString();

  const title = cheapestPrice
    ? t(
      'g66iOG95dFlxOSW5lhdLj',
      { origin, destination, cheapestPrice },
      {
        number: {
          currency: { style: 'currency', currency: currency.code, numberingSystem: 'latn' },
        },
      },
    )
    : t('nxqQoiYaiemvILGQjldog', { origin, destination });

  return {
    title,
    description: t('RE-YUAfsmUv2rzCVsdOgp', { origin, destination }),
    alternates: {
      canonical: `/${locale}/cheapest-flights/routes/cities/${formatString(data[0])}/${formatString(data[1])}/${formatString(data[2])}`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] =
          `/${language.code}/cheapest-flights/routes/cities/${formatString(data[0])}/${formatString(data[1])}/${formatString(data[2])}`;
        return acc;
      }, {}),
    },
  };
}

const CityToCity = async ({
  params: { data, locale },
}: {
  params: { data: string[]; locale: locale };
}) => {
  const t = await getTranslations();

  const codes = data[0]?.split('-');
  const originCode = codes[0]?.toUpperCase();
  const destinationCode = codes[1]?.toUpperCase();

  const originName = await getPlaceNameByCode(
    {
      code: originCode,
      type: 'city',
    },
    locale,
  );
  const destinationName = await getPlaceNameByCode(
    {
      code: destinationCode,
      type: 'city',
    },
    locale,
  );

  const props: DynamicPageSectionProps = {
    origin: { code: originCode, type: 'city', name: originName },
    destination: { code: destinationCode, type: 'city', name: destinationName },
  };

  return (
    <>
      <SearchboxSection
        activeTab="flights"
        header={t('5fUFNvg8bZSkjTwsqYJSG', { destination: destinationName })}
        // bgImage={imagesUrl + cityName.image.pathWithFilename}
        data={{ origins: [originCode], destinations: [destinationCode] }}
        isDynamicPage={true}
      />
      <Container>
        <Breadcrumb {...props} />

        <h1 className="header mt-6">
          {t('R8wEEgs-2oVSDMB2D878Y', { origin: originName, destination: destinationName })}
        </h1>
        <p className="subHeader">
          {t('M0txayElVgfeC0oklDMTJ', { origin: originName, destination: destinationName })}
        </p>

        <CheapestTicket {...props} />
        <FlightInformations {...props} />
        <PopularAirlines {...props} />
        <CheapestFlightFound {...props} />
        <AirlinesPriceComparison {...props} />
        <HowToFind {...props} pageType="originDestination" />
        <SiteMapOptions place={props.destination} />
      </Container>
      <AppDownloadSection />
    </>
  );
};

export default CityToCity;
