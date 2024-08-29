'use client';
import { Link, usePathname } from '@/navigation';
import { cn } from '@/utils/helper/tailwind_cn';
import { useTranslations } from 'next-intl';
import styles from './index.module.css';

const NavbarList = () => {
  const t = useTranslations();

  const pathname = usePathname();

  const navItems = [
    {
      name: t('f4Y_o_qrRxXHsasCcDCXX'),
      href: '/last-minute-flights',
      isEnabled: process.env.NEXT_PUBLIC_FLIGHTS_ENABLED === 'true',
    },
    {
      name: t('6KtvWy7kx6ur7fmcMZboX'),
      href: '/airport-transfers',
      isEnabled: process.env.NEXT_PUBLIC_TRANSFERS_ENABLED === 'true',
    },
    {
      name: t('NJ-1JLVLFxFl29jtY5L6X'),
      href: '/last-minute-hotels-deals',
      isEnabled: process.env.NEXT_PUBLIC_HOTELS_ENABLED === 'true',
    },
    {
      name: t('Tx8qeKeCJyQiIFJKAThX8'),
      href: '/luxury-car-rental',
      isEnabled: process.env.NEXT_PUBLIC_CAR_RENTAL_ENABLED === 'true',
    },
    {
      name: t('kzkj65NkxyTQLa0O46E2A'),
      href: '/evisa',
      isEnabled: process.env.NEXT_PUBLIC_EVISA_ENABLED === 'true',
    },
  ];

  return (
    <div className={styles.navItems}>
      {navItems.map((item) =>
        item.isEnabled ? (
          <div
            key={item.href}
            className={cn(styles.item, pathname.includes(item.href) && styles.activeItem)}
          >
            <Link href={item.href}>{item.name}</Link>
          </div>
        ) : null,
      )}
    </div>
  );
};
export default NavbarList;
