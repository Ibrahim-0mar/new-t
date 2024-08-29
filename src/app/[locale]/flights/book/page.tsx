import { locale } from '@/navigation';
import Redirect from '@/views/flights/book/Redirect';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

const RedirectPage = ({ params: { locale } }: { params: { locale: locale } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  const content = {
    ticketDetails: t('g3mLcTaVOnq-ZkXISF3Ui'),
    cabinClasses: {
      premium: t('ipLZ1siuRxhwd2x_8Efz_'),
      Economy: t('rIiR0JqFJCgXghbVz0mzU'),
      First: t('RrBK4H0j7VFtqE--5wdbQ'),
      Business: t('YPnMS1LA9yFxZ-uUkc91l'),
    },
  };

  return <Redirect translationContent={content} />;
};

export default RedirectPage;
