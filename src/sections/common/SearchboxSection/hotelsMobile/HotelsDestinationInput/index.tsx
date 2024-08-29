'use client';
import { cn } from '@/utils/helper/tailwind_cn';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import styles from './index.module.css';
import { placeType } from '@/utils/types/flights';
import Button from '@/components/common/base/Button';
import HotelsLocationInputMobile from '../HotelsLocationInput';
import useBodyScrollLock from '@/utils/hooks/useBodyScrollLock';
import MoveLeft from '@/components/common/base/MoveLeft';

interface MobileLocationInputProps {
  field: ControllerRenderProps<any, any>;
  openedMenu: string;
  setOpenedMenu: any;
  listData: placeType[];
  listHeader: string;
}

const HotelsDestinationInput = ({
  field,
  openedMenu,
  setOpenedMenu,
  listData,
  listHeader,
}: MobileLocationInputProps) => {
  const { value }: { name: string; value: any } = field;

  const [translation] = useState<any>({
    LocationInputPlaceHolder: 'Destination',
    chooseDeparture: 'Choose Destination',
    chooseArrival: 'Choose arrival Location',
  });
  const { lockBodyScroll, unlockBodyScroll } = useBodyScrollLock();

  const clodeSelectMenu = () => setOpenedMenu('');

  useEffect(() => {
    if (openedMenu === 'origin') {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }

    return () => {
      unlockBodyScroll();
    };
  }, [openedMenu]);

  return (
    <>
      <div className={styles.inputContainer}>
        <div
          onClick={() => {
            setOpenedMenu('origin');
          }}
          className={styles.location}
        >
          <MapPin size={30} className={styles.planeIcon} />
          <span className={styles.selectedCode}>
            {(value[0]?.code && `${value[0]?.name.split(' ').slice(0, 1)} (${value[0]?.code})`) || (
              <span className={styles.placeHolder}>{translation.LocationInputPlaceHolder}</span>
            )}
          </span>
        </div>
      </div>
      <div
        className={cn(
          styles.locationSelect,
          openedMenu === 'origin' ? 'top-0 opacity-100' : 'translate-y-full opacity-50',
        )}
      >
        <div className={styles.locationMenuHeader}>
          <MoveLeft strokeWidth={2.5} onClick={clodeSelectMenu} />
          <span className={styles.headerText}>{translation.chooseDeparture}</span>
        </div>
        <div>
          <HotelsLocationInputMobile field={field} listData={listData} listHeader={listHeader} />
        </div>
        <Button
          className={styles.doneButton}
          variant="secondary"
          onClick={clodeSelectMenu}
          type="button"
        >
          Done
        </Button>
      </div>
    </>
  );
};

export default HotelsDestinationInput;
