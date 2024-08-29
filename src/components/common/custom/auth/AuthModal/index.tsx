'use client';
import Button from '@/components/common/base/Button';
import MoveLeft from '@/components/common/base/MoveLeft';
import { activeSocialModal } from '@/utils/types/common';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Modal from '../../../base/Modal';
import ConfirmEmail from '../ConfirmEmailModal';
import LoginModal from '../LoginModal';
import NewPassModal from '../NewPassModal';
import RecoverPass from '../RecoverPasswordModal';
import SocialLoginModal from '../SocialLoginModal';
import SignUpModal from '../signUpModal';
import style from './index.module.css';
import { eventsOnSignUpComplete, eventsOnLoginComplete } from '@/utils/events/common';

const AuthModal = () => {
  const t = useTranslations();

  const [activeModal, setActiveModal] = useState<activeSocialModal>('main');

  const { data: session, status } = useSession();
  const isNewUser = session?.user?.apiResponse?.isNewUser
  const provider = session?.user?.provider

  const handleBackToMain = () => setActiveModal('main');

  const closeModal = () => {
    setActiveModal('main');
  };

  useEffect(() => {

    if(status === "authenticated") {
      if (isNewUser) {
        eventsOnSignUpComplete(provider, session.user?.email);
      } else {
        eventsOnLoginComplete(provider, session.user?.email);
      }
    }
    
  }, [status, isNewUser, provider, session?.user?.email]);

  if (session || status === 'loading') {
    return null;
  }

  return (
    <Modal id="auth" onClose={closeModal}>
      {activeModal !== 'main' && (
        <Button
          onClick={handleBackToMain}
          aria-label={t('WXgiTMSCNrp0eOXmca32G')}
          variant="default"
          className={style.backButton}
        >
          <MoveLeft fontSize={30} />
        </Button>
      )}

      <div className={style.container}>
        {activeModal === 'main' && <SocialLoginModal setActiveModal={setActiveModal} />}

        {activeModal === 'email' && <LoginModal setActiveModal={setActiveModal} />}

        {activeModal === 'signup' && <SignUpModal setActiveModal={setActiveModal} />}

        {activeModal === 'confirm' && <ConfirmEmail setActiveModal={setActiveModal} />}

        {activeModal === 'forgot-password' && <RecoverPass setActiveModal={setActiveModal} />}

        {activeModal === 'newPass' && <NewPassModal setActiveModal={setActiveModal} />}
      </div>
    </Modal>
  );
};

export default AuthModal;
