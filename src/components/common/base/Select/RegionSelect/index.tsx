'use client';
import { useCombobox } from 'downshift';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './index.module.css';
import { cn } from '@/utils/helper/tailwind_cn';
import LanguageItems from './components/LanguageItems';
import CurrencyItems from './components/currencyItems';
import CountryItems from './components/countryItems';
import Image from 'next/image';
import { sortAscending } from '@/utils/helper/numbers';
import { useTranslations } from 'next-intl';
type RegionSelectProps = {
  handleChange: (value: any) => void;
  label?: React.ReactNode;
  placeholder?: string;
  icon?: React.ReactNode;
  inputClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
  optionsTitle?: React.ReactNode;
  defaultValue: any;
  itemsType: string;
  options: any;
  flag?: string;
  selected: any;
};

const RegionSelect: FunctionComponent<RegionSelectProps> = ({
  handleChange,
  inputClassName,
  menuClassName,
  itemClassName,
  itemsType,
  options,
  optionsTitle,
  label,
  placeholder,
  defaultValue,
  icon,
  flag,
  selected,
}) => {
  const t = useTranslations();

  const [isBlured, setBlured] = useState(true);
  function getOptionsFilter(inputValue: string | undefined) {
    const lowerCasedInputValue = inputValue?.toLowerCase();
    return function optionsFilter(option: any) {
      return (
        !inputValue ||
        option.name.toLowerCase().includes(lowerCasedInputValue) ||
        option.code.toLowerCase().includes(lowerCasedInputValue)
      );
    };
  }
  const [items, setItems] = useState(options);
  const [selectedItem, setSelectedItem] = useState(selected);

  useEffect(() => {
    setSelectedItem(selected);
  }, [selected]);
  const {
    getLabelProps,
    getMenuProps,
    getInputProps,
    isOpen,
    inputValue,
    highlightedIndex,
    getItemProps,
    getToggleButtonProps,
    setInputValue,
    toggleMenu
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setItems(options?.filter(getOptionsFilter(inputValue)) || []);
    },
    items,
    selectedItem: selectedItem,
    itemToString(item: any) {
      if (item && itemsType === 'language') {
        return `${item.name} (${item.country})`;
      } else if (item && itemsType === 'currency') {
        return `${item.name} (${item.code})`;
      } else if (item && itemsType === 'country') {
        return `${item.name}`;
      } else {
        return '';
      }
    },
  });

  return (
    <div>
      <div className={styles.regionRoot}>
        <div className={styles.regionContent}>
          <div {...getLabelProps()}>{label}</div>
          <div className={cn(styles.regionInput, inputClassName)} {...getToggleButtonProps()} onClick={() => {
            setInputValue('');
            toggleMenu();
          }}>
            {flag ? (
              <Image
                src={flag}
                height={30}
                width={30}
                alt={t('eJvchykDQuK4uN0WTt8_5')}
                className={styles.flagImage}
              />
            ) : (
              ''
            )}

            <input
              onFocus={() => {
                setBlured(false);
              }}
              placeholder={placeholder}
              className={styles.innerInput}
              {...getInputProps()}
              value={inputValue ? inputValue : !isBlured ? inputValue : defaultValue}
              onBlur={() => setBlured(true)}
            />
            <span className={styles.selectIcon}>{icon ? <>{icon}</> : <ChevronDown />}</span>
          </div>
        </div>

        <ul className={cn(menuClassName, `${!isOpen && 'hidden'}`)} {...getMenuProps()}>
          <>{optionsTitle}</>
          {isOpen &&
            items.length >0 && items
              .sort((a: any, b: any) => sortAscending(a.name, b.name))
              .map((item: any, index: number) => (
                <div
                  key={item.name}
                  className={styles.itemContainer}
                  onClick={() => {
                    handleChange(item);
                    setSelectedItem(item);
                  }}
                >
                  <li
                    {...getItemProps({ item, index })}
                    className={cn(
                      highlightedIndex === index && styles.highLight,
                      selectedItem === item && 'font-bold',
                      itemClassName,
                    )}
                  >
                    <div>
                      {(() => {
                        switch (itemsType) {
                          case 'language':
                            return <LanguageItems item={item} />;
                          case 'country':
                            return <CountryItems item={item} />;
                          case 'currency':
                            return <CurrencyItems item={item} />;

                          default:
                            null;
                        }
                      })()}
                    </div>
                  </li>
                </div>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default RegionSelect;
