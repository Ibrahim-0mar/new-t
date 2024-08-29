'use client';
import { FLightsFilterType } from '@/views/common/results/Flights/utils/filters';
import Button from '@/components/common/base/Button';
import { cn } from '@/utils/helper/tailwind_cn';
import { Briefcase, Luggage, Minus, Plus } from 'lucide-react';
import { Control, Controller } from 'react-hook-form';
import FilterWrapper from '../FilterWrapper';
import style from './index.module.css';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface BaggageFilter {
  control: Control<FLightsFilterType, any>;
  itineraries: any[];
  isCompleted: boolean;
}
type maxValuesState = {
  totalBaggages: number;
  totalHandBags: number;
};

const BaggageFilter = ({ control, itineraries, isCompleted }: BaggageFilter) => {
  const t = useTranslations();
  const [max, setMax] = useState<maxValuesState>({
    totalBaggages: 0,
    totalHandBags: 0,
  });

  const baggages = [
    {
      id: 0,
      name: 'totalHandBags',
      label: t('Oaf_ifQ3vUoy4AJNAD26i'),
      count: 0,
      icon: <Briefcase size={20} strokeWidth={1.3} />,
    },
    {
      id: 1,
      name: 'totalBaggages',
      label: t('26BzQ0o_5qesp576b7YXG'),
      count: 0,
      icon: <Luggage size={20} strokeWidth={1.3} />,
    },
  ];

  useEffect(() => {
    if (isCompleted) {
      itineraries.map((itinerary) => {
        if (itinerary.maxBagaggeValues.totalBaggages > max.totalBaggages) {
          setMax((prev) => {
            const updated = { ...prev };
            updated.totalBaggages = itinerary.maxBagaggeValues.totalBaggages;
            return updated;
          });
        }
        if (itinerary.maxBagaggeValues.totalHandbages > max.totalHandBags) {
          setMax((prev) => {
            const updated = { ...prev };
            updated.totalHandBags = itinerary.maxBagaggeValues.totalHandbages;
            return updated;
          });
        }
      });
    }
  }, [isCompleted]);

  return (
    <FilterWrapper title={t('4MO5HgILAmKOIISlBb4sa')}>
      {baggages.map((baggage) => (
        <Controller
          control={control}
          key={baggage.id}
          name="baggages"
          render={({ field }) => {
            return (
              <div key={baggage.id} className={cn('group', style.directLabel)}>
                <div>
                  {baggage.icon}
                  <p>{baggage.label}</p>
                </div>
                <div id="handle count">
                  <Button
                    variant="default"
                    className={style.increamentBtn}
                    onClick={() => {
                      if (field.value === 'all') {
                        const fieldArray = [0, 0];
                        fieldArray[baggage.id] -= 1;
                        field.onChange(fieldArray);
                      } else if (Array.isArray(field.value)) {
                        const fieldArray = [...field.value];
                        fieldArray[baggage.id] -= 1;
                        field.onChange(fieldArray);
                      }
                    }}
                    disabled={field.value[baggage.id] === 0 || field.value === 'all'}
                  >
                    <Minus size={18} strokeWidth={3} className={style.actionIcon} />
                  </Button>
                  <span className={style.countText}>
                    {field.value === 'all' ? 0 : field.value[baggage.id]}
                  </span>
                  <Button
                    variant="default"
                    className={style.increamentBtn}
                    onClick={() => {
                      if (field.value === 'all') {
                        const fieldArray = [0, 0];
                        fieldArray[baggage.id] += 1;
                        field.onChange(fieldArray);
                      } else if (Array.isArray(field.value)) {
                        const fieldArray = [...field.value];
                        fieldArray[baggage.id] += 1;
                        field.onChange(fieldArray);
                      }
                    }}
                    disabled={
                      !isCompleted ||
                      (Array.isArray(field.value)
                        ? field.value[baggage.id] === max[baggage.name as keyof maxValuesState]
                        : false)
                    }
                  >
                    <Plus size={18} strokeWidth={3} className={style.actionIcon} />
                  </Button>
                </div>
              </div>
            );
          }}
        />
      ))}
    </FilterWrapper>
  );
};

export default BaggageFilter;
