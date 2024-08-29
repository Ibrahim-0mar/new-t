"use client"

//? Libraries ---------------------------------------------------------------------
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, CircleX, LoaderCircle } from 'lucide-react';

//? Services & Utilities ----------------------------------------------------------
import { cn } from '@/utils/helper/tailwind_cn';
import useOutsideClick from '@/utils/hooks/useOutsideClick';

//? Custom Components & Styles ----------------------------------------------------
import styles from './index.module.css';

//? Types -------------------------------------------------------------------------
type OptionType = { id?: string, value?: string, jsx?: JSX.Element };

type InputProps = {
  label: string | JSX.Element,
  placeholder: string,
  options: OptionType[],
  selectedOption: OptionType,
  setSelectedOption: (option: OptionType) => void,
  disabled?: boolean,
  customInputValue?: string,
  dropdownPosition?: 'top' | 'bottom',
  isLoading?: boolean,
  isError?: boolean
}

export default function Select({
  label = "Language",
  placeholder = "Choose language",
  options = [],
  selectedOption,
  setSelectedOption,
  disabled = false,
  customInputValue,
  dropdownPosition = 'bottom',
  isLoading,
  isError
}: InputProps) {
  //# Internationalization
  const t = useTranslations();

  //# State
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<any[]>(options);
  const [inputValue, setInputValue] = useState<string | undefined>(selectedOption?.value);

  //# Ref
  const ref = useOutsideClick<HTMLDivElement>(() => setIsDropdownOpen(false));
  const dropDownRef = useRef<HTMLUListElement | null>(null);

  // TODO: Implement logic to position the dropdown based on the screen vh

  /**
   * Sets the input value state as the jsx input's value, and filters the options based on the value
   * @param e
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredOptions(options.filter(o => o?.value?.toLowerCase().includes(value.toLowerCase())));
  }

  /**
   * Toggles the open state for dropdown based on the argument
   * @param state
   */
  const toggleDropdown = (state: boolean | { (prev: boolean): boolean }) => {
    // const windowHeight = window.innerHeight;
    // console.log(dropDownRef.current)
    // if (dropDownRef.current) {
    //   const dropdownBottomPosition = dropDownRef.current.getBoundingClientRect().bottom;
    //   console.log(windowHeight, dropdownBottomPosition)
    //   if (windowHeight < dropdownBottomPosition + 20) {
    //     dropDownRef.current.style.top = 'auto';
    //     dropDownRef.current.style.bottom = '100%'
    //   } else {
    //     dropDownRef.current.style.bottom = 'auto';
    //     dropDownRef.current.style.top = '100%'
    //   }
    // }

    setIsDropdownOpen(state)
  }

  /**
   * Closes the dropdown, updates the input value and updates the selected option with the selection value
   * @param option
   */
  const handleOptionClick = (option: OptionType) => {
    toggleDropdown(false);
    setInputValue(option.value);
    setSelectedOption(option)
  }

  // This useEffect is to sync the country input with the currency, so that the currency changes
  // corresponding to the changes on the country input to match the country's currency
  useEffect(() => {
    setInputValue(customInputValue || selectedOption.value)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customInputValue])

  return (
    <div className={cn(styles.inputContainer, disabled && styles.disabled, isError && styles.error)}>
      {/* Input Label */}
      <label className={styles.label}>
        {label}
        {isLoading && <LoaderCircle size={18} className='animate-spin'/>}
        {isError && <p className={styles.errorMessage}><CircleX size={15}/>{t('ZVYypU-nDpCbGir9JIRoN')}</p>}
      </label>

      {/* Input Container */}
      <div className={cn(styles.inputField, 'group', isError && styles.error)} ref={ref}>
        {/* Input Field */}
        <div>
          {selectedOption?.jsx}
          <input
            disabled={disabled}
            type="text"
            placeholder={disabled ? t('kxA7DzJyMk-dRq1S-bU10') : placeholder}
            onFocus={() => {
              // Open the dropdown and clear the input value on focus
              toggleDropdown(true);
              setInputValue('')
            }}
            value={inputValue || ''}
            onChange={handleInputChange}
          />
        </div>

        {/* Chevron Arrow Button */}
        <button
          tabIndex={disabled ? -1 : 0}
          onClick={() => {
            toggleDropdown(prevVal => !prevVal);
            // Clear the input value upon ONLY opening the dropdown, don't clear it upon closing
            !isDropdownOpen && setInputValue('');
          }}
          className={cn('group-focus-within:text-sixth focus:outline-none', isError && styles.error)}
          type="button"
          >
          <ChevronDown />
        </button>

        {/* Dropdown */}
        {isDropdownOpen && !disabled && selectedOption && (
          // The Actual Options List, Only rendered if the dropdown is open, the input is not set to be disabled
          // and there is a valid selected option
          <ul className={cn(
            styles.dropdown,
            dropdownPosition === 'top' ? 'top-auto bottom-full mb-1 mt-auto' : 'top-full bottom-auto mt-1 mb-auto',
          )}
            ref={dropDownRef}>

          {/* If the input has text, display the filtered options */}
          {inputValue
            ? (
                filteredOptions.map(option => (
                  <li key={option.id}>
                    <button
                      type="button"
                      onClick={() => handleOptionClick(option)}
                      className={cn('', selectedOption.id === option.id && styles.active)}
                      >
                      {option.value}
                    </button>
                  </li>
                ))
              )
          // If it doesn't have text, display all options
            : (
              options.map((option) => (
                <li key={option.id}>
                  <button
                    type="button"
                    onClick={() => handleOptionClick(option)}
                    className={cn('', selectedOption?.id === option.id && styles.activeOption)}
                    >
                    {option.value}
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  )
}


