import { flightInformations } from '@/services/apis/dynamicPages';
import { defaultCurrency } from '@/services/data/common';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { DynamicPageSectionProps } from '@/utils/types/common/dynamicPages';
import { Award, CalendarDays, Plane, Ticket } from 'lucide-react';
import InformationItem from '../../components/informationItem';
import styles from './index.module.css';
import { getLocale, getTranslations } from 'next-intl/server';
import { locale } from '@/navigation';
import FormatPrice from '@/utils/helper/FormatPriceComponent';
import FormatDate from '@/utils/helper/FormatDateComponent';

const FlightInformations = async ({ origin, destination }: DynamicPageSectionProps) => {
  const [t, locale, currency] = await Promise.all([
    getTranslations(),
    getLocale() as Promise<locale>,
    globalDataGetter('server', 'currency')
      .then((currency: any) => currency ?? defaultCurrency)
      .catch(() => defaultCurrency),
  ]);


  const data = await flightInformations(origin, destination, currency, locale);

  if (data === null) return;

  return (
    <div>
      <h2 className={styles.heading}>
        {t('xj74Co0Z1ZZLYkTH-vyAo', { origin: origin?.name, destination: destination?.name })}
      </h2>
      <div className={styles.informationsContainer}>
        <InformationItem
          title={t('mc2tbhccFgCXHokzk1hm3')}
          value={<FormatPrice price={Number(data.Price)} currency={currency?.code} />}
        >
          <Ticket />
        </InformationItem>
        <InformationItem
          title={t('mguKgWOtd6L6zaJ2TcOAf')}
          value={
            <FormatDate
              date={new Date(`9999, 1, ${data?.CheapestMonth}`)}
              replaceFormatWith={{
                month: 'long',
              }}
            />
          }
        >
          <CalendarDays />
        </InformationItem>
        <InformationItem title={t('Ol64QXYlrxaizJPSd00GA')} value={data?.AirlineName}>
          <Award />
        </InformationItem>
        <InformationItem
          title={t('3Me2cNTbDC_o5WxM6GXtw')}
          value={data?.FlightPerWeekCount?.toString()}
        >
          <Plane />
        </InformationItem>
      </div>
    </div>
  );
};

export default FlightInformations;
