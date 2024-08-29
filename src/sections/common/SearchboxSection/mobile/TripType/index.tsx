'use client';
import Button from '@/components/common/base/Button';
import { tripTypes } from '@/components/common/custom/searchboxes/DefaultSearchbox/components/flights/FlightsSearch';
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
  onChange
}: {
  field: ControllerRenderProps<any, 'tripType'>;
  openedMenu: string;
  setOpenedMenu: Dispatch<SetStateAction<OpenedMenuTypes>>;
  onChange?: (activeType: string) => void
}) => {
  const t = useTranslations();

  const typesNames = {
    'one-way': t('cd_4pzYkVbyTku6JYAIqT'),
    'round-trip': t('qCJNwX_A29mSPMKA1wELp'),
    'multi-city': t('oOz1ckD4fnuAlzWv35wph'),
  };
  const [toggleTripType, setToggleTripType] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState({
    name: typesNames[field.value as keyof typeof typesNames] || typesNames['round-trip'],
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
      name: typesNames[field.value as keyof typeof typesNames],
    });
    setToggleTripType(!toggleTripType);
  };
  const handleDone = () => {
    field.onChange(selectedOption.id);
    setOpenedMenu('trip-type');
    setToggleTripType(!toggleTripType);
    onChange && onChange(selectedOption.id);
  };

  useEffect(() => {
    if (field.value !== selectedOption.id) {
      setSelectedOption({
        id: field.value,
        name: typesNames[field.value as keyof typeof typesNames],
      });
    }
  }, [field.value]);

  return (
    <>
      <div className={styles.tripTypeContainer}>
        <Button className={styles.tripTypeBtn} variant="default" onClick={openTripTypeModal}>
          {typesNames[field.value as keyof typeof typesNames]}
          <ChevronDown size={15} className={styles.chevronDown} />
        </Button>
      </div>
      {toggleTripType && (
        <div className={cn(styles.tripTybeMenu, toggleTripType && styles.tripTybeAnimate)}>
          {tripTypes.map((type) => {
            return (
              <div key={type.href}>
                <label htmlFor={type.href} className={styles.optionLabel}>
                  <div className={styles.optionContainer}>
                    <span className={styles.optionIcon}>{type.icon}</span>
                    <span>{typesNames[type.href as keyof typeof typesNames]}</span>
                  </div>
                  <span
                    className={cn(
                      styles.customRadioIcon,
                      selectedOption.id === type.href && styles.activeCustomRadioIcon,
                    )}
                  />
                </label>
                <input
                  className="sr-only"
                  type="radio"
                  id={type.href}
                  value={type.href}
                  checked={selectedOption.id === type.href}
                  onChange={(e) =>
                    setSelectedOption({
                      name: type.name,
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
