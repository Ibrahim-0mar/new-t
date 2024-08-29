'use client';

import { cn } from '@/utils/helper/tailwind_cn';
import { useCallback, useState } from 'react';
import styles from './index.module.css';
import { Building, Car, PlaneIcon } from 'lucide-react';
import { useCombobox, useMultipleSelection } from 'downshift';
import { fetchTransfersPlacesRequest } from '@/services/apis/airport-transfers/places';
import { AirportTransfersPlace } from '@/utils/types/airport-transfers';
import { useLocale, useTranslations } from 'next-intl';
import { locale } from '@/navigation';
import { debounce } from 'lodash';

type AirportTransfersLocationInputProps = {
  field: any;
  listData: AirportTransfersPlace[];
  listHeader: string;
};

export default function TransfersComboBox(props: AirportTransfersLocationInputProps) {
  const locale = useLocale() as locale;
  const t = useTranslations();

  const { field, listData, listHeader } = props;
  const [inputValue, setInputValue] = useState<string | undefined>('');
  const [suggesstions, setSuggesstions] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[] | undefined>(field.value);

  const getSuggessions = async (value: string) => {

    const response = await fetchTransfersPlacesRequest(value, locale);
    setSuggesstions(response);
  };

  // to make api call only when the user stop typing
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.length > 2) {
        getSuggessions(query)      
      }
    }, 700), 
    []
  );
  const { isOpen, getMenuProps, getInputProps, getItemProps } = useCombobox({
    items: [...suggesstions, ...listData],
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    inputValue,
    stateReducer(state, actionAndChanges) {
      const { changes, type } = actionAndChanges;

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
            highlightedIndex: 0, // with the first option highlighted.
          };
        default:
          return changes;
      }
    },
    onStateChange({ inputValue: newInputValue, type, selectedItem: newSelectedItem }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem) {
            setSelectedItems([newSelectedItem]);
            field.onChange([newSelectedItem]);
            setInputValue('');
          }

          break;

        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue);
          debouncedSearch(newInputValue);
          break;
        default:
          break;
      }
    },
  });

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } = useMultipleSelection({
    selectedItems,
    onStateChange({ selectedItems: newSelectedItems, type }) {
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          setSelectedItems(newSelectedItems);
          field.onChange(newSelectedItems);
          break;
        default:
          break;
      }
    },
  });

  function renderSelectedItem(selectedItemForRender: any, index: number) {
    return (
      <div
        className={cn(
          styles.selectedItem,
          selectedItems && selectedItems.length === 1 ? '!min-w-fit' : '',
        )}
        key={`selected-item-${index}`}
        {...getSelectedItemProps({
          selectedItem: selectedItemForRender,
          index,
        })}
      >
        {selectedItems && selectedItemForRender?.terms[0]?.value?.length > 20
          ? selectedItemForRender?.terms[0]?.value?.slice(0, 20) + '...'
          : selectedItemForRender?.terms[0]?.value}
        <span
          className="cursor-pointer px-1"
          onClick={(e) => {
            e.stopPropagation();
            removeSelectedItem(selectedItemForRender);
          }}
        >
          &#10005;
        </span>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className={styles.inputSection}>
          <div className={styles.inputContainer}>
            <Car className={styles.icon} />
            {selectedItems && selectedItems.map(renderSelectedItem)}
            <input
              className={styles.input}
              disabled={selectedItems && selectedItems.length > 0}
              placeholder={
                selectedItems && selectedItems.length < 1 ? t('eIMH9RuOI2R9DubPNhtA6') : ''
              }
              {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            />
          </div>
        </div>
        <ul className={cn(styles.dropdown, !isOpen && 'hidden')} {...getMenuProps()}>
          {isOpen &&
            suggesstions.map((item: any, index: number) => (
              <li
                className={cn(styles.resultItemContainer)}
                key={`${item.code}${index}`}
                {...getItemProps({ item, index })}
              >
                {item.types.length > 0 && item.types?.includes('airport') ? (
                  <PlaneIcon className={styles.resultIcon} />
                ) : (
                  <Building className={styles.resultIcon} />
                )}

                <div className={styles.nameSection}>
                  <p className={styles.name}>{item.terms.length > 0 ? item.terms[0]?.value : ''}</p>
                  <span className={styles.phrase}>{item.description}</span>
                </div>
              </li>
            ))}

          {listData.length > 0 && (
            <>
              <p className={styles.listHeader}>{listHeader}</p>
              {listData.map((item: any, index: number) => (
                <li
                  className={cn(styles.resultItemContainer)}
                  key={`${item.code}${index}`}
                  {...getItemProps({ item, index })}
                >
                  {item.types.length > 0 && item.types?.includes('airport') ? (
                    <PlaneIcon className={styles.resultIcon} />
                  ) : (
                    <Building className={styles.resultIcon} />
                  )}

                  <div className={styles.nameSection}>
                    <p className={styles.name}>
                      {item.terms.length > 0 ? item.terms[0]?.value : ''}
                    </p>
                    <span className={styles.phrase}>{item.description}</span>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
