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
    origin: { code: countryCode, type: 'country', name: countryName },
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

  const countryFullName = await getPlaceNameByCode(
    {
      code: countryCode,
      type: 'country',
    },
    locale,
  );

  const title = cheapestPrice
    ? t(
        'Z6eXJTqfmb_wcAjIzhvKS',
        { origin: countryFullName, cheapestPrice },
        {
          number: {
            currency: { style: 'currency', currency: currency.code, numberingSystem: 'latn' },
          },
        },
      )
    : t('g63XL30XOpQVpP01QrTo6', { origin: countryFullName });

  const description = t('ml-HvFu0MY6gmGHuSLH_g', { origin: countryFullName });

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/cheapest-flights/from/country/${formatString(countryCode)}/${formatString(countryName)}`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] =
          `/${language.code}/cheapest-flights/from/country/${formatString(countryCode)}/${formatString(countryName)}`;
        return acc;
      }, {}),
    },
    openGraph: {
      title,
      description,
      url: `https://travolic.com//${locale}/cheapest-flights/from/country/${formatString(countryCode)}/${formatString(countryName)}`,
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

const FromCountry = async ({
  params: { country, locale },
}: {
  params: { country: string[]; locale: locale };
}) => {
  const t = await getTranslations();

  const countryCode = country[0]?.toUpperCase();
  const countryName = await getPlaceNameByCode(
    {
      code: countryCode,
      type: 'country',
    },
    locale,
  );
  return (
    <>
      <SearchboxSection
        activeTab="flights"
        header={t('iY__4p2DxCIoIl_kp3o40', { destination: countryName })}
        data={{ origins: [countryName] }}
        isDynamicPage={true}
      // bgImage={imagesUrl + cityName.image.pathWithFilename}
      />
      <Container>
        <Breadcrumb origin={{ code: countryCode, type: 'country', name: countryName }} />

        <h1 className="header mt-6">{t('_MIRUm35A-C9s-OKBQHM5', { origin: countryName })}</h1>
        <p className="subHeader">{t('pZkH8MwhcIofOGULHEPvb', { origin: countryName })}</p>

        <HowToFind
          origin={{ code: countryCode, type: 'country', name: countryName }}
          pageType="originOnly"
        />
        <SiteMapOptions place={{ code: countryCode, name: countryName, type: 'country' }} />
      </Container>
      <AppDownloadSection />
    </>
  );
};

export default FromCountry;
