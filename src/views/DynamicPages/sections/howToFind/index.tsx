import AccordionComponent from '@/components/common/custom/AccordionSSR/AccordionComponent';
import { locale } from '@/navigation';
import { dynamicPagesFAQs } from '@/services/apis/dynamicPages';
import { defaultCurrency } from '@/services/data/common';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { FlightPoint } from '@/utils/types/common/dynamicPages';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { getLocale, getTranslations } from 'next-intl/server';
import styles from './index.module.css';

interface HowToFindProps {
  origin: FlightPoint;
  destination?: FlightPoint;
  pageType: 'originOnly' | 'originDestination';
}

const HowToFind = async ({ origin, destination, pageType }: HowToFindProps) => {
  const locale = (await getLocale()) as locale;
  const t = await getTranslations();

  const currency = (await globalDataGetter('server', 'currency')) || defaultCurrency;

  const destName = destination?.name || '';
  const origName = origin?.name || '';

  const data = await dynamicPagesFAQs(currency, origin, locale, destination);

  const neededData = (() => {
    switch (pageType) {
      case 'originDestination':
        return data?.originDestination;
      case 'originOnly':
        return data?.origin;
      default:
        return null;
    }
  })();

  // originDestination accordion
  dayjs.extend(duration);
  const shortestFlightDuration =
    destination && neededData
      ? dayjs.duration(neededData?.durations?.shortest, 'minutes').asHours().toFixed(1)
      : null;

  const longestFlightDuration =
    destination && neededData
      ? dayjs.duration(neededData?.durations?.longest, 'minutes').asDays().toFixed(1)
      : null;

  const originDestinationAirlines = destination && neededData ? neededData?.airlines : [];

  const originDestinationCheapestDate =
    destination && neededData ? dayjs(neededData?.cheapestFlight?.departureDate).format('MMM') : null;

  // oridin accordion
  const cheapestOriginDate =
    pageType === 'originOnly' ? dayjs(neededData?.cheapestFlight?.departureDate).format('MMM') : '';
  const originAirlines = pageType === 'originOnly' ? neededData?.airlines : [];


  const commonQuestions = {
    howToCancelOrChange: {
      title: t('5uLDcvmKpqYuW0eI894rk'),
      content: t('HJOdyZElrTb_OsRBssGTl'),
    },
    doesPricesIncludeTaxes: {
      title: t('7S0uFiSC9hvg8YazwId2L'),
      content: t('4wqY18pSK2wZ57xl9ExHC'),
    },
    doesPricesIncludeBaggageFees: {
      title: t('x-boXYc3CsZ3p6nFbXHhY'),
      content: t('Cz-dWxPt0o5JZP2qtWdvv'),
    },
    ifFlightIsCanceled: {
      title: t('Y5mOiav1v_-UoQVLcK-xs'),
      content: {
        intro: t('McYzNL4ewq3MFhB0_0tM4'),
        ending: t('mkr07oNgtuTBlgDxYRuSd'),
        items: [
          {
            title: t('d11SUjiQVRjvXQHearpBk'),
            content: t('cn3HNjUCJQYSNmae4eZUN'),
          },
          {
            title: t('NabJkwV2Cn7z81NCy0k6L'),
            content: t('gb8mRXf8rE51ANM_QKDfd'),
          },
          {
            title: t('IvxHY6dPeEdaJJB9Rb0Fk'),
            content: t('0FIzZ3q_7qnxwy2blls-j'),
          },
          {
            title: t('MSqGlV-BYk2Zj4RDfFdBP'),
            content: t('K8a3DSRNATFXaAgExMgnx'),
          },
          {
            title: t('woraNKVLIBFwisrWvRG8G'),
            content: t('laTJZpjzprI4vwwjEY8aO'),
          },
        ],
      },
    },
  };

  const originDestinationAccordion = {
    howLong: {
      title: t('7gf-qOWlZWn75BK7pGW2a', { origin: origName, destination: destName }),
      answer: t('hRwH8hqstsOkf7sayCmEU', {
        origin: origName,
        destination: destName,
        shortestTime: shortestFlightDuration,
        longestTime: longestFlightDuration,
      }),
    },
    WhatAirlines: {
      title: t('9q24FXGNJdQhj1c_wA3Y0', { origin: origName, destination: destName }),
      answer: t('Msrhe79vMO0A5rkSIe29N', {
        origin: origName,
        destination: destName,
        airlines: originDestinationAirlines.map((airline: any) => airline.name).join(', '),
      }),
    },
    theBestTime: {
      title: t('enaKhbmSAgrx8yHJ6u59d', { origin: origName, destination: destName }),
      answer: t('EtV3wrW-BFSjmTA78wiqA', {
        origin: origName,
        destination: destName,
        month: originDestinationCheapestDate,
      }),
    },
    findTheCheapest: {
      title: t('5oVCMWiR9fW62l5Yibbyy', { origin: origName, destination: destName }),
    },
    WhatAreBaggageAllowances: {
      title: t('1zr89p3oBpxYfyLA6g0Bo', { origin: origName, destination: destName }),
      answer: t('bhVqQjBGpTm1M2oFtvPqN', { origin: origName, destination: destName }),
    },
  };

  const originAccordion = {
    theBestTime: {
      title: t('N-i7obAVOpojQAVf2TEB_', { origin: origName }),
      answer: t('wtUhIHfMVsZD0cplSRtaO', { origin: origName, month: cheapestOriginDate }),
    },
    WhatAirlines: {
      title: t('t1ZQTm6Cob7kJQ09RsMdZ', { origin: origName }),
      answer: t('Q8dFEz0sij5CD2apDxizf', {
        origin: origName,
        airlines: originAirlines?.map((airline: any) => airline.name).join(', '),
      }),
    },
    findTheCheapest: {
      title: t('scxqI30RODkp_i0mvLi4f', { origin: origName }),
    },
    WhatAreBaggageAllowances: {
      title: t('DPihdfVc-tE2HzuRXIBNi', { origin: origName }),
      answer: t('SXNeemQaRlyfm7zfnV60M', { origin: origName }),
    },
  };

  // Fixed Qs
  const findTheCheapestAnswer = {
    answer: {
      intro: t('Gqb3xlcPwKynkonFVMDFh'),
      IntroPartTwo: t('JeeVpLChKMh8VePzhVjCl'),
      items: [
        {
          title: t('-o08KdFRDg_CAmMH5qqKY'),
          content: t('FThUisapGVSzksMcLyr0j'),
        },
        {
          title: t('BkrJgr_lxw4bhN-B4c--I'),
          content: t('WwcjD56kmFK5CgQd7z_f5'),
        },
        {
          title: t('tpVVG25kYbM14a7Ux_5gf'),
          content: t('UHMrWhMXtrKqilcks0Jx6'),
        },
        {
          title: t('JC-cOwY05sB_5xFYA3tOb'),
          content: t('hAsAJA60uZGBq5nSypZIm'),
        },
        {
          title: t('79q6-egokphFIH1YJCNwB'),
          content: t('ZXfKBwZUCOiNVbSo8DM7e'),
        },
      ],
    },
  };
  const howToFindCheapestAnswer = (
    <div>
      <p>{findTheCheapestAnswer.answer.intro}</p>
      <p>{findTheCheapestAnswer.answer.IntroPartTwo}</p>
      <div className={styles.answer}>
        {findTheCheapestAnswer.answer.items.map((item, index) => (
          <p key={index}>
            <span>{item.title}</span>
            {item.content}
          </p>
        ))}
      </div>
    </div>
  );
  const howToCancelOrChange = {
    title: commonQuestions.howToCancelOrChange.title,
    content: commonQuestions.howToCancelOrChange.content,
  };

  const doesPricesIncludeTaxes = {
    title: commonQuestions.doesPricesIncludeTaxes.title,
    content: commonQuestions.doesPricesIncludeTaxes.content,
  };

  const doesPricesIncludeBaggageFees = {
    title: commonQuestions.doesPricesIncludeBaggageFees.title,
    content: commonQuestions.doesPricesIncludeBaggageFees.content,
  };

  const ifFlightIsCanceled = {
    title: commonQuestions.ifFlightIsCanceled.title,
    content: (
      <div>
        <p>{commonQuestions.ifFlightIsCanceled.content.intro}</p>
        <div className={styles.answer}>
          {commonQuestions.ifFlightIsCanceled.content.items.map((item, index) => (
            <p key={index}>
              <span>{item.title}</span>
              {item.content}
            </p>
          ))}
        </div>
        <p>{commonQuestions.ifFlightIsCanceled.content.ending}</p>
      </div>
    ),
  };

  // Qs with no data from back-end
  const originDestinationWithNoData = [
    {
      title: originDestinationAccordion.findTheCheapest.title,
      content: howToFindCheapestAnswer,
    },
    doesPricesIncludeTaxes,
    doesPricesIncludeBaggageFees,
    {
      title: originDestinationAccordion.WhatAreBaggageAllowances.title,
      content: originDestinationAccordion.WhatAreBaggageAllowances.answer,
    },
    howToCancelOrChange,
    ifFlightIsCanceled,
  ];
  const originOnlyWithNoData = [
    doesPricesIncludeTaxes,
    {
      title: originAccordion.findTheCheapest.title,
      content: howToFindCheapestAnswer,
    },
    doesPricesIncludeBaggageFees,
    {
      title: originAccordion.WhatAreBaggageAllowances.title,
      content: originAccordion.WhatAreBaggageAllowances.answer,
    },
    howToCancelOrChange,
    ifFlightIsCanceled,
  ];

  if (pageType === 'originOnly' && !origin) return;
  if (pageType === 'originDestination' && (!origin || !destination)) return;

  return (
    <div className={styles.mainContainer}>
      {destination?.name && origName && (
        <>
          <h2>{t('Y3eDITMsbF2gErMTo9sDC')}</h2>
          <h3>{t('XXdjEMHLSAFVh1VWyd5p3', { destination: destName, origin: origName })}</h3>
        </>
      )}
      {destination && pageType === 'originDestination' && (
        <AccordionComponent
          accordionArray={
            neededData
              ? [
                  {
                    title: originDestinationAccordion.howLong.title,

                    content: originDestinationAccordion.howLong.answer,
                  },
                  {
                    title: originDestinationAccordion.WhatAirlines.title,
                    content: originDestinationAccordion.WhatAirlines.answer,
                  },
                  {
                    title: originDestinationAccordion.theBestTime.title,
                    content: originDestinationAccordion.theBestTime.answer,
                  },
                  {
                    title: originDestinationAccordion.findTheCheapest.title,
                    content: howToFindCheapestAnswer,
                  },
                  doesPricesIncludeTaxes,
                  doesPricesIncludeBaggageFees,
                  {
                    title: originDestinationAccordion.WhatAreBaggageAllowances.title,
                    content: originDestinationAccordion.WhatAreBaggageAllowances.answer,
                  },
                  howToCancelOrChange,
                  ifFlightIsCanceled,
                ]
              : originDestinationWithNoData
          }
        />
      )}
      {/* // origin accordion */}
      {pageType === 'originOnly' && (
        <AccordionComponent
          accordionArray={
            neededData
              ? [
                  {
                    title: originAccordion.theBestTime.title,
                    content: originAccordion.theBestTime.answer,
                  },
                  {
                    title: originAccordion.WhatAirlines.title,
                    content: originAccordion.WhatAirlines.answer,
                  },
                  doesPricesIncludeTaxes,
                  {
                    title: originAccordion.findTheCheapest.title,
                    content: howToFindCheapestAnswer,
                  },
                  doesPricesIncludeBaggageFees,
                  {
                    title: originAccordion.WhatAreBaggageAllowances.title,
                    content: originAccordion.WhatAreBaggageAllowances.answer,
                  },
                  howToCancelOrChange,
                  ifFlightIsCanceled,
                ]
              : originOnlyWithNoData
          }
        />
      )}
    </div>
  );
};

export default HowToFind;
