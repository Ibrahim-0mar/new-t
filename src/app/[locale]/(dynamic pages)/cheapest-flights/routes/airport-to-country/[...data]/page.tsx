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
  const airportCode = codes[0]?.toUpperCase();
  const countryCode = codes[1]?.toUpperCase();

  const t = await getTranslations();

  const language = languagesMap.find((l) => l.code === locale)!;

  const airportName = await getPlaceNameByCode(
    {
      code: airportCode,
      type: 'airport',
    },
    locale,
  );
  const countryName = await getPlaceNameByCode(
    {
      code: countryCode,
      type: 'country',
    },
    locale,
  );

  const currency = (await globalDataGetter('server', 'currency')) || defaultCurrency;

  const props: DynamicPageSectionProps = {
    origin: { code: airportCode, type: 'airport', name: airportName },
    destination: { code: countryCode, type: 'country', name: countryName },
  };

  const cheapestData = await cheapestTicketApi(
    props.origin,
    props.destination,
    currency,
    locale,
    language,
  );

  const cheapestPrice: string | undefined = cheapestData?.[0]?.price?.toString();

  const title = cheapestPrice
    ? t(
      'g66iOG95dFlxOSW5lhdLj',
      { origin: airportName, destination: countryName, cheapestPrice },
      {
        number: {
          currency: { style: 'currency', currency: currency.code, numberingSystem: 'latn' },
        },
      },
    )
    : t('nxqQoiYaiemvILGQjldog', { origin: airportName, destination: countryName });

  return {
    title,
    description: t('RE-YUAfsmUv2rzCVsdOgp', { origin: airportName, destination: countryName }),
    alternates: {
      canonical: `/${locale}/cheapest-flights/routes/airport-to-country/${formatString(data[0])}/${formatString(data[1])}/${formatString(data[2])}`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] =
          `/${language.code}/cheapest-flights/routes/airport-to-country/${formatString(data[0])}/${formatString(data[1])}//${formatString(data[2])}`;
        return acc;
      }, {}),
    },
    openGraph: {
      title,
      description: t('RE-YUAfsmUv2rzCVsdOgp', { origin: airportName, destination: countryName }),
      url: `https://travolic.com/${locale}/cheapest-flights/routes/airport-to-country/${formatString(data[0])}/${formatString(data[1])}/${formatString(data[2])}`,
      siteName: 'Travolic',
      images: [
        {
          url: '/ogImage.png',
          type: 'image/png',
          alt: 'Travolic',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: t('RE-YUAfsmUv2rzCVsdOgp', { origin: airportName, destination: countryName }),
      site: '@Travolicllc',
      images: [
        {
          url: '/ogImage.png',
          width: 2400,
          height: 1256,
          username: '@Travolicllc',
          type: 'image/png',
          alt: 'Travolic',
        },
      ],
    },
  };
}

const AirportToCountry = async ({
  params: { data, locale },
}: {
  params: { data: string[]; locale: locale };
}) => {
  const t = await getTranslations();

  const codes = data[0]?.split('-');
  const airportCode = codes[0]?.toUpperCase();
  const countryCode = codes[1]?.toUpperCase();

  const airportName = await getPlaceNameByCode(
    {
      code: airportCode,
      type: 'airport',
    },
    locale,
  );
  const countryName = await getPlaceNameByCode(
    {
      code: countryCode,
      type: 'country',
    },
    locale,
  );

  const props: DynamicPageSectionProps = {
    origin: { code: airportCode, type: 'airport', name: airportName },
    destination: { code: countryCode, type: 'country', name: countryName },
  };

  return (
    <>
      <SearchboxSection
        activeTab="flights"
        header={t('5fUFNvg8bZSkjTwsqYJSG', { destination: countryName })}
        data={{ origins: [airportCode], destinations: [countryName] }}
        isDynamicPage={true}
      // bgImage={imagesUrl + cityName.image.pathWithFilename}
      />
      <Container>
        <Breadcrumb {...props} />

        <h1 className="header mt-6">
          {t('R8wEEgs-2oVSDMB2D878Y', { origin: airportName, destination: countryName })}
        </h1>
        <p className="subHeader">
          {t('M0txayElVgfeC0oklDMTJ', { origin: airportName, destination: countryName })}
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

export default AirportToCountry;
