import React from 'react';
import styles from './index.module.css';
import 'reactjs-popup/dist/index.css';
import { useSelect } from 'downshift';
import { cn } from '@/utils/helper/tailwind_cn';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';
import { useTranslations } from 'next-intl';

interface TripTypeSelectProps {
  field: ControllerRenderProps<any, 'tripType'>;
}

const TripTypeSelect: React.FC<TripTypeSelectProps> = ({ field }) => {
  const t = useTranslations();

  const typesNames = {
    'one-way': t('cd_4pzYkVbyTku6JYAIqT'),
    'round-trip': t('qCJNwX_A29mSPMKA1wELp'),
    'multi-city': t('oOz1ckD4fnuAlzWv35wph'),
  };

  const flightTripTypes = Object.keys(typesNames).map((key) => {
    return {
      id: key,
      title: typesNames[key as keyof typeof typesNames],
    };
  });

  const { isOpen, selectedItem, getToggleButtonProps, getMenuProps, getItemProps } = useSelect({
    items: flightTripTypes,
    selectedItem: flightTripTypes.find((item) => item.id === field.value),
    onSelectedItemChange: ({ selectedItem }) => {
      field.onChange(selectedItem?.id);
    },
  });

  return (
    <div>
      {/* header */}
      <div className="flex flex-col gap-1">
        <div
          className="flex w-full cursor-pointer items-center justify-center bg-transparent p-2 font-medium text-primary"
          {...getToggleButtonProps()}
        >
          <span className="whitespace-nowrap">
            {selectedItem
              ? typesNames[selectedItem.id as keyof typeof typesNames]
              : typesNames['round-trip']}
          </span>
          <span className="px-1">
            {isOpen ? <ChevronUp color="black" size={16} /> : <ChevronDown size={16} />}
          </span>
        </div>
      </div>
      {/* menu */}
      <ul className={cn(styles.contentContainer, !isOpen && 'hidden')} {...getMenuProps()}>
        {isOpen &&
          flightTripTypes.map((item, index) => (
            <li
              className={cn(selectedItem === item && 'font-bold', styles.listItem)}
              key={item.id}
              {...getItemProps({ item, index })}
            >
              <span>{typesNames[item.id as keyof typeof typesNames]}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TripTypeSelect;
