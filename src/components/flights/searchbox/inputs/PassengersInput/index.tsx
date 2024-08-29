'use client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PassengerInput from './PassengerInputComponent';
import styles from './passengersInput.module.css';
import { useTranslations } from 'next-intl';

const PassengersInputs = (field: any) => {
  const t = useTranslations();

  const renderContent = (open: boolean) => (
    <button type="button" className={styles.trigger}>
      {field.value[0] + field.value[1] + field.value[2]}{' '}
      {field.value[1] + field.value[2] === 0
        ? t('_X-1SwqaZn35z4mdjg4-D')
        : t('miF5aclFVGBaTeoBgF3z8')}
      {open ? <ChevronUp color="black" size={16} /> : <ChevronDown size={16} />}
    </button>
  );

  return (
    <div>
      <Popup
        trigger={(open) => renderContent(open)}
        position="bottom left"
        contentStyle={{
          borderRadius: 15,
          maxWidth: '250px',
        }}
      >
        <div className={styles.container}>
          <PassengerInput
            header={t('_X-1SwqaZn35z4mdjg4-D')}
            subHeader={t('sFqRglhJdC2dy3XFvucPy')}
            value={field.value[0]}
            iconName="fa6-solid:person"
            min={1}
            max={9 - field.value[1]}
            increaseFunction={() =>
              field.onChange([field.value[0] + 1, field.value[1], field.value[2]])
            }
            decreaseFunction={() => {
              field.onChange([field.value[0] - 1, field.value[1], field.value[2]]);
              if (field.value[2] >= field.value[0]) {
                field.onChange([field.value[0], field.value[1], field.value[0] - 1]);
              }
            }}
          />
          <PassengerInput
            header={t('pHLJYIQulM2qMnw8vCjco')}
            subHeader={t('t8jBxVbtxE1tgUj2pR192')}
            value={field.value[1]}
            iconName="fa6-solid:child"
            min={0}
            max={9 - field.value[0]}
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
            max={field.value[0]}
            increaseFunction={() =>
              field.onChange([field.value[0], field.value[1], field.value[2] + 1])
            }
            decreaseFunction={() =>
              field.onChange([field.value[0], field.value[1], field.value[2] - 1])
            }
          />

          {field.value[0] + field.value[1] >= 9 ? (
            <p className={styles.errorMessage}>{t('QzO6uQoIi81SLwT6V_1Yl')}</p>
          ) : null}
          {field.value[0] <= field.value[2] ? (
            <p className={styles.errorMessage}>{t('abtloE3VARyyZ5FxMHspq')}</p>
          ) : null}
        </div>
      </Popup>
    </div>
  );
};

export default PassengersInputs;
