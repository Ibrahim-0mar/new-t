import FormatDate from '@/utils/helper/FormatDateComponent';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction } from 'react';
import { UseFormGetValues } from 'react-hook-form';

interface Props {
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  getValues: UseFormGetValues<{
    passengers: number[];
    tripType: string;
    pickup: any[];
    dropoff: any[];
    pickupDate: Date;
    returnDate: Date;
  }>;
}

const CollapsedAirportSearchBox: React.FC<Props> = ({ setCollapsed, getValues }) => {
  const t = useTranslations();

  const formValues = getValues();
  const { pickup, dropoff, tripType, passengers, pickupDate, returnDate } = formValues;
  const totalPassengers = passengers.reduce((acc, cur) => acc + cur, 0);

  return (
    <section className="px-3">
      <button
        className="mb-2 flex w-full cursor-pointer items-start justify-between rounded-md bg-secondary p-2 shadow focus:bg-[#e8f4f8]"
        aria-label={t('8zFGnZwKqf45I9DAIvDaQ')}
        onClick={() => setCollapsed(false)}
      >
        <div>
          <div className="flex items-start justify-start gap-3 text-base font-medium">
            <p>{pickup[0]?.terms[0]?.value.substring(0, 20) + '...'}</p>
            <span>-</span>
            <p>{dropoff[0]?.terms[0]?.value.substring(0, 20) + '...'}</p>
          </div>

          <div className="flex items-start justify-start gap-1 text-sm font-medium capitalize text-primary">
            <p>{tripType}</p>
            <span>.</span>
            <p>
              {totalPassengers} {totalPassengers === 1 ? 'Traveler' : 'Travelers'}
            </p>
          </div>

          <div className="text-start text-lg font-medium">
            {tripType === 'one-way' ? (
              <p>
                <FormatDate
                  date={pickupDate}
                  replaceFormatWith={{
                    weekday: 'short',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: '2-digit',
                  }}
                />
              </p>
            ) : (
              <p>
                <FormatDate
                  date={pickupDate}
                  replaceFormatWith={{
                    weekday: 'short',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: '2-digit',
                  }}
                />
                <FormatDate
                  range
                  date={pickupDate}
                  endDate={returnDate}
                  replaceFormatWith={{
                    weekday: 'short',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: '2-digit',
                  }}
                />
              </p>
            )}
          </div>
        </div>
        <ChevronDown color="#0a425c" />
      </button>
    </section>
  );
};

export default CollapsedAirportSearchBox;
