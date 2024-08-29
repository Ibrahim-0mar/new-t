'use client';
import Button from '@/components/common/base/Button';
import Container from '@/components/common/base/Container';
import { locale, useRouter } from '@/navigation';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './index.module.css';

const GeneralError = ({
  reset,
}: {
  reset: () => void;
}) => {
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale() as locale;

  return (
    <Container dir={locale === 'ar' ? 'rtl' : 'ltr'} className={styles.mainContainer}>
      <Image
        src={commonImgUrl('error.svg')}
        alt={t('7lKnMzNTziv0uXChGknkl')}
        width={300}
        height={300}
      />
      <h1 className={styles.errorMessage}>{t('uYEEfa3WHmN-t3CPkBjrQ')}</h1>

      <div className={styles.buttonsContainer}>
        <Button className={styles.tryAgainButton} onClick={reset} variant="default">
          {t('3cN0DMJ8PBe8urAPw7Oea')}
        </Button>
        <Button
          className={styles.button}
          onClick={() => {
            router.replace('/');
          }}
          variant="primary"
        >
          {t('XLDhswmJFBoK428JmsiAz')}
        </Button>
      </div>
    </Container>
  );
};
export default GeneralError;
