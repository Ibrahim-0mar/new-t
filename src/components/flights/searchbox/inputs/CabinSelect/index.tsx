'use client';

import styles from './index.module.css';
import 'reactjs-popup/dist/index.css';
import { useSelect } from 'downshift';
import { cn } from '@/utils/helper/tailwind_cn';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

const CabinSelect = (field: any) => {
  const t = useTranslations();

  const cabinClasses = [
    { id: 'Economy', value: 'Economy', title: t('rIiR0JqFJCgXghbVz0mzU') },
    { id: 'Premium_Economy', value: 'Premium Economy	', title: t('ipLZ1siuRxhwd2x_8Efz_') },
    { id: 'Business', value: 'Business', title: t('YPnMS1LA9yFxZ-uUkc91l') },
    { id: 'First', value: 'First class', title: t('V5kZRvDl1vU-7uxuJKWNA') },
  ];

  const {
    isOpen,
    selectedItem = field.value.id.length > 0 ? field.value : cabinClasses[0],
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items: cabinClasses,
    initialSelectedItem: field.value.id.length > 0 ? field.value : cabinClasses[0],
    onSelectedItemChange: ({ selectedItem }) => {
      field.onChange(selectedItem);
    },
  });

  return (
    <div>
      {/* header */}
      <div className="flex flex-col gap-1">
        <div
          className="flex cursor-pointer items-center justify-between p-2  font-medium text-primary"
          {...getToggleButtonProps()}
          aria-label={t('HbktoAEu_0lFrcpngmvuk')}
        >
          <span className={styles.cabinTitle}>{selectedItem?.title || cabinClasses[0].title}</span>
          <span className="px-2">
            {isOpen ? <ChevronUp color="black" size={16} /> : <ChevronDown size={16} />}
          </span>
        </div>
      </div>
      {/* menu */}
      <ul className={cn(styles.contentContainer, !isOpen && 'hidden')} {...getMenuProps()}>
        {isOpen &&
          cabinClasses.map((item, index) => (
            <li
              className={cn(selectedItem === item && 'font-bold', styles.listItem)}
              key={item.id}
              {...getItemProps({ item, index })}
            >
              <span>{cabinClasses.find((cc) => cc.id === item.id)!.title}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CabinSelect;
