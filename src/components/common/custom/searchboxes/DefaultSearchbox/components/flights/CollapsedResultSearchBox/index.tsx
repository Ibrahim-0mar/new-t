import { Skeleton } from '@/components/common/base/Skeleton';
import { soloAdvertiserSchema } from '@/utils/schemas/common';
import { ChevronDown } from 'lucide-react';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { UseFormGetValues } from 'react-hook-form';
import { multiCitySearchType } from '../FlightsSearch';
import { useTranslations } from 'next-intl';
import FormatDate from '@/utils/helper/FormatDateComponent';

interface Props {
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  getValues: UseFormGetValues<multiCitySearchType>;
}

const CollapsedResultSearchBox: React.FC<Props> = ({ setCollapsed, getValues }) => {
  const t = useTranslations();

  const [loaded, setLoaded] = useState<boolean>(false);
  const formValues = getValues();
  const { trips, tripType, passengers, cabin } = formValues;
  const totalPassengers = passengers.reduce((acc, cur) => acc + cur, 0);
  const firstTrip = trips[0];
  const lastTrip = trips[trips.length - 1];

  useEffect(() => {
    const validateFormValues = async () => {
      await soloAdvertiserSchema
        .validate(formValues)
        .then(() =>
          setTimeout(() => {
            setLoaded(true);
          }, 1100),
        )
        .catch(() => setLoaded(false));
    };
    validateFormValues();
  }, [formValues]);

  if (!loaded) {
    return (
      <div className="mb-2 px-4">
        <Skeleton className="h-[90px] w-full" animate />
      </div>
    );
  }

  return (
    <section className="px-3">
      <button
        className="mb-2 flex w-full cursor-pointer items-start justify-between rounded-md bg-secondary p-2 shadow focus:bg-[#e8f4f8]"
        aria-label={t('8zFGnZwKqf45I9DAIvDaQ')}
        onClick={() => setCollapsed(false)}
      >
        <div>
          <div className="flex items-start justify-start gap-3 text-xl font-medium">
            {tripType === 'multi-city' ? (
              <>
                <p>{firstTrip?.origin[0]?.code}</p>
                <span>-</span>
                <p>{lastTrip?.destination[0]?.code}</p>
              </>
            ) : (
              <>
                <p>{trips[0]?.origin[0]?.code}</p> <span>-</span>
                <p>{trips[0]?.destination[0]?.code}</p>
              </>
            )}
          </div>

          <div className="flex items-start justify-start gap-1.5 text-lg font-medium capitalize text-primary">
            <p>{tripType}</p>
            <span>.</span>
            <p>
              {totalPassengers} {totalPassengers === 1 ? 'Traveler' : 'Travelers'}
            </p>

            <span>.</span>
            <p>{cabin?.title}</p>
          </div>
          {/* ddd MM/DD */}
          <div className="text-start text-lg font-medium">
            {tripType === 'one-way' ? (
              <p>
                <FormatDate
                  date={trips[0].date[0]}
                  additionalFormats={{
                    month: '2-digit',
                    day: '2-digit',
                  }}
                />
              </p>
            ) : tripType === 'round-trip' ? (
              <p>
                {trips[0].date.map((date, index) => {
                  return (
                    <Fragment key={index}>
                      <FormatDate
                        date={date!}
                        additionalFormats={{
                          month: '2-digit',
                          day: '2-digit',
                        }}
                      />

                      {index === 0 && trips[0].date.length > 0 && <span className="px-1"> - </span>}
                    </Fragment>
                  );
                })}
              </p>
            ) : (
              <p>
                <FormatDate
                  range
                  date={firstTrip.date[0]}
                  endDate={lastTrip.date[0]}
                  additionalFormats={{
                    month: '2-digit',
                    day: '2-digit',
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

export default CollapsedResultSearchBox;
