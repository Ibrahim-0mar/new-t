import AccordionComponent from '@/components/common/custom/AccordionSSR/AccordionComponent';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

const EvisaFaqsSection = () => {
  const t = useTranslations();

  const heading = t('Y3eDITMsbF2gErMTo9sDC');
  const faqsArray = [
    {
      title: t('GuVhQxuJnDVKRER6Muekk'),
      content: t('gHZkN8RmXmXHyyOha5I0G'),
    },
    {
      title: t('VZ1h5rhhPDyhNeBITDiGv'),
      content: t('1mm7XNxrqLxcLbGN2KpwS'),
    },
    {
      title: t('6MlauZ92HUg4tWIwRA2B_'),
      content: t('r-sD_uCF9ZLquW5gFjKI0'),
    },
    {
      title: t('uawK8Vp10MmxZMGvcfwlU'),
      content: t('ZepZqpkJJwnEGo56KP1gZ'),
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{heading}</h2>
      <AccordionComponent accordionArray={faqsArray} />
    </div>
  );
};

export default EvisaFaqsSection;
