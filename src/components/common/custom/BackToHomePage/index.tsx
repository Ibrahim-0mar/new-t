import { Link } from '@/navigation';
import ChevronRight from '../../base/ChevronRight';
import Container from '../../base/Container';
import styles from './index.module.css';
import { getTranslations } from 'next-intl/server';

const BackToHomePage = async ({
  currentRoute,
  className,
}: {
  currentRoute: string;
  className?: string;
}) => {
  const t = await getTranslations();

  return (
    <Container className={className}>
      <div className={styles.linksContainer}>
        <Link href={'/'} className={styles.homeLink}>
          {t('1OWcxkmLYfOuFTWpgqPsW')}
        </Link>
        <ChevronRight className={styles.chevronRight} />
        <span>{currentRoute}</span>
      </div>
    </Container>
  );
};

export default BackToHomePage;
