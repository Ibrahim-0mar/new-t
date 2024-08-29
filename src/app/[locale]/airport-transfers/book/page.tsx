import { locale } from '@/navigation';
import Redirect from '@/views/airport-transfers/book/Redirect';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

const RedirectPage = ({ params: { locale } }: { params: { locale: locale } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  const content = {
    header: t('yZ6Pg1FItgAut393Qcrkw'),
    subHeader: t('KX_j3qTHcYT03J_qNpoVI'),
    ticketDetails: t('g3mLcTaVOnq-ZkXISF3Ui'),
    passengers: t('oobk_1zhw-vTktD6yHDiL'),
  };

  return <Redirect translationContent={content} />;
};

export default RedirectPage;
