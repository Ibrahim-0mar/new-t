'use client';
import Button from '@/components/common/base/Button';
import PassengerInput from '@/components/flights/searchbox/inputs/PassengersInput/PassengerInputComponent';
import { cn } from '@/utils/helper/tailwind_cn';
import { UserRound } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import 'reactjs-popup/dist/index.css';
import styles from './index.module.css';
import { ControllerRenderProps } from 'react-hook-form';
import { useTranslations } from 'next-intl';

const RoomsGuestsMobile = ({
  field,
  openRoomsGuests,
  setOpenRoomsGuests,
  desktop,
}: {
  field: ControllerRenderProps<any, 'rooms_guests'>;
  openRoomsGuests: boolean;
  setOpenRoomsGuests: Dispatch<SetStateAction<boolean>>;
  desktop?: boolean;
}) => {
  const t = useTranslations();

  const { value, onChange } = field;
  const [passengersCount, setPassengersCount] = useState(value);

  const handleMenu = () => {
    setOpenRoomsGuests(!openRoomsGuests);
    setPassengersCount(value);
  };
  const handleDoneBtn = () => {
    onChange(passengersCount);
    setOpenRoomsGuests(!openRoomsGuests);
  };

  return (
    <div>
      {!desktop && (
        <div onClick={handleMenu} className="cursor-pointer select-none px-5">
          <div className={styles.rooms}>
            <UserRound size={30} className="text-fifth" />
            <p className="text-primary/50">
              {field.value[0]}
              {field.value[0] > 1 ? ' Rooms' : 'Room'}
              <span className="px-1">,</span>
              {field.value[1]} {field.value[1] > 1 ? 'Adults' : 'Adult'}
            </p>
          </div>
        </div>
      )}
      {/* Drawer */}

      {desktop ? (
        <div className={cn(styles.passengersMenuDesktop, openRoomsGuests ? '' : 'hidden')}>
          <PassengerInput
            header={'Rooms'}
            subHeader={'Number of rooms'}
            value={passengersCount[0]}
            iconName="mdi:bedroom-outline"
            min={1}
            max={16}
            increaseFunction={() =>
              setPassengersCount([passengersCount[0] + 1, passengersCount[1], passengersCount[2]])
            }
            decreaseFunction={() => {
              setPassengersCount([passengersCount[0] - 1, passengersCount[1], passengersCount[2]]);
            }}
          />
          <PassengerInput
            header={t('_X-1SwqaZn35z4mdjg4-D')}
            subHeader={t('sFqRglhJdC2dy3XFvucPy')}
            value={passengersCount[1]}
            iconName="fa6-solid:person"
            min={1}
            max={16}
            increaseFunction={() =>
              setPassengersCount([passengersCount[0], passengersCount[1] + 1, passengersCount[2]])
            }
            decreaseFunction={() =>
              setPassengersCount([passengersCount[0], passengersCount[1] - 1, passengersCount[2]])
            }
          />
          <PassengerInput
            header={t('pHLJYIQulM2qMnw8vCjco')}
            subHeader={t('t8jBxVbtxE1tgUj2pR192')}
            value={passengersCount[2]}
            iconName="fa6-solid:child"
            min={0}
            max={8}
            increaseFunction={() =>
              setPassengersCount([passengersCount[0], passengersCount[1], passengersCount[2] + 1])
            }
            decreaseFunction={() =>
              setPassengersCount([passengersCount[0], passengersCount[1], passengersCount[2] - 1])
            }
          />
          <div className={styles.actionsContainer}>
            <Button
              className={styles.cancelBtn}
              variant="default"
              type="button"
              onClick={handleMenu}
            >
              {t('CVrkwmzVSFjUNa7fDJ5qc')}
            </Button>
            <Button
              variant="default"
              type="button"
              onClick={handleDoneBtn}
              className={styles.doneBtn}
            >
              {t('hGBYhJKUK2tCg9j_xaosr')}
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            styles.passengersMenu,
            openRoomsGuests ? 'opacity-100' : 'translate-y-full opacity-0',
          )}
        >
          <PassengerInput
            header={'Rooms'}
            subHeader={'Number of rooms'}
            value={passengersCount[0]}
            iconName="mdi:bedroom-outline"
            min={1}
            max={16}
            increaseFunction={() =>
              setPassengersCount([passengersCount[0] + 1, passengersCount[1], passengersCount[2]])
            }
            decreaseFunction={() => {
              setPassengersCount([passengersCount[0] - 1, passengersCount[1], passengersCount[2]]);
            }}
          />
          <PassengerInput
            header={t('_X-1SwqaZn35z4mdjg4-D')}
            subHeader={t('sFqRglhJdC2dy3XFvucPy')}
            value={passengersCount[1]}
            iconName="fa6-solid:person"
            min={1}
            max={16}
            increaseFunction={() =>
              setPassengersCount([passengersCount[0], passengersCount[1] + 1, passengersCount[2]])
            }
            decreaseFunction={() =>
              setPassengersCount([passengersCount[0], passengersCount[1] - 1, passengersCount[2]])
            }
          />
          <PassengerInput
            header={t('pHLJYIQulM2qMnw8vCjco')}
            subHeader={t('t8jBxVbtxE1tgUj2pR192')}
            value={passengersCount[2]}
            iconName="fa6-solid:child"
            min={0}
            max={8}
            increaseFunction={() =>
              setPassengersCount([passengersCount[0], passengersCount[1], passengersCount[2] + 1])
            }
            decreaseFunction={() =>
              setPassengersCount([passengersCount[0], passengersCount[1], passengersCount[2] - 1])
            }
          />
          <div className={styles.actionsContainer}>
            <Button
              className={styles.cancelBtn}
              variant="default"
              type="button"
              onClick={handleMenu}
            >
              {t('CVrkwmzVSFjUNa7fDJ5qc')}
            </Button>
            <Button
              variant="default"
              type="button"
              onClick={handleDoneBtn}
              className={styles.doneBtn}
            >
              {t('hGBYhJKUK2tCg9j_xaosr')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsGuestsMobile;
