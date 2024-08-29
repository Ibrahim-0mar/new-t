'use client';
import PlaneLanding from '@/components/common/base/PlaneLanding';
import PlaneTakeoff from '@/components/common/base/PlaneTakeoff';
import { fetchPlacesRequest } from '@/services/apis/flights/places';
import { cn } from '@/utils/helper/tailwind_cn';
import { placeType } from '@/utils/types/flights';
import { useCombobox, useMultipleSelection } from 'downshift';
import { Building, Car, PlaneIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useLocale, useTranslations } from 'next-intl';
import { locale } from '@/navigation';
import { fetchNearbyAirports } from '@/services/apis/common/airports';

import { debounce } from 'lodash';
import { fetchTopFlighRequest } from '@/services/apis/flights/trending/fetchTopFlights';
import { revalidateData } from '@/utils/helper/cacheHelpers';


type FlightLocationInputProps = {
  field: any;
  className?: string;
  type?: 'origin' | 'destination';
  variant: 'flights' | 'CarRental';
  basedOn:placeType | null
};

export default function FlightLocationInput(props: FlightLocationInputProps) {
  const locale = useLocale() as locale;
  const t = useTranslations();

  const { field,  className, type,basedOn, variant} = props;
  const [inputValue, setInputValue] = useState<string | undefined>('');
  const [suggesstions, setSuggesstions] = useState<placeType[]>([]);
  const [selectedItems, setSelectedItems] = useState<placeType[] | undefined>(field.value);
  const [listData, setListData] = useState<placeType[]>([]);
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


  // Getting nearby airport when it at first field which basedOn passed as null 
  useEffect(()=>{
    const getNearbyAirports =async()=>{
      const response = await fetchNearbyAirports(locale);
      setListData(response)
  }
    if (!basedOn) {
      getNearbyAirports()
    }
  },[])
 

  // Getting trending destinations based on previous input origin at destination field at case one way or Round
  // at multi city case it take the previous input 

  useEffect(() => {
   if (basedOn && typeof basedOn != 'undefined' ) {
    getTrendingDestination()
   }
  }, [basedOn]);


  const getTrendingDestination =async()=>{

      const response = await fetchTopFlighRequest(
        {
          code: basedOn?.code || "JFK",
          currency: 'USD',
          limit: 10,
          type: basedOn?.placeType || 'airport',
          locale: locale,
        }
      );

         if (!response || response.length === 0) {
            const code = basedOn?.code || "JFK";
            const type = basedOn?.placeType || 'airport';
           revalidateData(`top-flight-${code}-${type}-${locale}-tag`);
         }
      const transformedResponse = response.map((item: any) => {
        return {
          name: item.airport.name,
          phrase: item.airport.phrase,
          placeType: 'airport',
          cityCode: item.destinationCity,
          code: item.destination,
          countryCode: item.destination,
          location: { type: 'Point', coordinates: [0, 0] },
        };
      });
      setListData(transformedResponse);
    
  }


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
    items:Array.isArray(listData) ?  [...suggesstions, ...listData] :suggesstions,
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
            isOpen: false, // keep the menu open after selection.
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
            if (selectedItems && selectedItems.length > 2) {
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
          debouncedSearch(newInputValue)

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
    <div className={styles.container}>
      <div>
        <div className={cn(styles.inputSection, className)}>
          <div className={styles.inputContainer}>
            {type === 'origin' ? (
              <>
                {variant === 'flights' ? (
                  <PlaneTakeoff className={styles.icon} />
                ) : (
                  <Car className={styles.icon} />
                )}
              </>
            ) : (
              <>
                {variant === 'flights' ? (
                  <PlaneLanding className={styles.icon} />
                ) : (
                  <Car className={styles.icon} />
                )}
              </>
            )}
            {selectedItems && selectedItems.map(renderSelectedItem)}
            <input
              className={styles.input}
              disabled={selectedItems && selectedItems.length > 0}
              placeholder={
                selectedItems && selectedItems.length < 1 ? t('BaNlECTgP5Fls1qJkmYn-') : ''
              }
              {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
              aria-label={t('TmG9Km365a5QEZRgVyfJ0', {
                type: type === 'origin' ? 'origin' : 'destination',
              })}
            />
          </div>
        </div>
      </div>
      <ul className={cn(styles.dropdown, !isOpen && 'hidden')} {...getMenuProps()}>
        {isOpen && (
          <>
            {suggesstions.map((item: placeType, index: number) => (
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
            {listData.length > 0 && (
              <>
                <p className={styles.listHeader}>{basedOn?t('VUKevMASy_qSGxUVAhpWD',{airport:basedOn?.name}) :t('o32z4vxSxBaiBpJyM7FgK')}</p>
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
          </>
        )}
      </ul>
    </div>
  );
}
