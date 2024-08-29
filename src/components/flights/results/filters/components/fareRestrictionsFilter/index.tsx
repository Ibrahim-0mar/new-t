// 'use client';
// import { FLightsFilterType } from '@/views/common/results/Flights/utils/filters';
// import { useTranslations } from 'next-intl';
// import { Control, Controller } from 'react-hook-form';
// import style from './index.module.css';
// import Checkbox from '@/components/common/base/CheckBox';
// import FilterWrapper from '../FilterWrapper';
// import { cn } from '@/utils/helper/tailwind_cn';
// import Button from '@/components/common/base/Button';
// import FormatPrice from '@/utils/helper/FormatPriceComponent';

// interface StopsFilterProps {
//   control: Control<FLightsFilterType, any>;
//   currency: string;
//   itineraries: any[];
// }

// type Itinerary = {
//   minPrice: number;
//   maxBagaggeValues: FlightBaggageAllowance;
//   availableRestrictions: Restrictions;
//   pricingOptions: any;
//   legs: TransformedLegType[];
//   duration: number;
//   id: string;
//   isFavorite: boolean;
// };

// const FareRestrictionsFilter = ({ control, currency, itineraries }: StopsFilterProps) => {
//   const t = useTranslations();

//   const cheapestRefundable = itineraries.find(
//     (itinerary: Itinerary) => itinerary.availableRestrictions.refundable,
//   );
//   const cheapestChangePenalties = itineraries.find(
//     (itinerary: Itinerary) => itinerary.availableRestrictions.changePenalties,
//   );
//   const cheapestChangable = itineraries.find(
//     (itinerary: Itinerary) => itinerary.availableRestrictions.changable,
//   );

//   const fareRestrictions = [
//     {
//       id: 'refundable',
//       label: t('kc2FkjjrY5B66cGyR3E-5'),
//       price: typeof cheapestRefundable != 'undefined' ? cheapestRefundable?.minPrice : '',
//     },
//     {
//       id: 'changePenalties',
//       label: t('oz1dSB6GhoK6C7WMYyUy8'),
//       price: typeof cheapestChangePenalties != 'undefined' ? cheapestChangePenalties?.minPrice : '',
//     },
//     {
//       id: 'changable',
//       label: t('HcrRo46iAurAibI_ESF6E'),
//       price: typeof cheapestChangable != 'undefined' ? cheapestChangable?.minPrice : '',
//     },
//   ];

//   const handleChange = (e: any, field: any, fareId: string) => {
//     const { checked } = e.target;
//     const { value, onChange } = field;
  
//     const updateField = (newValues: any[]) => {
//       onChange(newValues);
//     };
  
//     if (checked) {
//       if (!value?.includes(fareId)) {
//         updateField([...value, fareId]);
//       }
//     } else {
//       if (value === 'all') {
//         const all = fareRestrictions
//         .filter(fare => fare.price)
//         .map(fare => fare.id);

//         const newValues = all.filter((item) => item !== fareId);
//         updateField(newValues);
//       } else {
//         const newValues = value.filter((item: any) => item !== fareId);
//         updateField(newValues);
//       }
//     }
//   };

  
//   return null
//   // return (
//   //   <FilterWrapper title={'Fare Restrictions'}>
//   //     {fareRestrictions.map((fare) => (
//   //       <Controller
//   //         control={control}
//   //         key={fare.id}
//   //         name="fareRestrictions"
//   //         render={({ field }) => {
//   //           return (
//   //             <label key={fare.id} htmlFor={fare.label} className={cn('group', style.directLabel)}>
//   //               <div>
//   //                 <Checkbox
//   //                   id={fare.label}
//   //                   checked={field.value !== 'all' ? field.value?.includes(fare.id) : !!fare.price}
//   //                   disabled={fare.price === ''}
//   //                   onChange={(e) => handleChange(e, field, fare.id)}
//   //                 />
//   //                 <p>{fare.label}</p>
//   //                 {fare.price != '' && (
//   //                   <Button
//   //                     variant="default"
//   //                     className={cn('group-hover:inline-block', style.onlyButton)}
//   //                     onClick={() => field.onChange([fare.id])}
//   //                   >
//   //                     <p>{t('cG-Vrany7RacX0sC_eHJH')}</p>
//   //                   </Button>
//   //                 )}
//   //               </div>
//   //               <p>
//   //                 {fare.price === '' ? (
//   //                   ''
//   //                 ) : (
//   //                   <FormatPrice price={Number(fare.price)} currency={currency} />
//   //                 )}
//   //               </p>
//   //             </label>
//   //           );
//   //         }}
//   //       />
//   //     ))}
//   //   </FilterWrapper>
//   // );
// };

// export default FareRestrictionsFilter;
