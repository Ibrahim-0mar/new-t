import Container from '@/components/common/base/Container';
import CardsContainer from './components/CardsContainer';
import styles from './index.module.css';

const BestDealsSection = () => {
  // const t = useTranslations();

  // let heading;
  // let subHeading;

  // if (variant === 'flights') {
  //   heading = t('rTqu1nr5XBARkOOuEevSa');
  //   subHeading = t('Su_cGXUomItNtE3bMyf7O');
  // } else {
  //   heading = t('Iuqc-gwMMWsGMxuTXXNn6');
  //   subHeading = t('IUcCcoJzn_86yq1gpqsRK');
  // }

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.content}>
          <CardsContainer />
        </div>
      </div>
    </Container>
  );
};

export default BestDealsSection;
