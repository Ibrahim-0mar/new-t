import BackToHomePage from '@/components/common/custom/BackToHomePage/index';

import NotFoundPage from '@/views/404';
import { useTranslations } from 'next-intl';

const NotFound = () => {
  const t = useTranslations();

  return (
    <>
      <BackToHomePage currentRoute={t('QoCB1C9lGM3xYQYf4J2Zm')} />
      <NotFoundPage />
    </>
  );
};

export default NotFound;
