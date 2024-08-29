import BackToHomePage from '@/components/common/custom/BackToHomePage/index';
import { locale } from '@/navigation';
import { languagesMap } from '@/services/data/languages';
import ContactUs from '@/views/ContactUs';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('tr2joS-7OCKhQp1UU5O8h'),
    description: t('3zpOvGNvMfRy_F9z00WTl'),
    alternates: {
      canonical: `/${params.locale}/contact-us`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}/contact-us`;
        return acc;
      }, {}),
    },
    openGraph: {
      title: t('tr2joS-7OCKhQp1UU5O8h'),
      description: t('3zpOvGNvMfRy_F9z00WTl'),
      url: `https://travolic.com/${params.locale}/contact-us`,
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
      title: t('tr2joS-7OCKhQp1UU5O8h'),
      description: t('3zpOvGNvMfRy_F9z00WTl'),
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

const ContactUsPage = ({ params: { locale } }: { params: { locale: locale } }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations();
  return (
    <>
      <BackToHomePage currentRoute={t('gLApj2fOg5jA-HhD-_LSu')} />
      <ContactUs />
    </>
  );
};

export default ContactUsPage;
