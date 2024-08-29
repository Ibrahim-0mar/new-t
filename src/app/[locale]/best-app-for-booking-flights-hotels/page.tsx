import Container from '@/components/common/base/Container';
import AccordionComponent from '@/components/common/custom/AccordionSSR/AccordionComponent';
import { locale } from '@/navigation';
import { languagesMap } from '@/services/data/languages';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import styles from './page.module.css';

type Props = {
  params: { locale: locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('-pmY5sXR4Cv8ZPWrS-gIN'),
    description: t('aSh4ChbuPmOLFPfRYv9TJ'),
    alternates: {
      canonical: `/${params.locale}/best-app-for-booking-flights-hotels`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}/best-app-for-booking-flights-hotels`;
        return acc;
      }, {}),
    },
    openGraph: {
      title: t('-pmY5sXR4Cv8ZPWrS-gIN'),
      description: t('aSh4ChbuPmOLFPfRYv9TJ'),
      url: `https://travolic.com/${params.locale}/best-app-for-booking-flights-hotels`,
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
      title: t('-pmY5sXR4Cv8ZPWrS-gIN'),
      description: t('aSh4ChbuPmOLFPfRYv9TJ'),
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

export default function DownloadAppPage({ params: { locale } }: { params: { locale: locale } }) {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  const appFeatures = [
    {
      title: t('f5QcHzIMBoxT7d792OCO-'),
      description: t('rUzf4NYFJHELZCqTE1UVs'),
      image: 'travel.svg',
    },
    {
      title: t('mvdB2PEBc3aI0-HeXchaA'),
      description: t('64BVPpnjyq0SWNjdsJtyJ'),
      image: 'location.svg',
    },
    {
      title: t('nRlisxkcOdkIPNhOIVQ6R'),
      description: t('p1waa_PCMDkknoVqjbNhS'),
      image: 'lock.svg',
    },
    {
      title: t('4VCYTG3ucGtVN0TzAxE7I'),
      description: t('OXs00UO841UBnPP2-6Gs4'),
      image: 'clock.svg',
    },
  ];

  const faqs = [
    {
      title: t('iFO8hSrosb7ZQETM02Jh2'),
      content: t('DcTKr9o5ROG5WoBCfhDGz'),
    },
    {
      title: t('TJVrP-AByqMVsoXKvF7si'),
      content: t('o4GcZnpV8FmjYOLH3vY0S'),
    },
    {
      title: t('B_BkQwiJoLAnEoCRR7131'),
      content: t('anE0XQq6a79t_V_xV52CU'),
    },
  ];

  return (
    <Container>
      {/* Download our app */}
      <section className={styles.downloadApp}>
        {/* Text content */}
        <article>
          {/* Heading */}
          <h1>{t('pqWmlX5EqmYQzJZcPbyzb')}</h1>

          {/* Description */}
          <p className={styles.decription}>{t('ufD_AyhQp_diZHF5A7HZK')}</p>

          {/* QR Code box (DESKTOP) */}
          <div className={styles.QRCodeBox}>
            {/* QR Code */}
            <Image
              src={commonImgUrl('QR Code.png')}
              alt={t('uAhd5NdNyCuHbxmWbtP8u')}
              width={177}
              height={177}
              priority
            />
            {/* Description */}
            <div className={styles.description}>
              <p>{t('uqGQJBCMXwLMJxfOZmOE1')}</p>
              <p>{t('IcyldTikaJUfLgWEaLS-G')}</p>
            </div>
          </div>

          {/* Download App (MOBILE) */}
          <div className={styles.download}>
            <a
              href="https://play.google.com/store/apps/details?id=com.travolic.app"
              target="_blank"
            >
              <span className="sr-only">{t('csF3VTS-gBI4FjRiiP1TU')}</span>
              <Image
                src={commonImgUrl('google-play.png')}
                alt={t('csF3VTS-gBI4FjRiiP1TU')}
                height={55}
                width={156}
                priority
              />
            </a>
            <a href="https://apps.apple.com/us/app/apple-store/id1665657440" target="_blank">
              <span className="sr-only">{t('0In9ULHvWy6QHQMso7x75')}</span>
              <Image
                src={commonImgUrl('app-store.png')}
                alt={t('0In9ULHvWy6QHQMso7x75')}
                height={55}
                width={156}
                priority
              />
            </a>
          </div>
        </article>

        {/* Phone Image */}
        <div className={styles.img}>
          <Image
            src={commonImgUrl('app-phone.webp')}
            alt={t('QaUSZMBubMcFWYR_v5Apr')}
            sizes="(min-width: 1024px) 50vw, 100vw"
            fill
            priority
            quality={100}
          />
        </div>
      </section>

      {/* App features */}
      <section className={styles.appFeatures}>
        <ul>
          {appFeatures.map((feature) => (
            <li key={feature.title}>
              <div className={styles.img}>
                <Image
                  src={commonImgUrl(feature.image)}
                  alt={feature.title}
                  width={50}
                  height={50}
                />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>{t('AXcB58Y6gyOm8vUxaDLUO')}</h2>
        <p className={styles.sectionParagraph}>{t('Qt1JOyy58bcuiaBkcHion')}</p>
      </section>

      {/* FAQs */}
      <section>
        <div className={styles.topicContainer}>
          <h2 className={styles.heading}>{t('Y3eDITMsbF2gErMTo9sDC')}</h2>
          <AccordionComponent accordionArray={faqs} />
        </div>
      </section>

    </Container>
  );
}
