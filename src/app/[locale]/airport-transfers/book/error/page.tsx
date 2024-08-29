import { locale } from '@/navigation';
import RedirectError from '@/views/flights/book/RedirectError';
import { unstable_setRequestLocale } from 'next-intl/server';

const RedirectErrorPage = ({ params: { locale } }: { params: { locale: locale } }) => {
  unstable_setRequestLocale(locale);

  return <RedirectError />;
};

export default RedirectErrorPage;
