import FilterWrapper from "@/components/airport-transfers/results/filters/components/FilterWrapper"
import Input from "@/components/common/base/Input"
import styles from './index.module.css'

const RecommendedFilters = () => {
  return (
    <FilterWrapper className={styles.wrapper} title="Recommended filters">
      <div className={styles.container}>
        <Input id="free-breakfast" type="checkbox" className={styles.input} />
        <label htmlFor="free-breakfast" className={styles.label}>
          Free breakfast
        </label>
      </div>
    </FilterWrapper>
  )
}

export default RecommendedFilters