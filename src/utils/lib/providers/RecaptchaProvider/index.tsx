'use client';
import { ReCaptchaProvider } from 'next-recaptcha-v3';

const RecaptchaAppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReCaptchaProvider
      async
      strategy="lazyOnload"
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    >
      {children}
    </ReCaptchaProvider>
  );
};

export default RecaptchaAppProvider;
