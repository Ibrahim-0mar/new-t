import BackToHomePage from '@/components/common/custom/BackToHomePage';
import { locale } from '@/navigation';
import ProfilePageWrapper from '@/views/Profile/components/profilePageWrapper';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

const RecentSearchesPage = ({ params: { locale } }: { params: { locale: locale } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  return (
    <ProfilePageWrapper
      BackToHomeComponent={
        <BackToHomePage className="w-[80%]" currentRoute={t('VDXKyoaKmqvZR9gMW9Stm')} />
      }
    >
      <></>
    </ProfilePageWrapper>
  );
};

export default RecentSearchesPage;
