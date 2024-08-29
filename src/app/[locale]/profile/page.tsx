import { authOptions } from '@/app/api/auth/authOptions';
import Container from '@/components/common/base/Container';
import { locale } from '@/navigation';
import { languagesMap } from '@/services/data/languages';
import PersonalDetails from '@/views/Profile/components/personalDetails';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import styles from './index.module.css';

type Props = {
  params: { locale: locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('VDXKyoaKmqvZR9gMW9Stm'),
    description: t('Dn_0Jjugpufs_BbY677Li'),
    alternates: {
      canonical: `/${params.locale}/about-us`,
      languages: languagesMap.reduce((acc: any, language: any) => {
        acc[language.code] = `/${language.code}/about-us`;
        return acc;
      }, {}),
    },
    openGraph: {
      title: `${t('VDXKyoaKmqvZR9gMW9Stm')} - ${t('jvSCLI0fSnM0IGMagNIbr')}`,
      description: t('Dn_0Jjugpufs_BbY677Li'),
      url: `https://travolic.com/${params.locale}/about-us`,
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
      title: `${t('VDXKyoaKmqvZR9gMW9Stm')} - ${t('jvSCLI0fSnM0IGMagNIbr')}`,
      description: t('Dn_0Jjugpufs_BbY677Li'),
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

const ProfilePage = async ({ params: { locale } }: { params: { locale: locale } }) => {
  unstable_setRequestLocale(locale);

  const t = await getTranslations();

  const session = await getServerSession(authOptions);
  return (
    <div className={styles.container}>
      <Container className="pb-20 pt-8">
        <h2>{t('khjz5DcJ7vq-TjyFlFO75')}</h2>
        <Suspense fallback={<div />}>
          <PersonalDetails session={session} />
        </Suspense>
      </Container>
    </div>
  );
};

export default ProfilePage;
