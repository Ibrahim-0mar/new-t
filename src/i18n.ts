import { getRequestConfig } from 'next-intl/server';
import { locales } from './navigation';
import deepmerge from 'deepmerge';
import { cookies } from 'next/headers';

export default getRequestConfig(async ({ locale }) => {
  // If the given locale is not one of the provided locales, use the english messages.
  if (!locales.includes(locale as any)) {
    return {
      messages: (await import(`../messages/en.json`)).default,
    };
  }

  // Provide English messages as a fallback if any message in the current locale is not present or translated yet.
  const fallbackMessages = (await import(`../messages/en.json`)).default;
  const localeMessages = (await import(`../messages/${locale}.json`)).default;
  const messages = deepmerge(fallbackMessages, localeMessages);

  const timezoneCookie = cookies().get('timezone')?.value;

  return {
    timeZone: timezoneCookie || 'UTC',
    messages: messages,
  };
});
