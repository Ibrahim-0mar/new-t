import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const CompanySection = () => {
  const t = useTranslations();

  return (
    <>
      <ul>
        <li>
          <Link href={`/about-us`}>{t('iOHulH36Lqb9DaeTwUHU7')}</Link>
        </li>
        <li>
          <Link href={`/how-travolic-works`}>{t('P7EEc4EK2fToltk0GaiUj')}</Link>
        </li>
        <li>
          <Link href={`/career`}>{t('lityphNIGOWu-erYxEfBe')}</Link>
        </li>
        {process.env.NEXT_PUBLIC_BLOGS_ENABLED === 'true' && (
          <li>
            <Link href={`/blogs`}>{t('v_JZbLmurs_4DoHfG4idr')}</Link>
          </li>
        )}
        <li>
          <Link href="/best-app-for-booking-flights-hotels">{t('ShW-qbPRSevhoFjHZt0Nl')}</Link>
        </li>
      </ul>
    </>
  );
};

export default CompanySection;
