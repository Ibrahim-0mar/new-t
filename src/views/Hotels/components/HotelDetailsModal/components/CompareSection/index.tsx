import FilterBy from './components/FilterBy';
import CompareCard from './components/compareCard';
import OptionsCard from './components/optionsCard';
import styles from './index.module.css';

const CompareRoomsSection = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Compare rooms and prices</h2>
      <p className={styles.paragraph}>
        We compare 100s of sites to get you the best deal
      </p>
      <div className={styles.subContainer}>
        {/* SearchBox here */}
        <FilterBy />
        <div className={styles.cardsContainer}>
          <CompareCard />
          <CompareCard />
          <CompareCard />
        </div>
        <div id="last section">
          <OptionsCard />
          <OptionsCard />
          <OptionsCard />
        </div>
      </div>
    </div>
  );
};

export default CompareRoomsSection;
