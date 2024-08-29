import { cn } from '@/utils/helper/tailwind_cn';
import styles from './index.module.css';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const AuthDisclaimer = () => {
  const t = useTranslations();

  return (
    <div className={cn(styles.mainContainer, 'border-none')}>
      <div className={styles.disclaimer}>
        {t('_HzTa2ICZF-VXQpOqmxhj')}
        <Link href={'?authmodal=open'} prefetch={false}>
          {t('I4SQOxxbXFdB0knuhbt_Q')}
        </Link>
      </div>
    </div>
  );
};

export default AuthDisclaimer;
