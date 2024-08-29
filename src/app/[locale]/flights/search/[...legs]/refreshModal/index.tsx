'use client';
import Button from '@/components/common/base/Button';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'use-intl';
import styles from './index.module.css';

const inactivityThreshold = 3 * 600000; // 30 minutes

const RefreshModal = () => {
  const t = useTranslations();
  const timerRef = useRef<NodeJS.Timeout>();
  const [isRefreshModalOpen, setIsRefreshModalOpen] = useState<boolean>(false);

  const handleInactivity = () => {
    setIsRefreshModalOpen(true);
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(handleInactivity, inactivityThreshold);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'click'];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    timerRef.current = setTimeout(handleInactivity, inactivityThreshold);

    // Cleanup event listeners and timer on component unmount
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!isRefreshModalOpen) return;
  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        {/* Overlay */}
        <span className={styles.overlay}></span>
        <div className={styles.content}>
          <div className={styles.modalContainer}>
            <Image
              src={commonImgUrl('refresh-modal.png')}
              width={120}
              height={0}
              alt="Refresh Modal"
              priority={true}
            />
            {t('Jj9ipfd9cuWWQbW7dnccz')}
            <Button
              variant="secondary"
              className={styles.btn}
              onClick={() => window.location.reload()}
            >
              {t('LkxX76pvLMYqQmO3AilZE')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefreshModal;
