import { commonImgUrl } from '@/utils/helper/imgUrl';
import { ServerUserData } from '@/utils/helper/userData';
import Image from 'next/image';
import LinkedAccountsSection from '../linkedAccounts';
import ChangePassForm from './components/ChangePassword';
import DisplayNameForm from './components/DisplayName';
import EmailForm from './components/EmailForm';
import NameForm from './components/nameInput/NameInput';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

interface Props {
  session: any;
}

const PersonalDetails = ({ session }: Props) => {
  const t = useTranslations();

  const { firstName, lastName, displayName, userEmail } = ServerUserData(session);

  return (
    <div className={styles.container}>
      <div>
        <div>
          <h3 className={styles.heading}>{t('N4Jkv6Wdw9C-WcMPFl_sK')}</h3>
          <p className={styles.paragraph}>{t('h7au9uzb0JTTO8NMAiijQ')}</p>
        </div>
        <>
          <NameForm firstName={firstName} lastName={lastName} />
          <DisplayNameForm displayName={displayName} />
          <EmailForm email={userEmail} />
          <ChangePassForm />
        </>
        <LinkedAccountsSection />
      </div>
      <Image
        src={commonImgUrl('personal-details.svg')}
        alt={t('34UV48dNxsNMsTGi8I8NH')}
        width={350}
        height={0}
        priority
      />
    </div>
  );
};

export default PersonalDetails;
