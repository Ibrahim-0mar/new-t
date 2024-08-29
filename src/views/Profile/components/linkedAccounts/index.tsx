'use client';
import { cn } from '@/utils/helper/tailwind_cn';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSession } from 'next-auth/react';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

type LinkedAccounts = { type: string }[];

const LinkedAccountsSection = () => {
  const t = useTranslations();

  const session = useSession();

  const linkedAccounts = session.data?.user?.apiResponse?.linkedAccounts as LinkedAccounts;
  const isGoogleLinked = !!linkedAccounts?.find(
    (account: { type: string }) => account.type === 'GOOGLE',
  );
  const isFacebookLinked = !!linkedAccounts?.find(
    (account: { type: string }) => account.type === 'FACEBOOK',
  );

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{t('dI38koUFxuCWt3MmuBQ2R')}</h3>
      <p className={styles.paragraph}>{t('kKofe9hrElkjcuQpHjWrD')}</p>
      <div className={styles.socialAccounts}>
        <div>
          <Icon icon={'flat-color-icons:google'} />
          <span className={cn('text-xs', isGoogleLinked && 'text-eleventh')}>
            {isGoogleLinked
              ? t('fWr-uBvyM6EDifS_Zm-0L')
              : t('b5_zVLdyCHJS_F2-o6UQD', { platform: 'Google' })}
          </span>
        </div>
        <div>
          <Icon icon={'devicon:facebook'} color="blue" />
          <span className={cn('text-xs', isFacebookLinked && 'text-eleventh')}>
            {isFacebookLinked
              ? t('fWr-uBvyM6EDifS_Zm-0L')
              : t('b5_zVLdyCHJS_F2-o6UQD', { platform: 'Facebook' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LinkedAccountsSection;
