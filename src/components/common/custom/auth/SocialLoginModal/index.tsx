'use client';
import Button from '@/components/common/base/Button';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import { cn } from '@/utils/helper/tailwind_cn';
import usePopupCenter from '@/utils/hooks/usePopupCenter';
import { activeSocialModal } from '@/utils/types/common';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import style from './index.module.css';
import socialAuth from './utils/socialButton';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { eventsOnSugnUpStart } from '@/utils/events/common';

const SocialLoginModal = ({
  setActiveModal,
}: {
  setActiveModal: React.Dispatch<React.SetStateAction<activeSocialModal>>;
}) => {
  const t = useTranslations();

  const popupCenter = usePopupCenter();
  const searchParams = useSearchParams();
  const newPass = searchParams.get('recover_password');

  const handleLogin = (method: string) => {
    if (method.toLowerCase() === 'email') {
      setActiveModal('email');
    } else {
      eventsOnSugnUpStart(method, 'normal');
      popupCenter(`/en/sign-in/${method}`, 600, 700);
    }
  };

  useEffect(() => {
    if (newPass) {
      setActiveModal('newPass');
    }
  }, [newPass]);

  return (
    <>
      <div className={style.authLogo}>
        <Image
          src={commonImgUrl('coloredLogo.png')}
          alt={t('r9gs0vLtvwCfWQehRLQgC')}
          width={140}
          height={0}
          loading="lazy"
        />
      </div>
      <div className={style.liveExperienceContainer}>
        <p className={style.liveExperience}>{t('ULZQdlX5EaddwXwdTRcA9')}</p>
        <p className={style.trackPrices}>{t('jD9Uqz6mrc14QmMLSY4yO')}</p>
      </div>
      <div className={style.socialButtonContainer}>
        {socialAuth.map((item, index) => (
          <Button
            onClick={() => handleLogin(item.signIn)}
            variant="default"
            aria-label={item.name}
            key={index}
            className={style.socialButton}
          >
            <div className={style.iconContainer}>
              <Icon
                icon={item.icon}
                fontSize={25}
                className={cn(
                  style.buttonIcon,
                  item.name === 'Email' && 'rounded-full bg-black p-1',
                )}
                color={item.color}
              />
              <span className={style.buttonText}>{item.name}</span>
            </div>
          </Button>
        ))}
      </div>

      <div>
        <p className={style.terms}>
          {t('9drjCPezKlJd-tXiKa5Z9')}
          <Link href="/terms-and-conditions" className={style.blueText}>
            {t('8YIll-WaS0JjUHUpDzJ_f')}
          </Link>
          {t('xC4vrLOKTtSWSaeMl_Zrq')}
          <Link href="/privacy-policy" className={style.policy}>
            {t('csGbE1Krp-hm45eZWTm7s')}
          </Link>
          .
        </p>
      </div>
    </>
  );
};

export default SocialLoginModal;
