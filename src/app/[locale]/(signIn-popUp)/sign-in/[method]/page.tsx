import { authOptions } from '@/app/api/auth/authOptions';
import LoadingSpinner from '@/components/common/base/LoadingSpinner';
import PopUpWindow from '@/components/common/custom/PopUpWindow';
import { locale } from '@/navigation';
import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';

interface props {
  params: {
    locale: locale;
    method: string;
  };
}

const page = async ({ params: { method } }: props) => {
  const session = await getServerSession(authOptions);

  const t = await getTranslations();

  return (
    <PopUpWindow session={session} method={method}>
      {session ? (
        <h1 className="text-2xl font-medium text-primary">{t('0TnxJzfRDal-fXkNutvXN')}</h1>
      ) : (
        <LoadingSpinner />
      )}
    </PopUpWindow>
  );
};

export default page;
