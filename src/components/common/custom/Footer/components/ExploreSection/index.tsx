import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const ExploreSection = () => {
  const t = useTranslations();

  return (
    <>
      <div className="flex flex-row gap-7">
        <ul>
          <li>
            <Link href={`/cities/1`}>{t('SM2-g2lVPJ_XfAe2zoqqu')}</Link>
          </li>
          <li>
            <Link href={`/countries/1`}>{t('9hkRqd_XX3Sy-xoRXBevl')}</Link>
          </li>
          {/* <li>
            <Link href={`/airports`}>
              {airports}
            </Link>
          </li> */}
        </ul>
        <ul>
          {/* <li>
            <Link href={`/airlines`}>
              {airlines}
            </Link>
          </li> */}
          {process.env.NEXT_PUBLIC_FLIGHTS_ENABLED === 'true' && (
            <li>
              <Link href={`/last-minute-flights`}>{t('f4Y_o_qrRxXHsasCcDCXX')}</Link>
            </li>
          )}
          {process.env.NEXT_PUBLIC_TRANSFERS_ENABLED === 'true' && (
            <li>
              <Link href={`/airport-transfers`}>{t('6KtvWy7kx6ur7fmcMZboX')}</Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default ExploreSection;
