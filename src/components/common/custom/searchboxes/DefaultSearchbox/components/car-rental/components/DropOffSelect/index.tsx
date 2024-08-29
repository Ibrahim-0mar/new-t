'use client';
import { cn } from '@/utils/helper/tailwind_cn';
import { useSelect } from 'downshift';
import { ChevronDown, ChevronUp } from 'lucide-react';
import 'reactjs-popup/dist/index.css';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

const DropOffSelect = (field: any) => {
  const t = useTranslations();

  const dropoffTypes = [
    { id: 'same', title: t('TFVLfTb-QPDwLVyyakcGa') },
    { id: 'different', title: t('QyVNefBppBktWSurjleMY') },
  ];

  const {
    isOpen,
    selectedItem = field.value.id.length > 0 ? field.value : dropoffTypes[0],
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items: dropoffTypes,
    initialSelectedItem: field.value.id.length > 0 ? field.value : dropoffTypes[0],
    onSelectedItemChange: ({ selectedItem }) => {
      field.onChange(selectedItem);
    },
  });

  return (
    <div>
      {/* header */}
      <div className={styles.selectContainer}>
        <div className={styles.selectInputContent} {...getToggleButtonProps()}>
          <span>{selectedItem ? selectedItem.title : dropoffTypes[0].title}</span>
          <span className="px-2">
            {isOpen ? <ChevronUp color="black" size={16} /> : <ChevronDown size={16} />}
          </span>
        </div>
      </div>
      {/* menu */}
      <ul className={cn(styles.contentContainer, !isOpen && 'hidden')} {...getMenuProps()}>
        {isOpen &&
          dropoffTypes.map((item, index) => (
            <li
              className={cn(selectedItem === item && 'font-bold', styles.listItem)}
              key={item.id}
              {...getItemProps({ item, index })}
            >
              <span>{dropoffTypes[index].title}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DropOffSelect;
