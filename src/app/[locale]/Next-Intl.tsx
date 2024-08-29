/*
  ################### This component will be used by us, developer, as a reference to Next-Intl usage ###################

* Next-Intl advise:
  If you work with translators, it can be helpful for them to use an editor
  that supports the ICU syntax for dates and times (e.g. the Crowdin Editor).

# ======================================================== Hooks ========================================================
* useTranslations(key: string): translation<{}>                           => Client Components / Non-Async Server Components
  ? getTranslations(key: string): Promise<translation<{}>>                => Async Server Components
  Used to get the translations for a specific key.

* useMessages(): messages<{}>                                             => Client Components / Non-Async Server Components
  ? getMessages(): Promise<messages<{}>>                                  => Async Server Components
  Used to ALL the translations there are in the app.

* useLocale(): locale<string>                                             => Client Components / Non-Async Server Components
  ? getLocale(): Promise<locale<string>>                                  => Async Server Components
  Used to get the current application locale.

* useFormatter(): Formatter<FormatterProperties>                          => Client Components / Non-Async Server Components
  ? getFormatter(): Promise<Formatter<FormatterProperties>>               => Async Server Components
  Used to get the formatter that formats dates, times, numbers and lists based on the current locale.

* useNow(): Date<DateObject>                                              => Client Components / Non-Async Server Components
  ? getNow(): Promise<Date<DateObject>>                                   => Async Server Components
  Used to get the `now` date that's specified manually in the global configuration. This date is usually used for comparsions.

* useTimezone(): Timezone<string>                                         => Client Components / Non-Async Server Components
  ? getTimezone(): Promise<Timezone<string>>                              => Async Server Components
  Used to get the timezone of the app. Timezone defaults to the locale, and can be globally configured in the i18n.ts file.

# ======================================================= Messages =======================================================
* Static values
    "message": "Welcome to our website!"
  t('message')                         // Values can be alphanumeric and underscores, else NO!

* Dynamic values
  "message": "Hello, {name}!"
  t('message', { name: 'Muhammad' })

! Cardinal pluralization (Not Recommended, bad for Arabic)
  "message": "You have {count, plural, =0 {no followers yet} =1 {one follower} other {# followers}}."
  "message": "{count, plural, =0 {ليس لديك متابعون} 1= {لديك متابع واحد} 2= {لديك متابعان} 3= other {# متابعون}}."
  t('message', { count: 3580 }); // "You have 3,580 followers." - "لديك 3,580 متابعون"

* Ordinal pluralization (Recommended)
  "message": "It's your {year, selectordinal, one {#st} two {#nd} few {#rd} other {#th}} birthday!"
  "message": "حل يوم ميلادك {year, selectordinal, one {الأول} two {الثاني} other {الـ#}}!"
  t('message', { year: 3 }) // "It's your 3rd birthday!" - "حل يوم ميلادك الـ3!"

  ? These tags are supported in Ordinal pluralization:
  - zero: For languages with zero-item grammar (e.g., Latvian, Welsh).
  - one: For languages with singular-item grammar (e.g., English, German).
  - two: For languages with dual-item grammar (e.g., Arabic, Welsh).
  - few: For languages with grammar specific to a small number of items (e.g., Arabic, Polish, Croatian).
  - many: For languages with grammar specific to a larger number of items (e.g., Arabic, Polish, Croatian).
  - other: Used when the value doesn't match other plural categories.
  TODO => PLEASE REVIEW THE PLURAL RULES FOR ARABIC VIA: https://www.unicode.org/cldr/charts/43/supplemental/language_plural_rules.html

* Enum-based values (Recommended)
  "message": "{gender, select, female {She} male {He} other {They}} is online."
  "message": "{gender, select, female {هي متصلة} male {هو متصل} other {هم متصلون}}"
  t('message', { gender: 'female' }); // "She is online."  - "هي متصلة"

* Escaping {} => '
	"message": "My name is '{Ali'}"    =>    My name is {Ali}

* Rich text is supported.
  "message": "Please refer to <guidelines>the guidelines</guidelines>."
  t.rich('message', {
    guidelines: (chunks) => <a href="/guidelines">{chunks}</a>
  });

* HTML Markup is supported
  "message": "This is <important>important</important>"
  t.markup('message', {
    important: (chunks) => `<b>${chunks}</b>`
  });

  TODO => READ MORE IN DOCS REGARDING THESE TWO TOPICS: https://next-intl-docs.vercel.app/docs/usage/messages#rich-text

TODO => If there's more than 1 language that's RTL, you can install `rtl-detect` and use `getLangDir(locale)`

# ======================================================== Numbers ========================================================
function Component() {
  const format = useFormatter();

  format.number(499.9, { style: 'currency', currency: 'USD' });        / Renders "$499.90"

  In case of locale === 'ar:
  format.number(499.9, { style: 'currency', currency: 'EGP' });        / Renders "499.90 ج.م."
}

* Custom number formats
  "priceMessage": "This product costs {price, number, currency}"
  t('priceMessage', { price: 32000.99 }, { number: { currency: { style: 'currency', currency: 'EUR' } } });     / Can be configured globally

# ====================================================== Dates & Times ====================================================
function Component() {
  const format = useFormatter();
  const date = new Date('2020-11-20T10:36:01.516Z');

  format.dateTime(date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });                    / Renders "Nov 20, 2020"

  format.dateTime(date, { hour: 'numeric', minute: 'numeric' });    / Renders "11:36 AM"
}

* Formatting relative times
  format.relativeTime(date);      / At 2020-11-20T10:36:00.000Z, this will render "4 Years ago"

  / Use global now value,
  / … and update it every 10 seconds

  const now = useNow({
    updateInterval: 1000 * 10
  });

  format.relativeTime(dateTime, now);


  format.relativeTime(dateTime, { now, unit: 'day' });      / Renders "732 days ago"

* Range
  format.dateTimeRange(dateTimeA, dateTimeB, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });                            / Renders "Nov 20, 2020 – Jan 24, 2021"

* Within messages
  "ordered": "Ordered on {orderDate, date, medium}"

  "ordered": "Ordered on {orderDate, date, ::yyyyMMMd}" / Renders e.g. "Ordered on Jul 9, 2024"

  ? <<<<<<<<<<<<<<<<<<<<<<<<<< All configrations Can be configured globally >>>>>>>>>>>>>>>>>>>>>>>>>>

# ========================================================== Lists ========================================================
const format = useFormatter();
const items = ['HTML', 'CSS', 'JavaScript'];

* format.list(items, {type: 'conjunction'});             / Renders "HTML, CSS, and JavaScript"

* format.list(items, {type: 'disjunction'});             / Renders "HTML, CSS, or JavaScript"

# =================================================== Global Configuration =================================================
/ i18n.ts
export default getRequestConfig(async ({locale}) => {
  / ...

  return {
      / Defaults to the Server timezone
      / The time zone can either be statically defined, read from the
      / user profile if you store such a setting, or based on dynamic
      / request information like the locale or a cookie.
    timeZone: 'Europe/Vienna',

      / This is the default, a single date instance will be
      / used by all Server Components to ensure consistency.
      / Tip: This value can be mocked to a constant value
      / for consistent results in end-to-end-tests.
    now: new Date(),

	formats: {
      dateTime: {
        short: {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }
      },
      number: {
        precise: {
          maximumFractionDigits: 5
        }
      },
      list: {
        enumeration: {
          style: 'long',
          type: 'conjunction'
        }
      }
    },
  };

  format.dateTime(new Date('2020-11-20T10:36:01.516Z'), 'short');
	format.number(47.414329182, 'precise');
  format.list(['HTML', 'CSS', 'JavaScript'], 'enumeration');

	"ordered": "You've ordered this product on {orderDate, date, short}",
	"latitude": "Latitude: {latitude, number, precise}"
	t('ordered', {orderDate: new Date('2020-11-20T10:36:01.516Z')});
	t('latitude', {latitude: 47.414329182});

  TODO => Error Handling: https://next-intl-docs.vercel.app/docs/usage/configuration#error-handling
});

# =========================================== Server, Shared & Client Components ============================================
* Difference between Server (async), Shared (Server/Client) & Client components
  useTranslations / await getTranslations
  TODO => See the difference via: https://next-intl-docs.vercel.app/docs/environments/server-client-components#async-components

# ================================================= NextIntlClientProvider ==================================================
NextIntlClientProvider Allows usage of useTranslations, useFormatter, etc... for client components,
and it inherits the configs from the parent server component, so in case of wrapped inside a client, a configs must be provided to it.

# =================================================== Manifest & Sitemaps ===================================================
TODO => Manifest and Sitemaps should be viewed via: https://next-intl-docs.vercel.app/docs/environments/metadata-route-handlers

# ================================================ Middleware and Navigation ================================================
* Navigation must be done using the <Link> / useRouter component provided from next-intl in the navigation.ts file.
  => Note that all hooks and components exported from `navigation.ts` MUST be used instead of the Next.js'
    ! SO PLEASE VIEW THE `navigation.ts` FILE. location: `src/navitation.ts` !!!!!!!!!!!!!!!!!
  ? examples:
      Declarative:
        import { Link } from '@/navigation';

        <Link href='/'>Homepage</Link>                  / Will navigation to homepage
        <Link href='/' locale='fr'>Homepage</Link>      / Will switch the app locale to `fr` and navigate to homepage

      Imperative: (Programmatic navigation)
        import { useRouter } from '@/navigation';

        const router = useRouter();
        router.replace('/');                          / Will navigation to homepage
        router.replace('/', { locale: 'fr' });        / Will switch the app locale to `fr` and navigate to homepage

* Middleware setup has already been done, but you can view the DOCS for more information about setting up next-intl.

  TODO => More on middleware setup via: https://next-intl-docs.vercel.app/docs/routing/middleware
  TODO => More on navigation via: https://next-intl-docs.vercel.app/docs/routing/navigation
*/

import { useFormatter, useTranslations } from 'next-intl';

function NextIntl() {
  const t = useTranslations();
  const format = useFormatter();

  const date = new Date('2020-11-20T10:36:01.516Z');
  const now = new Date('2022-11-20T10:36:01.516Z');
  const dateTimeA = new Date('2020-11-20T08:30:00.000Z');
  const dateTimeB = new Date('2021-01-24T08:30:00.000Z');
  const items = ['HTML', 'CSS', 'JavaScript'];

  return (
    <>
      <div className="mb-12 mt-24 flex flex-col gap-4 text-center text-2xl font-semibold text-green-600">
        <p>{t('xy0UbQA4sWPN2s98VrEKy')}</p>
        <p>{t('vR9PT276E3NGubWLdkbeh', { name: 'Muhammad' })}</p>
        {/* The following is not an appropriate format in Arabic, so don't use it */}
        {/* <p>{t('LD5L2vYWqzHCN7xgSU9yX', { count: 2 })}</p> */}
        <p>{t('gnZgm52bdJYDjwitwzwGf', { age: 2 })}</p>
        <p>{t('GmZe98IIbew2Vxp7ABO3o', { gender: 'male' })}</p>
      </div>

      <div className="mb-12 flex flex-col gap-4 text-center text-2xl font-semibold text-orange-500">
        <p>
          {t(
            'ZOqTr33Bs_e2N0czt3mTF',
            { price: 499.9 },
            { number: { currency: { style: 'currency', currency: 'USD' } } },
          )}
        </p>
      </div>

      <div className="mb-12 flex flex-col gap-4 text-center text-2xl font-semibold text-blue-600">
        <p>{format.dateTime(date, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
        <p>{format.dateTime(date, { hour: 'numeric', minute: 'numeric' })}</p>
        <p>{format.relativeTime(date)}</p>
        <p>{format.relativeTime(date, now)}</p>
        <p>{format.relativeTime(date, { now, unit: 'day' })}</p>
        <p>
          {format.dateTimeRange(dateTimeA, dateTimeB, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="mb-12 flex flex-col gap-4 text-center text-2xl font-semibold text-rose-600">
        <p>{format.list(items, { type: 'conjunction' })}</p>
        <p>{format.list(items, { type: 'disjunction' })}</p>
      </div>

      <p className=" text-center text-2xl font-semibold text-indigo-300">
        {t('yDVYBgOhd2MoLY8KvJCtq')}
      </p>
    </>
  );
}

export default NextIntl;
