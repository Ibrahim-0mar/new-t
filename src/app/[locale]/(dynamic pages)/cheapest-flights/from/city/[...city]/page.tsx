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

import HowToFind from '@/views/DynamicPages/sections/howToFind';
import SiteMapOptions from '@/views/DynamicPages/sections/sitemapOptions';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params: { city, locale },
}: {
  params: { city: string[]; locale: locale };
}): Promise<Metadata> {
  const cityCode = city[0];
  const cityName = city[1];
  const t = await getTranslations();

  const language = languagesMap.find((l) => l.code === locale)!;

  const currency = (await globalDataGetter('server', 'currency')) || defaultCurrency;
  const { code: nearbyAirportCode, name: nearbyName } = (await globalDataGetter(
    'server',
    'nearbyAirport',
  )) || { code: null };

  const props: DynamicPageSectionProps = {
    origin: { code: cityCode, type: 'country', name: cityName },
    destination: { code: nearbyAirportCode, type: 'city', name: nearbyName },
  };

  const cheapestData = await cheapestTicketApi(
    props.origin,
    props.destination,
    currency,
    locale,
    language,
  );

  const cheapestPrice: string | undefined = cheapestData?.[0]?.price?.toString();

  const cityFullName = await getPlaceNameByCode(
    {
      code: cityCode,
      type: 'city',
    },
    locale,
  );

  const title = cheapestPrice
    ? t(
        'Z6eXJTqfmb_wcAjIzhvKS',
        { origin: cityFullName, cheapestPrice },
        {
          number: {
            currency: { style: 'currency', currency: currency.code, numberingSystem: 'latn' },
          },
        },
      )
    : t('g63XL30XOpQVpP01QrTo6', { origin: cityFullName });

  const description = t('ml-HvFu0MY6gmGHuSLH_g', { origin: cityFullName });

  return {
    title,
    description,
    alternates: {                                                                                        //check if this is needed
      canonical: `/${locale}/cheapest-flights/from/city/${formatString(city[0])}/${formatString(city[1])}${city[2] ? '/' + formatString(city[2]) : ''}`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] =                                                                             //check if this is needed
          `${language.code}/cheapest-flights/from/city/${formatString(city[0])}/${formatString(city[1])}${city[2] ? '/' + formatString(city[2]) : ''}`;
        return acc;
      }, {}),
    },
    openGraph: {
      title,
      description,
      url: `https://travolic.com//${locale}/cheapest-flights/from/city/${formatString(city[0])}/${formatString(city[1])}`,
      siteName: t('jvSCLI0fSnM0IGMagNIbr'),
      images: [
        {
          url: '/ogImage.png',
          type: 'image/png',
          alt: t('jvSCLI0fSnM0IGMagNIbr'),
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

const FromCity = async ({
  params: { city, locale },
}: {
  params: { city: string[]; locale: locale };
}) => {
  const t = await getTranslations();

  const cityCode = city[0].toUpperCase();
  const cityName = await getPlaceNameByCode(
    {
      code: cityCode,
      type: 'city',
    },
    locale,
  );
  return (
    <>
      <SearchboxSection
        activeTab="flights"
        header={t('iY__4p2DxCIoIl_kp3o40', { destination: cityName })}
        data={{ origins: [cityCode] }}
        isDynamicPage={true}
        // bgImage={imagesUrl + cityName.image.pathWithFilename}
      />
      <Container>
        <Breadcrumb origin={{ code: cityCode, type: 'city', name: cityName }} />

        <h1 className="header mt-6">{t('_MIRUm35A-C9s-OKBQHM5', { origin: cityName })}</h1>
        <p className="subHeader">{t('pZkH8MwhcIofOGULHEPvb', { origin: cityName })}</p>

        <HowToFind
          origin={{ code: cityCode, type: 'city', name: cityName }}
          pageType="originOnly"
        />
        <SiteMapOptions place={{ code: cityCode, type: 'airport', name: cityName }} />
      </Container>
      <AppDownloadSection />
    </>
  );
};

export default FromCity;
