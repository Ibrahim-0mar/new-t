import styles from './index.module.css';
import Popup from 'reactjs-popup';
import { Icon } from '@iconify/react';
import 'reactjs-popup/dist/index.css';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

type passngerInputType = {
  header: string;
  subHeader: string;
  value: number;
  iconName: string;
  min: number;
  max: number;
  increaseFunction: () => void;
  decreaseFunction: () => void;
};

const PassengersInput = (field: any) => {
  const t = useTranslations();

  const renderContent = (open: boolean) => (
    <button type="button" className={styles.trigger}>
      {field.value[0] + field.value[1] + field.value[2]}
      {field.value[1] + field.value[2] === 0
        ? t('_X-1SwqaZn35z4mdjg4-D')
        : t('miF5aclFVGBaTeoBgF3z8')}
      {open ? <ChevronUp color="black" size={16} /> : <ChevronDown size={16} />}
    </button>
  );

  const PassengerInput = (props: passngerInputType) => {
    const { header, subHeader, value, iconName, min, max, increaseFunction, decreaseFunction } =
      props;
    const isDecreaseDisabled = value <= min;
    const isIncreaseDiabled = value >= max;
    return (
      <div className={styles.rowContainer}>
        <Icon icon={iconName} className={styles.passengerIcon} />
        <div className={styles.headerContainer}>
          <p className={styles.header}>{header}</p>
          <span className={styles.subHeader}>{subHeader}</span>
        </div>
        <div className={styles.counterContainer}>
          <button
            type="button"
            className={isDecreaseDisabled ? styles.disabledButton : styles.button}
            onClick={(e) => {
              e.preventDefault();
              decreaseFunction();
            }}
            disabled={isDecreaseDisabled}
          >
            -
          </button>
          <h4>{value}</h4>
          <button
            type="button"
            className={isIncreaseDiabled ? styles.disabledButton : styles.button}
            onClick={(e) => {
              e.preventDefault();
              increaseFunction();
            }}
            disabled={isIncreaseDiabled}
          >
            +
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="">
      <Popup
        trigger={(open) => renderContent(open)}
        position="bottom left"
        contentStyle={{
          borderRadius: 15,

          maxWidth: '200px',
        }}
      >
        <div className={styles.container}>
          <PassengerInput
            header={t('_X-1SwqaZn35z4mdjg4-D')}
            subHeader={t('sFqRglhJdC2dy3XFvucPy')}
            value={field.value[0]}
            iconName="fa6-solid:person"
            min={1}
            max={99}
            increaseFunction={() =>
              field.onChange([field.value[0] + 1, field.value[1], field.value[2]])
            }
            decreaseFunction={() => {
              field.onChange([field.value[0] - 1, field.value[1], field.value[2]]);
            }}
          />
          <PassengerInput
            header={t('pHLJYIQulM2qMnw8vCjco')}
            subHeader={t('t8jBxVbtxE1tgUj2pR192')}
            value={field.value[1]}
            iconName="fa6-solid:child"
            min={0}
            max={99}
            increaseFunction={() =>
              field.onChange([field.value[0], field.value[1] + 1, field.value[2]])
            }
            decreaseFunction={() =>
              field.onChange([field.value[0], field.value[1] - 1, field.value[2]])
            }
          />
          <PassengerInput
            header={t('LbVblkn06w1xvwf0GLdup')}
            subHeader={t('ukeijwGhJPBKkmsi0-aZj')}
            value={field.value[2]}
            iconName="fa-solid:baby"
            min={0}
            max={99}
            increaseFunction={() =>
              field.onChange([field.value[0], field.value[1], field.value[2] + 1])
            }
            decreaseFunction={() =>
              field.onChange([field.value[0], field.value[1], field.value[2] - 1])
            }
          />
        </div>
      </Popup>
    </div>
  );
};

export default PassengersInput;
