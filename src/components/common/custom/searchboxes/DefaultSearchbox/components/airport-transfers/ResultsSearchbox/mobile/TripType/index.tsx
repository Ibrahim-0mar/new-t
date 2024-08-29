'use client';
import Button from '@/components/common/base/Button';
import { cn } from '@/utils/helper/tailwind_cn';
import { ChevronDown } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { OpenedMenuTypes } from '..';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

const TripTypeMobile = ({
  field,
  openedMenu,
  setOpenedMenu,
}: {
  field: ControllerRenderProps<any, 'tripType'>;
  openedMenu: string;
  setOpenedMenu: Dispatch<SetStateAction<OpenedMenuTypes>>;
}) => {
  const t = useTranslations();

  const tripTypes = {
    'one-way': t('cd_4pzYkVbyTku6JYAIqT'),
    'round-trip': t('qCJNwX_A29mSPMKA1wELp'),
  };

  const [toggleTripType, setToggleTripType] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState({
    name: tripTypes[field.value as keyof typeof tripTypes] || tripTypes['round-trip'],
    id: field.value || 'round-trip',
  });

  useEffect(() => {
    if (openedMenu !== 'trip-type') {
      setToggleTripType(false);
    }
  }, [openedMenu]);

  const openTripTypeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenedMenu('trip-type');
    setToggleTripType(!toggleTripType);
  };
  const handleTripTypeCnacel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenedMenu('trip-type');
    setSelectedOption({
      id: field.value,
      name: tripTypes[field.value as keyof typeof tripTypes],
    });
    setToggleTripType(!toggleTripType);
  };
  const handleDone = () => {
    field.onChange(selectedOption.id);
    setOpenedMenu('trip-type');
    setToggleTripType(!toggleTripType);
  };

  useEffect(() => {
    if (field.value !== selectedOption.id) {
      setSelectedOption({
        id: field.value,
        name: tripTypes[field.value as keyof typeof tripTypes],
      });
    }
  }, [field.value]);

  return (
    <>
      <div className={styles.tripTypeContainer}>
        <Button className={styles.tripTypeBtn} variant="default" onClick={openTripTypeModal}>
          {tripTypes[field.value as keyof typeof tripTypes]}
          <ChevronDown size={15} className={styles.chevronDown} />
        </Button>
      </div>
      {toggleTripType && (
        <div className={cn(styles.tripTybeMenu, toggleTripType && styles.tripTybeAnimate)}>
          {Object.keys(tripTypes).map((href) => {
            const type = tripTypes[href as keyof typeof tripTypes];
            return (
              <div key={href}>
                <label htmlFor={href} className={styles.optionLabel}>
                  {/* <div className={styles.optionContainer}> */}
                  <span>{type}</span>
                  {/* </div> */}
                  <span
                    className={cn(
                      styles.customRadioIcon,
                      selectedOption.id === href && styles.activeCustomRadioIcon,
                    )}
                  />
                </label>
                <input
                  className="sr-only"
                  type="radio"
                  id={href}
                  value={href}
                  checked={selectedOption.id === href}
                  onChange={(e) =>
                    setSelectedOption({
                      name: type,
                      id: e.target.value,
                    })
                  }
                />
              </div>
            );
          })}
          <div className={styles.actionsContainer}>
            <Button className={styles.cancelBtn} variant="default" onClick={handleTripTypeCnacel}>
              {t('CVrkwmzVSFjUNa7fDJ5qc')}
            </Button>
            <Button onClick={handleDone} type="button" className={styles.doneBtn}>
              {t('hGBYhJKUK2tCg9j_xaosr')}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default TripTypeMobile;
