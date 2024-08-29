import { authOptions } from '@/app/api/auth/authOptions';
import Container from '@/components/common/base/Container';
import { ServerUserData } from '@/utils/helper/userData';
import ProfileNav from '@/views/Profile/components/profileNav';
import { getServerSession } from 'next-auth';
import UserProfileImage from './components/userProfileImage';
import styles from './index.module.css';
import { getTranslations } from 'next-intl/server';

const UserDetails = async () => {
  const t = await getTranslations();

  const session = await getServerSession(authOptions);
  const {
    avatarUrl,
    userEmail,
    //  mainAirport,
    token,
    firstName,
  } = ServerUserData(session);

  const navLinks = {
    myProfile: t('khjz5DcJ7vq-TjyFlFO75'),
    recentSearches: t('MrKYPR-iv0wZUsBQzcwDZ'),
    favorites: t('28e48lqjgZ7KnOjd5LSfw'),
  };

  return (
    <Container>
      <div className={styles.summaryContainer}>
        <div className={styles.leftSide}>
          <h1>{t('dmYrdRjZnPQx0RpERfhRu', { name: firstName })}</h1>
          <div>
            <div>
              <h3>{t('0SZ4X1oqtVn71cgMTTTqm')}</h3>
              <span>{userEmail}</span>
            </div>
          </div>
          <ProfileNav translation={navLinks} />
        </div>
        <UserProfileImage avatarUrl={avatarUrl} token={token} />
      </div>
    </Container>
  );
};

export default UserDetails;
