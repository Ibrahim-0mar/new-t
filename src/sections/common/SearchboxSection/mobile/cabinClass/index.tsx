'use client';
import Button from '@/components/common/base/Button';
import { cn } from '@/utils/helper/tailwind_cn';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { OpenedMenuTypes } from '..';
import styles from './index.module.css';

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

  const cabinClasses = [
    { id: 'Economy', value: 'Economy', title: t('rIiR0JqFJCgXghbVz0mzU') },
    { id: 'Premium_Economy', value: 'Premium Economy	', title: t('ipLZ1siuRxhwd2x_8Efz_') },
    { id: 'Business', value: 'Business', title: t('YPnMS1LA9yFxZ-uUkc91l') },
    { id: 'First', value: 'First class	', title: t('V5kZRvDl1vU-7uxuJKWNA') },
  ];

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
    title: 'Economy',
  });

  return (
    <>
      <div className={styles.container}>
        <Button className={styles.cabinClassBtn} variant="default" onClick={handleMenu}>
          {cabinClasses.find((cc) => cc.id === value.id)?.title || value.title}
          <ChevronDown size={15} className="mt-0.5" />
        </Button>
      </div>
      {toggleCabinClass && (
        <div className={cn(styles.cabinClassMenu, toggleCabinClass && styles.cabinClassAnimate)}>
          <span className={styles.optionsHeading}>{t('UB8aojJ_BY1I3TBEB_HO_')}</span>
          {cabinClasses.map((type) => (
            <div key={type.id}>
              <label htmlFor={type.id} className={styles.optionLabel}>
                <div className={styles.optionContainer}>
                  <span>{cabinClasses.find((cc) => cc.id === type.id)?.title || type.title}</span>
                </div>
                <span
                  className={cn(
                    styles.customRadioIcon,
                    selectedOption.id === type.id && styles.activeCustomRadioIcon,
                  )}
                />
              </label>
              <input
                className="sr-only"
                type="radio"
                id={type.id}
                value={type.id}
                checked={selectedOption.id === type.id}
                onChange={(e) => setSelectedOption({ title: type.title, id: e.target.value })}
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
