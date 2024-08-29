import { locale } from '@/navigation';
import { languagesMap } from '@/services/data/languages';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import Evisa from '@/views/Evisa';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import styles from './index.module.css';

type Props = {
  params: { locale: locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('VuJUFxCWX67WXhXD8eVZk'),
    description: t('4tVTPiGHHq1Ek1cxdGVYT'),
    alternates: {
      canonical: `/${params.locale}/evisa`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}/evisa`;
        return acc;
      }, {}),
    },
    openGraph: {
      title: t('VuJUFxCWX67WXhXD8eVZk'),
      description: t('4tVTPiGHHq1Ek1cxdGVYT'),
      url: `https://travolic.com/${params.locale}/evisa`,
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
      title: t('VuJUFxCWX67WXhXD8eVZk'),
      description: t('4tVTPiGHHq1Ek1cxdGVYT'),
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

const EvisaPage = ({ params: { locale } }: { params: { locale: locale } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  const handleIframeSrc = () => {
    switch (locale) {
      case 'en':
        return 'https://www.ivisa.com/widgets/visa-checker?utm_source=travolic&utm_medium=affiliate&background_color=v2-bg-blue-300&widget_width=730&widget_height=400';
      case 'fr':
        return 'https://fr.ivisa.com/widgets/visa-checker?utm_source=travolic&utm_medium=affiliate&background_color=v2-bg-blue-300&widget_width=730&widget_height=400';
      case 'zh':
        return 'https://ivisa.cn/widgets/visa-checker?utm_source=travolic&utm_medium=affiliate&background_color=v2-bg-blue-300&widget_width=730&widget_height=400';

      default:
        return 'https://www.ivisa.com/widgets/visa-checker?utm_source=travolic&utm_medium=affiliate&background_color=v2-bg-blue-300&widget_width=730&widget_height=400';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Image
          className={styles.headerImage}
          src={commonImgUrl('visa-header.png')}
          alt={t('kDD50cjH4QGJEimdDOiAR')}
          width={3000}
          height={0}
          priority
          layout="intrinsic"
        />
        <div className={styles.iframeGrandContainer}>
          <div className={styles.iframeContainer}>
            <div className={styles.iframeWrapper}>
              <div className={styles.headingsContainer}>
                <h1 className={styles.heading}>{t('JqTJN28B3yD5DKf_u4ZVM')}</h1>
                <p className={styles.subHeading}>{t('PLGcj7urVwKMf-Fe-li3M')}</p>
              </div>
              <iframe className={styles.iframe} src={handleIframeSrc()} allowTransparency />
            </div>
          </div>
        </div>
      </div>
      <Evisa />
    </div>
  );
};

export default EvisaPage;
