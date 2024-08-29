'use client';
import { cn } from '@/utils/helper/tailwind_cn';
import { Dispatch, SetStateAction } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { OpenedMenuTypes } from '../..';
import styles from './index.module.css';
import FlightLocationInputMobile from '../FlightLicationInputMobile';
import { placeType } from '@/utils/types/flights';
import Button from '@/components/common/base/Button';
import PlaneTakeoff from '@/components/common/base/PlaneTakeoff';
import PlaneLanding from '@/components/common/base/PlaneLanding';
import MoveLeft from '@/components/common/base/MoveLeft';
import { useTranslations } from 'next-intl';

interface MobileLocationInputProps {
  field: ControllerRenderProps<any, any>;
  openedMenu: string;
  setOpenedMenu: Dispatch<SetStateAction<OpenedMenuTypes>>;
  listData: placeType[];
  listHeader: string;
  type?: 'origin' | 'distention';
}

const MobileLocationInput = ({
  field,
  openedMenu,
  setOpenedMenu,
  listData,
  listHeader,
  type,
}: MobileLocationInputProps) => {
  const t = useTranslations();

  const { name, value }: { name: string; value: any } = field;
  const isOrigin = name.includes('origin');
  const isDestention = name.includes('destination');

  const clodeSelectMenu = () => setOpenedMenu('');

  const openSelectMenu = () => {
    // We will use the name as a unique ID for each field for orig or dest.
    if (isOrigin) {
      setOpenedMenu(name as OpenedMenuTypes);
    }
    if (isDestention) {
      setOpenedMenu(name as OpenedMenuTypes);
    }
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <div
          onClick={openSelectMenu}
          className={cn(styles.location, isOrigin ? 'rounded-t-3xl' : 'rounded-b-3xl')}
        >
          {isOrigin && <PlaneTakeoff size={30} className={styles.planeIcon} />}
          {isDestention && <PlaneLanding size={30} className={styles.planeIcon} />}
          <span className={styles.selectedCode}>
            {(value[0]?.code && `${value[0]?.name.split(' ').slice(0, 1)} (${value[0]?.code})`) || (
              <span className={styles.placeHolder}>{t('BaNlECTgP5Fls1qJkmYn-')}</span>
            )}
          </span>
        </div>
      </div>
      <div
        className={cn(
          styles.locationSelect,
          openedMenu === name && type === 'origin'
            ? 'top-0 opacity-100'
            : 'translate-y-full opacity-50',
        )}
      >
        <div className={styles.locationMenuHeader}>
          <MoveLeft strokeWidth={2.5} onClick={clodeSelectMenu} />
          <span className={styles.headerText}>{t('TtaJ3r22bSeFc1k6AIsTW')}</span>
        </div>
        <div id="search input">
          <FlightLocationInputMobile
            field={field}
            listData={listData}
            listHeader={listHeader}
            type={type}
          />
        </div>
        <Button
          className={styles.doneButton}
          type="button"
          variant="secondary"
          onClick={clodeSelectMenu}
        >
          {t('hGBYhJKUK2tCg9j_xaosr')}
        </Button>
      </div>
      <div
        className={cn(
          styles.locationSelect,
          openedMenu === name && type === 'distention'
            ? 'top-0 opacity-100'
            : 'translate-y-full opacity-50',
        )}
      >
        <div className={styles.locationMenuHeader}>
          <MoveLeft strokeWidth={2.5} onClick={clodeSelectMenu} />
          <span className={styles.headerText}>{t('chOcJEr6P3y6VyC59NZX8')}</span>
        </div>
        <div id="search input">
          <FlightLocationInputMobile
            field={field}
            listData={listData}
            listHeader={listHeader}
            type={type}
          />
        </div>
        <Button
          className={styles.doneButton}
          type="button"
          variant="secondary"
          onClick={clodeSelectMenu}
        >
          {t('hGBYhJKUK2tCg9j_xaosr')}
        </Button>
      </div>
    </>
  );
};

export default MobileLocationInput;
