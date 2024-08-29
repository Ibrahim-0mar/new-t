import ChevronRight from '../../base/ChevronRight';
import Container from '../../base/Container';
import CurrentRoute from './components/CurrentRoute';
import styles from './index.module.css';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const ProfileBackHome = () => {
  const t = useTranslations();

  return (
    <Container>
      <div className={styles.linksContainer}>
        <Link href={'/'} className={styles.homeLink}>
          {t('vBRtvmnOByBIsEiad_BA9')}
        </Link>
        <ChevronRight className={styles.chevronRight} />
        <CurrentRoute />
      </div>
    </Container>
  );
};

export default ProfileBackHome;
