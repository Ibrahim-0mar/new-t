import { Link } from '@/navigation';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import { cn } from '@/utils/helper/tailwind_cn';
import { ChevronUp } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Accordion from '../../base/Accordion';
import Container from '../../base/Container';
import CompanySection from './components/CompanySection';
import ContactSection from './components/ContactSection';
import ExploreSection from './components/ExploreSection';
import RegionAndCurrency from './components/RegionAndCurrency';
import { Social } from './components/SocialData';
import styles from './index.module.css';

const Footer = async () => {
  const t = await getTranslations();

  return (
    <footer className={styles.footerRoot}>
      <Container>
        <div className={styles.footerMainSectios}>
          <div>
            <div className={styles.descktopSections}>
              <h4>{t('hzYRLNADgZgahCtiDqnEU')}</h4>
              <CompanySection />
            </div>
            <div className={styles.mobileSections}>
              <Accordion
                icon={<ChevronUp className={styles.accordionIcon} size={18} />}
                customTitle={<h4>{t('hzYRLNADgZgahCtiDqnEU')}</h4>}
              >
                <CompanySection />
              </Accordion>
            </div>
          </div>
          <div>
            <div className={styles.descktopSections}>
              <h4>{t('1P7kKNGryD49nDnAtiKnM')}</h4>
              <ExploreSection />
            </div>
            <div className={styles.mobileSections}>
              <Accordion
                icon={<ChevronUp className={styles.accordionIcon} size={18} />}
                customTitle={<h4>{t('1P7kKNGryD49nDnAtiKnM')}</h4>}
              >
                <ExploreSection />
              </Accordion>
            </div>
          </div>
          <div>
            <div className={styles.descktopSections}>
              <h4>{t('1AdQwfM6le4yMnfu4hzPl')}</h4>
              <ContactSection />
            </div>
            <div className={styles.mobileSections}>
              <Accordion
                icon={<ChevronUp className={styles.accordionIcon} size={18} />}
                customTitle={<h4>{t('1AdQwfM6le4yMnfu4hzPl')}</h4>}
              >
                <ContactSection />
              </Accordion>
            </div>
          </div>

          <RegionAndCurrency />
        </div>
        <div className={styles.privacySection}>
          <ul>
            <li>
              <Link href={`/`}>© 2024 Travolic</Link>
            </li>
            <li>
              <Link href={`/privacy-policy`}>{t('Q4IL12V6j4BtHn4HySqth')}</Link>
            </li>
            <li>
              <Link href={`/terms-and-conditions`}>{t('zlTqgcMFQXSJ4s45UBI1P')}</Link>
            </li>
          </ul>
        </div>
        <div className={styles.socialSection}>
          {Social.map((icon) => (
            <div key={icon.name} className={styles.socialIcons}>
              <a href={icon.path} target="_blank" className={styles.socialIconContainer}>
                <Image
                  className={cn(styles.socialIcon, icon.name === 'x' && 'h-3 w-3 lg:h-5 lg:w-5')}
                  src={commonImgUrl(`${icon.name}.svg`)}
                  alt={`${icon.name}`}
                  width={icon.name === 'x' ? 20 : 40}
                  height={0}
                  loading="lazy"
                />
              </a>
            </div>
          ))}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
