'use client';
import styles from './index.module.css';
import 'reactjs-popup/dist/index.css';
import { useSelect } from 'downshift';
import { cn } from '@/utils/helper/tailwind_cn';
import { ListFilter, X } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Button from '@/components/common/base/Button';
import {  useTranslations } from 'next-intl';

interface OtherSortsProps {
  setSelected: (id: string) => void;
  focused: boolean;
  selectedSort: string;
  legs: string[];
  showMobileSort: boolean;
  setShowMobileSort: Dispatch<SetStateAction<boolean>>;
}

const OtherSorts = ({
  setSelected,
  focused,
  selectedSort,
  legs,
  showMobileSort,
  setShowMobileSort,
}: OtherSortsProps) => {
  const t=useTranslations()
  const [sortList, setSortList] = useState<Array<{ id: string; title: string }>>([
    { id: 'durationLong', title: t('K-Eywhh0stLDAyAtqRLv5')},
  ]);
  const { isOpen, selectedItem, getToggleButtonProps, getMenuProps, getItemProps } = useSelect({
    items: sortList,
    initialSelectedItem: sortList.find((item) => item.id === selectedSort) || null,
    selectedItem: sortList.find((item) => item.id === selectedSort) || null,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setSelected(selectedItem?.id);

        if (showMobileSort) {
          setTimeout(() => {
            setShowMobileSort(false);
          }, 100);
        }
      }
    },
  });


  useEffect(() => {
    const updatedSorts: Array<{ id: string; title: string }> = [
      { id: 'durationLong', title: t('K-Eywhh0stLDAyAtqRLv5') },
    ];
    legs.map((leg: any, index: number) => {
      updatedSorts.push({
        id: `departure${leg[0]}Earliest${index}`,
        title: t('bMQ7KbF5CnKoL-qGmDRdk',{place:leg[0]})
      });
      updatedSorts.push({
        id: `departure${leg[0]}Lastest${index}`,
        title: t('HXaf_AUXGiScWL0kIRG97',{place:leg[0]})
      });
      updatedSorts.push({
        id: `arrival${leg[1]}Earliest${index}`,
        title: t('8gJrurwigq40Ads40JzMH',{place:leg[1]})
      });
      updatedSorts.push({
        id: `arrival${leg[1]}Lastest${index}`,
        title: t('EIyaZV93Fgro8xvpkQgIc',{place:leg[1]})
      });
    });
    setSortList(updatedSorts);
  }, []);

  return (
    <div>
      {/* header */}
      <div className="relative flex flex-col gap-1">
        <div className={styles.otherSorts} {...getToggleButtonProps()}>
          <ListFilter size={17} className={styles.icon} />
          <span>{selectedItem && focused ? selectedItem.title : t('LF6TIRCwtYmZUTYEnK2Ob')}</span>
        </div>
      </div>
      {/* menu */}
      {showMobileSort ? (
        <>
          <ul className={cn(styles.contentContainerMobile)} {...getMenuProps()}>
            <Button
              variant="outline"
              className={'my-6 h-10 w-10 overflow-hidden !rounded-full !p-0'}
              onClick={() => setShowMobileSort(false)}
            >
              <X />
            </Button>
            {sortList.map((item, index) => (
              <li
                className={cn(
                  focused && selectedItem === item ? 'font-bold' : 'font-medium',
                  styles.listItemMobile,
                )}
                key={item.id}
                {...getItemProps({ item, index })}
              >
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ul className={cn(styles.contentContainer, !isOpen && 'hidden')} {...getMenuProps()}>
          {isOpen &&
            sortList.map((item, index) => (
              <li
                className={cn(focused && selectedItem === item && 'font-bold', styles.listItem)}
                key={item.id}
                {...getItemProps({ item, index })}
              >
                <span>{item.title}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default OtherSorts;
