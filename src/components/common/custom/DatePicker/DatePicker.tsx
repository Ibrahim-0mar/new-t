import { useLocale } from 'next-intl';
import { locale } from '@/navigation';
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';

import ar from 'date-fns/locale/ar';
import en from 'date-fns/locale/en-US';
import fr from 'date-fns/locale/fr';
import hi from 'date-fns/locale/hi';
import zh from 'date-fns/locale/zh-CN';

registerLocale('ar', ar);
registerLocale('en', en);
registerLocale('fr', fr);
registerLocale('hi', hi);
registerLocale('zh', zh);

/**
 * DatePicker component that dynamically imports and registers locale data for date formatting.
 *
 * @template CustomModifierNames
 * @template WithRange
 * @param {ReactDatePickerProps<CustomModifierNames, WithRange>} props - The props for the ReactDatePicker component.
 * @returns {JSX.Element} The date picker component with the appropriate locale registered.
 */
function DatePicker<
  CustomModifierNames extends string = never,
  WithRange extends boolean | undefined = undefined,
>(props: ReactDatePickerProps<CustomModifierNames, WithRange>): JSX.Element {
  const locale = useLocale() as locale;

  return <ReactDatePicker {...props} locale={locale} />;
}

export default DatePicker;
