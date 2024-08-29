import { authOptions } from '@/app/api/auth/authOptions';
import ProfileBackHome from '@/components/common/custom/ProfileBackHome';
import { locale } from '@/navigation';
import AuthDisclaimer from '@/views/Profile/components/authDisclaimer';
import UserDetails from '@/views/Profile/components/userDetails';
import { getServerSession } from 'next-auth';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

const ProfileLayout = async ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: locale };
}) => {
  unstable_setRequestLocale(locale);

  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <Suspense fallback={<div />}>
        <AuthDisclaimer />;
      </Suspense>
    );
  }

  return (
    <section className="bg-white">
      <ProfileBackHome />
      <UserDetails />
      {children}
    </section>
  );
};

export default ProfileLayout;
