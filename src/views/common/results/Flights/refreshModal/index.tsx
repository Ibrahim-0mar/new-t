'use client';
import Modal from '@/components/common/base/Modal';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import { handleOpenModal } from '@/utils/modals';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import styles from './index.module.css';
import Button from '@/components/common/base/Button';
import { useTranslations } from 'use-intl';

const inactivityThreshold = 3 * 600000; // 30 minutes

const RefreshModal = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations();

  const handleInactivity = () => {
    handleOpenModal('refreshmodal', searchParams, router);
  };

  let timer: NodeJS.Timeout;

  const resetTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(handleInactivity, inactivityThreshold);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'click'];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    timer = setTimeout(handleInactivity, inactivityThreshold);

    // Cleanup event listeners and timer on component unmount
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearTimeout(timer);
    };
  }, []);

  const handleRefresh = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('refreshmodal');

    const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;

    window.history.replaceState(null, '', newUrl);
    window.location.reload();
  };

  return (
    <Modal
      id="refresh"
      grandClassName={styles.grandClassName}
      nestedClassName={styles.nestedClassName}
      onClose={handleRefresh}
      disableIcon
    >
      <div className={styles.container}>
        <Image src={commonImgUrl('refresh-modal.png')} width={120} height={0} alt="Refresh Modal" />
        {t('Jj9ipfd9cuWWQbW7dnccz')}
        <Button variant="secondary" className={styles.btn} onClick={handleRefresh}>
          {t('LkxX76pvLMYqQmO3AilZE')}
        </Button>
      </div>
    </Modal>
  );
};

export default RefreshModal;
