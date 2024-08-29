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
  params: { city, locale },
}: {
  params: { city: string[]; locale: locale };
}): Promise<Metadata> {
  const t = await getTranslations();

  const cityCode = city.length > 0 ? city[0] : '';
  const cityName = city.length > 1 ? city[1] : '';

  const language = languagesMap.find((l) => l.code === locale)!;
  const currency = (await globalDataGetter('server', 'currency')) || defaultCurrency;

  const nearbyAirport = (await globalDataGetter('server', 'nearbyAirport')) || { code: null };

  const props: DynamicPageSectionProps = {
    origin: { code: nearbyAirport?.code, type: 'airport', name: nearbyAirport?.name },
    destination: { code: cityCode, type: 'airport', name: cityName },
  };

  const cheapestData = await cheapestTicketApi(
    props?.origin,
    props?.destination,
    currency,
    locale,
    language,
  );

  const cheapestPrice: string | undefined = cheapestData?.[0]?.price?.toString();

  const fullCityName = await getPlaceNameByCode({ code: cityCode, type: 'city' }, locale);

  const title = cheapestPrice
    ? t(
        'bw6D5zCfstcsooFhKLPdC',
        { destination: fullCityName, cheapestPrice },
        {
          number: {
            currency: { style: 'currency', currency: currency?.code, numberingSystem: 'latn' },
          },
        },
      )
    : t('IpH1rx21_qq54PqCohp2B', { destination: fullCityName });

  const description = t('WLl-5QpE3EFC6gAlS65fo', { destination: fullCityName });

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/cheapest-flights/to/city/${formatString(cityCode)}/${formatString(cityName)}`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}/cheapest-flights/to/city/${formatString(cityCode)}/${formatString(cityName)}`;
        return acc;
      }, {}),
    },
    openGraph: {
      title,
      description,
      url: `https://travolic.com//${locale}/cheapest-flights/to/city/${formatString(cityCode)}/${formatString(cityName)}`,
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

const ToCity = async ({
  params: { city, locale },
}: {
  params: { city: string[]; locale: locale };
}) => {
  const t = await getTranslations();
  const cityCode = city.length > 0 ? city[0].toUpperCase() : '';
  const cityName = await getPlaceNameByCode({ code: cityCode, type: 'city' }, locale);

  const nearbyAirport = (await globalDataGetter('server', 'nearbyAirport')) || { code: null };

  const props: DynamicPageSectionProps = {
    origin: { code: nearbyAirport?.code, type: 'airport', name: nearbyAirport?.name },
    destination: { code: cityCode, type: 'city', name: cityName },
  };

  if (!cityName || !nearbyAirport?.code) {
    throw new Error(t('qntkmUExkuJQ8ng-buO2w'));
  }

  return (
    <>
      <SearchboxSection
        activeTab="flights"
        header={t('iY__4p2DxCIoIl_kp3o40', { destination: cityName })}
        data={{ origins: [nearbyAirport?.code], destinations: [cityCode] }}
        isDynamicPage={true}
      />
      <Container>
        <Breadcrumb {...props} />

        <h1 className="header mt-6">{t('swPv3jWDgyYkBrMYV3WDU', { destination: cityName })}</h1>
        <p className="subHeader">{t('LsbGXX0TgJ6VSzEvNwy4p', { destination: cityName })}</p>

        <CheapestTicket {...props} />
        <FlightInformations {...props} />
        <PopularAirlines {...props} />
        <CheapestFlightFound {...props} />
        <AirlinesPriceComparison {...props} />
        <HowToFind {...props} pageType="originDestination" />

        <SiteMapOptions place={props?.origin} />
      </Container>
      <AppDownloadSection />
    </>
  );
};

export default ToCity;
