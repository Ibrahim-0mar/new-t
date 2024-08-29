'use client';
import { fetchPlacesRequest } from '@/services/apis/flights/places';
import { cn } from '@/utils/helper/tailwind_cn';
import { placeType } from '@/utils/types/flights';
import { useCombobox, useMultipleSelection } from 'downshift';
import { Building, PlaneIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useLocale, useTranslations } from 'next-intl';
import { locale } from '@/navigation';
import { debounce } from 'lodash';

type FlightLocationInputProps = {
  field: any;
  listData: placeType[];
  listHeader: string;
  type?: 'origin' | 'distention';
};

export default function FlightLocationInputMobile(props: FlightLocationInputProps) {
  const t = useTranslations();
  const locale = useLocale() as locale;

  const { field, listData, type } = props;
  const [inputValue, setInputValue] = useState<string | undefined>('');
  const [suggesstions, setSuggesstions] = useState<placeType[]>([]);
  const [selectedItems, setSelectedItems] = useState<placeType[] | undefined>(field.value);

  const getSuggessions = async (value: string) => {
    const response = await fetchPlacesRequest(value, locale);
    setSuggesstions(response);
  };

  // to make api call only when the user stop typing and after typing 3 letters
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.length > 2) {
        getSuggessions(query)      
      }
    }, 700), 
    []
  );

  useEffect(() => {
    //update the selected item if the field value is changed outside the component
    if (field.value && selectedItems && field.value.length > selectedItems.length) {
      setSelectedItems(field.value);
    }
  }, [field.value]);

  useEffect(() => {
    // This effect for updating the swapped origins & destinations
    setSelectedItems(field.value);
  }, [field.value]);

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } = useMultipleSelection({
    selectedItems,
    onStateChange({ selectedItems: newSelectedItems, type }) {
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          field.onChange(newSelectedItems);
          setSelectedItems(newSelectedItems);

          break;
        default:
          break;
      }
    },
  });
  const { isOpen, getMenuProps, getInputProps, getItemProps } = useCombobox({
    items: Array.isArray(listData)? [...suggesstions, ...listData]: suggesstions,
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
            if (selectedItems && selectedItems.length > 0) {
              return; // limit the selection to 3 items.
            } else {
              if (selectedItems && selectedItems.length > 0) {
                const isExist = field.value.find((item: any) => item.code === newSelectedItem.code);
                if (isExist) {
                  return; // prevent duplicate selection.
                }
              }
              setSelectedItems(
                selectedItems && selectedItems.length > 0
                  ? [...selectedItems, newSelectedItem]
                  : [newSelectedItem],
              );
              field.onChange(
                selectedItems && selectedItems.length > 0
                  ? [...selectedItems, newSelectedItem]
                  : [newSelectedItem],
              );
              setInputValue('');
            }
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
  function renderSelectedItem(selectedItemForRender: placeType, index: number) {
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
        {selectedItems && selectedItems.length === 1 && selectedItemForRender.name
          ? selectedItemForRender.name.length > 20
            ? selectedItemForRender.name.slice(0, 20) + '...'
            : selectedItemForRender.name
          : selectedItemForRender.code}
        <span
          className={styles.cancel}
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
    <div className={styles.mainContainer}>
      <div>
        <div className={styles.inputSection}>
          <div className={styles.inputContainer}>
            <span className={styles.direction}>
              {type === 'origin' ? t('LyKsyeiugkvvG5EFASGyN') : t('TR6HhuwzTSU-9TAtZMbxL')}
            </span>
            {field.value && field.value.map(renderSelectedItem)}
            <input
              className={styles.input}
              disabled={selectedItems && selectedItems.length > 0}
              placeholder={
                selectedItems && selectedItems.length < 1 ? t('BaNlECTgP5Fls1qJkmYn-') : ''
              }
              {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            />
          </div>
        </div>
      </div>
      <ul className={styles.suggesstionsList} {...getMenuProps()}>
        {suggesstions.map((item: placeType, index: number) => (
          <li
            className={styles.resultItemContainer}
            key={`${item.code}${index}`}
            {...getItemProps({ item, index })}
          >
            {item.placeType === 'airport' ? (
              <PlaneIcon className={styles.resultIcon} />
            ) : (
              <Building className={styles.resultIcon} />
            )}

            <div className={styles.nameSection}>
              <p className={styles.name}>
                {item.name} ({item.code})
              </p>
              <span className={styles.phrase}>{item.phrase}</span>
            </div>
          </li>
        ))}
        {listData.length > 0 && (
          <>
            {listData.map((item: placeType, index: number) => (
              <li
                className={cn(styles.resultItemContainer)}
                key={`${item.code}${index}`}
                {...getItemProps({ item, index })}
              >
                {item.placeType === 'airport' ? (
                  <PlaneIcon className={styles.resultIcon} />
                ) : (
                  <Building className={styles.resultIcon} />
                )}

                <div className={styles.nameSection}>
                  <p className={styles.name}>{item.name}</p>
                  <span className={styles.phrase}>{item.phrase}</span>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}
