'use client';
import Button from '@/components/common/base/Button';
import { cn } from '@/utils/helper/tailwind_cn';
import { Icon } from '@iconify/react';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './signin.module.css';
import globalDataSetter from '@/utils/helper/cookies/globalDataSetter';
import { v4 as uuid } from 'uuid';
import { UserRound } from 'lucide-react';
import { handleOpenModal } from '@/utils/modals';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/navigation';
import { deleteDataFromCookies } from '@/utils/helper/cookies/server';

type Props = {
  session: Session | null;
  btnBg?: boolean;
};

const SignModel = ({ session, btnBg = false }: Props) => {
  const t = useTranslations();

  // State to rerender component when user signs in instead of reloading the whole page
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to handle messages from the popup
    const handleSignInMessage = async (event: MessageEvent) => {
      // Popup will send a message with data payload once successfully signed in

      if (event.origin !== window.location.origin) {
        return; // Ignore messages from :any sources to prevent cross-site scripting (XSS) attacks
      }

      if (event.data === 'signed-in') {
        setSignedIn(true);
      }
    };

    window.addEventListener('message', handleSignInMessage);

    return () => {
      window.removeEventListener('message', handleSignInMessage);
    };
  }, []);

  const handleSignOut = () => {
    signOut();
    const newVisitorId = uuid();
    globalDataSetter('visitorId', newVisitorId);
    localStorage.removeItem('HUE');
    deleteDataFromCookies('HUE');
  };

  useEffect(() => {
    setOpenProfile(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {session || signedIn ? (
        <div ref={profileRef} className="relative">
          <Button
            variant="default"
            aria-label={t('bOACC9DxPs0QmNiQOOD8B')}
            onClick={() => setOpenProfile(!openProfile)}
            className={cn(styles.profile)}
          >
            <UserRound absoluteStrokeWidth />
          </Button>
          {openProfile && (
            <div className={styles.container}>
              <div className={styles.linksContainer}>
                <Link href="/profile">{t('Dn_0Jjugpufs_BbY677Li')}</Link>
              </div>

              <Button onClick={handleSignOut} className={styles.signOut}>
                {t('bOACC9DxPs0QmNiQOOD8B')}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Button
          variant="default"
          aria-label={t('tn9yGXrGEEM0wBUP5_TBe')}
          onClick={() => handleOpenModal('authmodal', searchParams, router)}
          className={cn(styles.signButton, btnBg && styles.tranparentBg)}
        >
          <Icon icon="basil:user-solid" fontSize={20} />
          <span>{t('tn9yGXrGEEM0wBUP5_TBe')}</span>
        </Button>
      )}
    </div>
  );
};
export default SignModel;
