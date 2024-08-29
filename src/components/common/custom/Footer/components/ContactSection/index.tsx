import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const ContactSection = () => {
  const t = useTranslations();

  return (
    <>
      <ul>
        <li>
          <Link href={`/faq`}>{t('OuCM8PJgmnj7IvRBUE1M4')}</Link>
        </li>
        <li>
          <Link href={`/contact-us`}>{t('gLApj2fOg5jA-HhD-_LSu')}</Link>
        </li>
      </ul>
    </>
  );
};

export default ContactSection;
