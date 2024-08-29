'use client';
import { cn } from '@/utils/helper/tailwind_cn';
import styles from './index.module.css';
import { Link, usePathname } from '@/navigation';

const ProfileNav = ({
  translation: {
    myProfile,
    //  recentSearches, favorites
  },
}: {
  translation: {
    myProfile: string;
    // recentSearches: string;
    // favorites: string;
  };
}) => {
  const links = [
    { href: '/profile', title: myProfile, name: 'profile' },
    // { href: '/profile/recentSearches', title: recentSearches, name: 'recentSearches' },
    // { href: '/profile/favorites', title: favorites, name: 'favorites' },
  ];

  const pathName = usePathname().split('/').pop();

  return (
    <div className={styles.linksContainer}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(styles.link, pathName === link.name && styles.activeLink)}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default ProfileNav;
