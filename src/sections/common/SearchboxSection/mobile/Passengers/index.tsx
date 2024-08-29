'use client';
import Button from '@/components/common/base/Button';
import PassengerInput from '@/components/flights/searchbox/inputs/PassengersInput/PassengerInputComponent';
import { cn } from '@/utils/helper/tailwind_cn';
import { ChevronDown } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import 'reactjs-popup/dist/index.css';
import { OpenedMenuTypes } from '..';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

const PssengersMobile = ({
  field,
  openedMenu,
  setOpenedMenu,
}: {
  field: any;
  openedMenu: string;
  setOpenedMenu: Dispatch<SetStateAction<OpenedMenuTypes>>;
}) => {
  const t = useTranslations();

  const { value, onChange } = field;
  const [togglePassengers, setTogglePssengers] = useState<boolean>(false);
  const [passengersCount, setPassengersCount] = useState(value);

  useEffect(() => {
    if (openedMenu !== 'passengers') {
      setTogglePssengers(false);
    }
  }, [openedMenu]);

  const handleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenedMenu('passengers');
    setPassengersCount(value);
    setTogglePssengers(!togglePassengers);
  };
  const handleDoneBtn = (e: React.MouseEvent) => {
    e.preventDefault();
    onChange(passengersCount);
    setTogglePssengers(!togglePassengers);
  };

  return (
    <>
      <div className={styles.passengersContainer}>
        <Button className={styles.passengersBtn} variant="default" onClick={handleMenu}>
          {field.value[0] + field.value[1] + field.value[2]}
          {field.value[1] + field.value[2] === 0
            ? t('_X-1SwqaZn35z4mdjg4-D')
            : t('miF5aclFVGBaTeoBgF3z8')}
          <ChevronDown size={15} className={styles.chevronDown} />
        </Button>
      </div>
      {togglePassengers && (
        <div className={cn(styles.passengersMenu, togglePassengers && styles.passengersAnimate)}>
          {passengersCount[0] + passengersCount[1] >= 9 ? (
            <p className={styles.errorMessage}>{t('QzO6uQoIi81SLwT6V_1Yl')}</p>
          ) : null}
          {passengersCount[0] <= passengersCount[2] ? (
            <p className={styles.errorMessage}>{t('abtloE3VARyyZ5FxMHspq')}</p>
          ) : null}
          <PassengerInput
            header={t('_X-1SwqaZn35z4mdjg4-D')}
            subHeader={t('sFqRglhJdC2dy3XFvucPy')}
            value={passengersCount[0]}
            iconName="fa6-solid:person"
            min={1}
            max={9 - passengersCount[1]}
            increaseFunction={() =>
              setPassengersCount([passengersCount[0] + 1, passengersCount[1], passengersCount[2]])
            }
            decreaseFunction={() => {
              setPassengersCount([passengersCount[0] - 1, passengersCount[1], passengersCount[2]]);
              if (passengersCount[2] >= passengersCount[0]) {
                setPassengersCount([
                  passengersCount[0],
                  passengersCount[1],
                  passengersCount[0] - 1,
                ]);
              }
            }}
          />
          <PassengerInput
            header={t('pHLJYIQulM2qMnw8vCjco')}
            subHeader={t('t8jBxVbtxE1tgUj2pR192')}
            value={passengersCount[1]}
            iconName="fa6-solid:child"
            min={0}
            max={9 - passengersCount[0]}
            increaseFunction={() =>
              setPassengersCount([passengersCount[0], passengersCount[1] + 1, passengersCount[2]])
            }
            decreaseFunction={() =>
              setPassengersCount([passengersCount[0], passengersCount[1] - 1, passengersCount[2]])
            }
          />
          <PassengerInput
            header={t('LbVblkn06w1xvwf0GLdup')}
            subHeader={t('ukeijwGhJPBKkmsi0-aZj')}
            value={passengersCount[2]}
            iconName="fa-solid:baby"
            min={0}
            max={passengersCount[0]}
            increaseFunction={() =>
              setPassengersCount([passengersCount[0], passengersCount[1], passengersCount[2] + 1])
            }
            decreaseFunction={() =>
              setPassengersCount([passengersCount[0], passengersCount[1], passengersCount[2] - 1])
            }
          />
          <div className={styles.actionsContainer}>
            <Button className={styles.cancelBtn} variant="default" onClick={handleMenu}>
              {t('CVrkwmzVSFjUNa7fDJ5qc')}
            </Button>
            <Button variant="default" onClick={handleDoneBtn} className={styles.doneBtn}>
              {t('hGBYhJKUK2tCg9j_xaosr')}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default PssengersMobile;
