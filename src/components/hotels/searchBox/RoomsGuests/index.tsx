'use client';
import PassengerInput from '@/components/flights/searchbox/inputs/PassengersInput/PassengerInputComponent';
import { UserRound } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ControllerRenderProps } from 'react-hook-form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styles from './index.module.css';

const RoomsGuestsInput = (field: ControllerRenderProps<any, 'rooms_guests'>) => {
  const t = useTranslations();
  const { value } = field;

  const renderContent = () => (
    <button type="button" className={styles.triggerContainer}>
      <div className={styles.trigger}>
        <p>
          {t('3oQqUtub_L8KCiA-jajnb', {
            room: value[0],
            adults: value[1],
          })}
        </p>
      </div>
      <UserRound color="#d6de29" className="self-end" />
    </button>
  );

  return (
    <div>
      <Popup
        trigger={() => renderContent()}
        position="bottom left"
        contentStyle={{
          borderRadius: 15,
          width: 'inherit',
          maxWidth: '300px',
        }}
      >
        <div className={styles.container}>
          <PassengerInput
            header={'Rooms'}
            subHeader={'Number of rooms'}
            value={field.value[0]}
            iconName="mdi:bedroom-outline"
            min={1}
            max={8}
            increaseFunction={() =>
              field.onChange([field.value[0] + 1, field.value[1], field.value[2]])
            }
            decreaseFunction={() => {
              field.onChange([field.value[0] - 1, field.value[1], field.value[2]]);
            }}
          />
          <PassengerInput
            header={t('_X-1SwqaZn35z4mdjg4-D')}
            subHeader={t('sFqRglhJdC2dy3XFvucPy')}
            value={field.value[1]}
            iconName="fa6-solid:person"
            min={1}
            max={32}
            increaseFunction={() =>
              field.onChange([field.value[0], field.value[1] + 1, field.value[2]])
            }
            decreaseFunction={() => {
              field.onChange([field.value[0], field.value[1] - 1, field.value[2]]);
            }}
          />
          <PassengerInput
            header={t('pHLJYIQulM2qMnw8vCjco')}
            subHeader={t('t8jBxVbtxE1tgUj2pR192')}
            value={field.value[2]}
            iconName="fa6-solid:child"
            min={0}
            max={64 - field.value[2]}
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

export default RoomsGuestsInput;
