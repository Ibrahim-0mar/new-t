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
  params: { country, locale },
}: {
  params: { country: string[]; locale: locale };
}): Promise<Metadata> {
  const countryCode = country[0]?.toUpperCase();
  const countryName = country[1]?.replace(/-/g, ' ');
  const t = await getTranslations();

  const language = languagesMap.find((l) => l.code === locale)!;
  const currency = (await globalDataGetter('server', 'currency')) || defaultCurrency;

  const { code: nearbyAirportCode, name: nearbyName } = (await globalDataGetter(
    'server',
    'nearbyAirport',
  )) || { code: null };

  const props: DynamicPageSectionProps = {
    origin: { code: nearbyAirportCode, type: 'airport', name: nearbyName },
    destination: { code: countryCode, type: 'airport', name: countryName },
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
      'bw6D5zCfstcsooFhKLPdC',
      { destination: countryName, cheapestPrice },
      {
        number: {
          currency: { style: 'currency', currency: currency.code, numberingSystem: 'latn' },
        },
      },
    )
    : t('IpH1rx21_qq54PqCohp2B', { destination: countryName });

  const description = t('WLl-5QpE3EFC6gAlS65fo', { destination: countryName });

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/cheapest-flights/to/country/${formatString(countryCode)}/${formatString(countryName)}`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] =
          `/${language.code}/cheapest-flights/to/country/${formatString(countryCode)}/${formatString(countryName)}`;
        return acc;
      }, {}),
    },
    openGraph: {
      title,
      description,
      url: `https://travolic.com//${locale}/cheapest-flights/to/country/${formatString(countryCode)}/${formatString(countryName)}`,
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
      description,
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

const ToCountry = async ({
  params: { country, locale },
}: {
  params: { country: string[]; locale: locale };
}) => {
  const t = await getTranslations();

  const countryCode = country[0].toUpperCase();
  const countryName = await getPlaceNameByCode(
    {
      code: countryCode,
      type: 'country',
    },
    locale,
  );

  const { code: nearbyAirportCode, name: nearbyName } = (await globalDataGetter(
    'server',
    'nearbyAirport',
  )) || { code: null };

  const props: DynamicPageSectionProps = {
    origin: { code: nearbyAirportCode, type: 'airport', name: nearbyName },
    destination: { code: countryCode, type: 'country', name: countryName },
  };

  return (
    <>
      <SearchboxSection
        activeTab="flights"
        header={t('iY__4p2DxCIoIl_kp3o40', { destination: countryName })}
        data={{ origins: [nearbyAirportCode], destinations: [countryName] }}
        isDynamicPage={true}
      // bgImage={imagesUrl + cityName.image.pathWithFilename}
      />
      <Container>
        <Breadcrumb {...props} />

        <h1 className="header mt-6">{t('swPv3jWDgyYkBrMYV3WDU', { destination: countryName })}</h1>
        <p className="subHeader">{t('LsbGXX0TgJ6VSzEvNwy4p', { destination: countryName })}</p>

        <CheapestTicket {...props} />
        <FlightInformations {...props} />
        <PopularAirlines {...props} />
        <CheapestFlightFound {...props} />
        <AirlinesPriceComparison {...props} />
        <HowToFind {...props} pageType="originDestination" />
        <SiteMapOptions place={props.origin} />
      </Container>
      <AppDownloadSection />
    </>
  );
};

export default ToCountry;
