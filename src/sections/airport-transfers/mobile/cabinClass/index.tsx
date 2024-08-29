'use client';
import Button from '@/components/common/base/Button';
import { cn } from '@/utils/helper/tailwind_cn';
import { ChevronDown } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { OpenedMenuTypes } from '..';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

const CabinClassMobile = ({
  field,
  openedMenu,
  setOpenedMenu,
}: {
  field: any;
  openedMenu: string;
  setOpenedMenu: Dispatch<SetStateAction<OpenedMenuTypes>>;
}) => {
  const t = useTranslations();

  const { onChange, value } = field;
  const [toggleCabinClass, setToggleCabinClass] = useState<boolean>(false);

  const cabinClasses = {
    Economy: t('rIiR0JqFJCgXghbVz0mzU'),
    Premium_Economy: t('ipLZ1siuRxhwd2x_8Efz_'),
    Business: t('YPnMS1LA9yFxZ-uUkc91l'),
    First: t('V5kZRvDl1vU-7uxuJKWNA'),
  };

  const handleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenedMenu('cabin');
    setToggleCabinClass(!toggleCabinClass);
    setSelectedOption({ id: value.id, title: value.title });
  };
  const handleDoneBtn = (e: React.MouseEvent) => {
    e.preventDefault();
    onChange({ id: selectedOption.id, title: selectedOption.title });
    setToggleCabinClass(!toggleCabinClass);
  };

  useEffect(() => {
    if (openedMenu !== 'cabin') {
      setToggleCabinClass(false);
    }
  }, [openedMenu]);

  const [selectedOption, setSelectedOption] = useState({
    id: 'Economy',
    title: t('rIiR0JqFJCgXghbVz0mzU'),
  });

  return (
    <>
      <div className={styles.container}>
        <Button className={styles.cabinClassBtn} variant="default" onClick={handleMenu}>
          {cabinClasses[value.id as keyof typeof cabinClasses]}
          <ChevronDown size={15} className="mt-0.5" />
        </Button>
      </div>
      {toggleCabinClass && (
        <div className={cn(styles.cabinClassMenu, toggleCabinClass && styles.cabinClassAnimate)}>
          <span className={styles.optionsHeading}>{t('UB8aojJ_BY1I3TBEB_HO_')}</span>
          {Object.keys(cabinClasses).map((key) => (
            <div key={key}>
              <label htmlFor={key} className={styles.optionLabel}>
                <div className={styles.optionContainer}>
                  <span>{cabinClasses[key as keyof typeof cabinClasses]}</span>
                </div>
                <span
                  className={cn(
                    styles.customRadioIcon,
                    selectedOption.id === key && styles.activeCustomRadioIcon,
                  )}
                />
              </label>
              <input
                className="sr-only"
                type="radio"
                id={key}
                value={key}
                checked={selectedOption.id === key}
                onChange={(e) =>
                  setSelectedOption({
                    title: cabinClasses[key as keyof typeof cabinClasses],
                    id: e.target.value,
                  })
                }
              />
            </div>
          ))}
          <div className={styles.actionsContainer}>
            <Button className={styles.cancelBtn} variant="default" onClick={handleMenu}>
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
    </>
  );
};

export default CabinClassMobile;
