import { locale } from '@/navigation';
import { languagesMap } from '@/services/data/languages';
import AirportTransfersHome from '@/views/common/home/AirportTransfersHome';
import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('DTxkzBwAE5ryxxX5af2ww'),
    description: t('ZdelOFIJyafaHhoPt_s87'),
    alternates: {
      canonical: `/${params.locale}/airport-transfers`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}/airport-transfers`;
        return acc;
      }, {}),
    },
    openGraph: {
      title: t('DTxkzBwAE5ryxxX5af2ww'),
      description: t('ZdelOFIJyafaHhoPt_s87'),
      url: `https://travolic.com/${params.locale}/airport-transfers`,
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
      title: t('DTxkzBwAE5ryxxX5af2ww'),
      description: t('ZdelOFIJyafaHhoPt_s87'),
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

export default function AirportTransfersResultsHome({
  params: { locale },
}: {
  params: { locale: locale };
}) {
  unstable_setRequestLocale(locale);

  return (
    <div>
      <AirportTransfersHome />
    </div>
  );
}
