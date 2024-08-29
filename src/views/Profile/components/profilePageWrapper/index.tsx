'use client';
import LoadingSpinner from '@/components/common/base/LoadingSpinner';
import { cn } from '@/utils/helper/tailwind_cn';
import AuthDisclaimer from '@/views/Profile/components/authDisclaimer';
import { useSession } from 'next-auth/react';
import React from 'react';
import styles from './index.module.css';

const ProfilePageWrapper = ({
  children,
  BackToHomeComponent,
}: {
  children: React.ReactNode;
  BackToHomeComponent: React.ReactNode;
}) => {
  const { data: session, status } = useSession();

  if (status === 'loading')
    return (
      <div className={cn(styles.mainContainer, 'border-none py-20')}>
        <LoadingSpinner />
      </div>
    );

  return (
    <>
      {!session && status === 'unauthenticated' ? (
        <AuthDisclaimer />
      ) : (
        <>
          <div className={styles.mainContainer}>
            {/* <BackToHomePage className="w-[80%]" currentRoute={t('VDXKyoaKmqvZR9gMW9Stm')} /> */}
            {BackToHomeComponent}
            {/* <UserDetails /> */}
          </div>
          {children}
        </>
      )}
    </>
  );
};

export default ProfilePageWrapper;
