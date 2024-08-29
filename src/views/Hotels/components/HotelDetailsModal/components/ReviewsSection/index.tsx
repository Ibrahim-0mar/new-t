import styles from './index.module.css';

const ReviewsSection = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Reviews</h2>
      <div className={styles.subContainer}>
        <div className={styles.scoreContainer}>
          <span className={styles.score}>8.6</span>
          <div className={styles.rank}>
            <span>Very Good</span>
            <p>Based on {'2,484'} verified guest reviews</p>
          </div>
        </div>
        <div className={styles.scoreDetailsContainer}>
          <div>
            <div>
              <span className={styles.subScore}>8.1</span>
              <span className={styles.scoreName}>Cleanliness</span>
            </div>
            <div>
              <span className={styles.subScore}>8.1</span>
              <span className={styles.scoreName}>Service</span>
            </div>
          </div>
          <div>
            <div>
              <span className={styles.subScore}>8.1</span>
              <span className={styles.scoreName}>Location</span>
            </div>
            <div>
              <span className={styles.subScore}>8.1</span>
              <span className={styles.scoreName}>Sleep quality</span>
            </div>
          </div>
          <div>
            <div>
              <span className={styles.subScore}>8.1</span>
              <span className={styles.scoreName}>Rooms</span>
            </div>
            <div>
              <span className={styles.subScore}>8.1</span>
              <span className={styles.scoreName}>Value</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.providersContainers}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </div>
  );
};

export default ReviewsSection;
