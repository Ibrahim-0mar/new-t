import LoadingSpinner from '@/components/common/base/LoadingSpinner';
import { locale } from '@/navigation';
import { cheapestTicketApi } from '@/services/apis/dynamicPages';
import { defaultCurrency, defaultLanguage } from '@/services/data/common';
import { languagesMap } from '@/services/data/languages';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { cn } from '@/utils/helper/tailwind_cn';
import { DynamicPageSectionProps } from '@/utils/types/common/dynamicPages';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import DealCard from '../../components/dealCard';
import styles from './index.module.css';

const CheapestTicket = async ({ origin, destination }: DynamicPageSectionProps) => {
  const locale = (await getLocale()) as locale;
  const t = await getTranslations();

  const currency = (await globalDataGetter('server', 'currency')) || defaultCurrency;

  const language = languagesMap.find((l) => l.code === locale) || defaultLanguage;

  const data = await cheapestTicketApi(origin, destination, currency, locale, language);
  const firstTwo = data?.slice(0, 2);

  const restData = data?.slice(2);

  if (origin?.code === null) return <LoadingSpinner />;
  if (data?.length === 0) return null;

  return (
    <div className="my-10">
      <input id="showMore" type="checkbox" className="peer hidden" />
      <div className={styles.dealsContainer}>
        {firstTwo.map((ticket, index) => (
          <DealCard key={index} ticket={{...ticket, currency:currency?.code}} />
        ))}
      </div>
      <div
        className={cn(
          styles.moreDealsContainer,
          'max-md:peer-checked:!flex max-md:peer-checked:!flex-col md:peer-checked:grid',
        )}
      >
        {restData.map((ticket, index) => (
          <DealCard key={index} ticket={{...ticket, currency:currency?.code}} />
        ))}
      </div>
      <label htmlFor="showMore" className={cn(styles.moreDeals, 'peer-checked:hidden')}>
        {t('QGLgj48HgdrW0RYEX-fUE')} <ChevronDown size={20} className="mt-1" />
      </label>
      <label htmlFor="showMore" className={cn(styles.lessDeals, 'peer-checked:flex')}>
        {t('p50O4Jh6MF1VfwL26gHR7')} <ChevronUp size={20} className="mt-1" />
      </label>
    </div>
  );
};

export default CheapestTicket;
