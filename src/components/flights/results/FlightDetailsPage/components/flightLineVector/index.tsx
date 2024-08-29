import { cn } from '@/utils/helper/tailwind_cn';
import styles from './index.module.css';

interface WithOutCircles {
  isSolidLine?: boolean;
  isFirstSolid?: boolean;
  isLastSolid?: boolean;
  noCircles: boolean;
}
interface WithCircles {
  isSolidLine: boolean;
  isFirstSolid: boolean;
  isLastSolid: boolean;
  noCircles?: boolean;
}
interface DeclaredCircles {
  isSolidLine?: boolean;
  isFirstSolid: boolean;
  isLastSolid: boolean;
  noCircles?: boolean;
}

const FlightLineVector = ({
  isFirstSolid,
  isLastSolid,
  isSolidLine = true,
  noCircles,
}: WithCircles | WithOutCircles | DeclaredCircles) => {
  const solidCircle = <span className={styles.solidCircle}></span>;

  const outlinedCitcle = <span className={styles.outlinedCitcle}></span>;

  return (
    <div className={styles.container}>
      {!noCircles &&
        (isFirstSolid && isSolidLine ? solidCircle : outlinedCitcle)}
      <span
        className={cn(
          styles.solidLine,
          (!isSolidLine || noCircles || (!isFirstSolid && !isLastSolid)) &&
            styles.dashedLine,
        )}
      ></span>
      {!noCircles &&
        (isLastSolid && isSolidLine ? solidCircle : outlinedCitcle)}
    </div>
  );
};

export default FlightLineVector;
