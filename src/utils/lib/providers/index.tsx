import AuthProvider from '@/utils/lib/providers/nextAuthProvider/AuthProvider';
import { NextIntlClientProvider, useLocale, useMessages, useNow, useTimeZone } from 'next-intl';
import RecaptchaAppProvider from './RecaptchaProvider';
import RegionProvider from './RegionProvider/RegionProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const messages = useMessages();
  const locale = useLocale();
  const now = useNow();
  const timezone = useTimeZone();

  return (
    <>
      <NextIntlClientProvider messages={messages} locale={locale} now={now} timeZone={timezone}>
        <RecaptchaAppProvider>
          <AuthProvider>
            <RegionProvider>
              {children}
            </RegionProvider>
            </AuthProvider>
        </RecaptchaAppProvider>
      </NextIntlClientProvider>
    </>
  );
};

export default Providers;
