import AuthModal from '@/components/common/custom/auth/AuthModal';
import Cookies from '@/components/common/custom/Cookies';
import Footer from '@/components/common/custom/Footer/index';
import Navbar from '@/components/common/custom/Navbar';
import { locale, locales } from '@/navigation';
import { languagesMap } from '@/services/data/languages';
import {
  aref_reqaa,
  changa,
  getFontClassName,
  notoSansChinese,
  poppins,
  roboto,
  yellowTail,
} from '@/utils/fonts';
import { cn } from '@/utils/helper/tailwind_cn';
import Providers from '@/utils/lib/providers';
import Scripts from '@/utils/scripts';
import type { Metadata, Viewport } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { headers } from 'next/headers';
import 'reactjs-popup/dist/index.css';
import { Toaster } from 'sonner';
import './globals.css';

type Props = {
  params: { locale: locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const viewport: Viewport = {
  themeColor: '#d6de29',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations();

  const headersList = headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const fullUrl = `${protocol}://${host}`;
  return {
    title: {
      template: `%s - ${t('jvSCLI0fSnM0IGMagNIbr')}`,
      default: t('m1yI4RPRT3MYaKeCt4i3y'),
    },
    description: t('vwEwW-PtPHyNmk06k7x-q'),
    metadataBase: new URL(fullUrl),
    alternates: {
      canonical: `/${params.locale}`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}`;
        return acc;
      }, {}),
    },
    openGraph: {
      title: t('m1yI4RPRT3MYaKeCt4i3y'),
      description: t('vwEwW-PtPHyNmk06k7x-q'),
      url: 'https://travolic.com/en',
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
      title: t('m1yI4RPRT3MYaKeCt4i3y'),
      description: t('vwEwW-PtPHyNmk06k7x-q'),
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
    appleWebApp: {
      title: 'Travolic',
      statusBarStyle: 'black-translucent',
      capable: true,
      startupImage: '/icon.png',
    },
    icons: {
      shortcut: '/icon.png',
      apple: '/icon.png',
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: '/icon.png',
      },
    },
    appLinks: {
      android: {
        app_name: 'Travolic',
        package: 'com.travolic.app',
        url: 'https://play.google.com/store/apps/details?id=com.travolic.app',
      },
      ios: {
        app_name: 'Travolic',
        app_store_id: '1665657440',
        url: 'https://apps.apple.com/us/app/apple-store/id1665657440',
      },
      iphone: {
        app_name: 'Travolic',
        app_store_id: '1665657440',
        url: 'https://apps.apple.com/us/app/apple-store/id1665657440',
      },
      ipad: {
        app_name: 'Travolic',
        app_store_id: '1665657440',
        url: 'https://apps.apple.com/us/app/apple-store/id1665657440',
      },
      web: {
        url: 'https://travolic.com',
        should_fallback: true,
      },
    },
    // to prevent indexing travolic.site to prevent content duplication
    robots: {
      index: host?.includes('travolic.site') ? false : true,
      follow: host?.includes('travolic.site') ? false : true,
    },
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: locale };
}) {
  unstable_setRequestLocale(locale);

  return (
    <html
      className="!scroll-smooth"
      lang={locale}
      suppressHydrationWarning
      suppressContentEditableWarning
    >
      {/* //TODO: remove suppressHydrationWarning and solve hydration issue */}
      <head>
        {/* for show app download on ios */}
        <meta name="apple-itunes-app" content="app-id=1665657440" />
        <Scripts />
      </head>
      <body
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        className={cn(
          '',
          poppins.variable,
          yellowTail.variable,
          roboto.variable,
          changa.variable,
          notoSansChinese.variable,
          aref_reqaa.variable,
          getFontClassName(locale),
          'bg-primary scrollbar-thin scrollbar-webkit',
        )}
      >
        <main>
          <Providers>
            <AuthModal />
            <Navbar locale={locale} />
            {children}
            <Footer />
            <Cookies />
            <Toaster
              closeButton
              richColors
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
              position={locale === 'ar' ? 'bottom-left' : 'bottom-right'}
            />
          </Providers>
          <noscript>
            <iframe
              src="https://data.travolic.com/ns.html?id=GTM-TRH7CL2W"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              loading="lazy"
            />
          </noscript>
        </main>
      </body>
    </html>
  );
}
