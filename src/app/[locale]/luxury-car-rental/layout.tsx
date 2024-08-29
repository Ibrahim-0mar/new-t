import { locale } from '@/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';

export default async function CarRentalLayout({
  params: { locale },
  children,
  TopFlightSection,
}: {
  params: { locale: locale };
  children: React.ReactNode;
  TopFlightSection: React.ReactNode;
}) {
  unstable_setRequestLocale(locale);

  return (
    <div>
      {children}
      {TopFlightSection}
    </div>
  );
}
