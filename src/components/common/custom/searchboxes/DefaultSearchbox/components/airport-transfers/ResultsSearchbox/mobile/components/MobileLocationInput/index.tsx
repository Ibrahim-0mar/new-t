'use client';
import { cn } from '@/utils/helper/tailwind_cn';
import { Dispatch, SetStateAction } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { OpenedMenuTypes } from '../..';
import styles from './index.module.css';
import AirportTransfersLocationInputMobile from '../AirportTransfersLocationInputMobile';
import { Car } from 'lucide-react';
import { AirportTransfersPlace } from '@/utils/types/airport-transfers';
import Button from '@/components/common/base/Button';
import MoveLeft from '@/components/common/base/MoveLeft';
import { useTranslations } from 'next-intl';
interface MobileLocationInputProps {
  field: ControllerRenderProps<any, any>;
  openedMenu: string;
  setOpenedMenu: Dispatch<SetStateAction<OpenedMenuTypes>>;
  listData: AirportTransfersPlace[];
  listHeader: string;
  type?: 'pickup' | 'dropoff';
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
  const isOrigin = name.includes('pickup');
  const isDestention = name.includes('dropoff');

  const clodeSelectMenu = () => setOpenedMenu('');

  const openSelectMenu = () => {
    if (isOrigin) {
      setOpenedMenu('pickup');
    }
    if (isDestention) {
      setOpenedMenu('dropoff');
    }
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <div
          onClick={openSelectMenu}
          className={cn(styles.location, type === 'pickup' ? 'rounded-t-3xl' : 'rounded-b-3xl')}
        >
          <Car size={25} className={styles.planeIcon} />

          <span className={styles.selectedCode}>
            {value[0]?.terms[0]?.value?.length > 20
              ? value[0]?.terms[0]?.value?.slice(0, 20) + '...'
              : value[0]?.terms[0]?.value || (
                  <span className={styles.placeHolder}>{t('BaNlECTgP5Fls1qJkmYn-')}</span>
                )}
          </span>
        </div>
      </div>
      {openedMenu === 'pickup' && type === 'pickup' && (
        <div
          className={cn(
            styles.locationSelect,
            openedMenu === 'pickup' && type === 'pickup'
              ? 'top-0 opacity-100'
              : 'translate-y-full opacity-50',
          )}
        >
          <div className={styles.locationMenuHeader}>
            <MoveLeft strokeWidth={2.5} onClick={clodeSelectMenu} />
            <span className={styles.headerText}>{t('TtaJ3r22bSeFc1k6AIsTW')}</span>
          </div>
          <div id="search input">
            <AirportTransfersLocationInputMobile
              field={field}
              listData={listData}
              listHeader={listHeader}
            />
          </div>
          <Button className={styles.doneButton} variant="secondary" onClick={clodeSelectMenu}>
            {t('hGBYhJKUK2tCg9j_xaosr')}
          </Button>
        </div>
      )}
      {openedMenu === 'dropoff' && type === 'dropoff' && (
        <div
          className={cn(
            styles.locationSelect,
            openedMenu === 'dropoff' && type === 'dropoff'
              ? 'top-0 opacity-100'
              : 'translate-y-full opacity-50',
          )}
        >
          <div className={styles.locationMenuHeader}>
            <MoveLeft strokeWidth={2.5} onClick={clodeSelectMenu} />
            <span className={styles.headerText}>{t('chOcJEr6P3y6VyC59NZX8')}</span>
          </div>
          <div id="search input">
            <AirportTransfersLocationInputMobile
              field={field}
              listData={listData}
              listHeader={listHeader}
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
      )}
    </>
  );
};

export default MobileLocationInput;
