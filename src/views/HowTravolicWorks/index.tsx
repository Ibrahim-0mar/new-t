import Section from '@/components/common/custom/detailsSection';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

const HowTravolicWorks = () => {
  const t = useTranslations();

  const content = [
    {
      title: t('rvYKTV2VunoNZ6ZJX1Yfk'),
      content: t('5uTnUpnjd13vHDIffchOi'),
    },
    {
      title: t('P7EEc4EK2fToltk0GaiUj'),
      content: t.rich('IvRSjR1pHeG5sLUZ3Xji3', {
        br: () => <br />,
      }),
    },
    {
      title: t('5L-JL5iaSLYiKCgcbldmv'),
      content: t.rich('v4yTuuQtC_evkA0QkFKRT', {
        br: () => <br />,
      }),
    },
    {
      title: t('0LiyekseCBt9bRE6th4ik'),
      content: t.rich('yEder4xS1GY34HRghCbWS', {
        br: () => <br />,
      }),
    },
    {
      title: t('L5sJcO8rmRojA_cFCf2ba'),
      content: t.rich('w8w8nijWWUAhAqVELJ49S', {
        br: () => <br />,
      }),
    },
  ];

  const imagesURLs = [
    'how-does-it-work.svg',
    'How-to-use-service.svg',
    'options-listed.svg',
    'recommended-flights.svg',
    'gather-the-prices.svg',
  ];

  return (
    <div className={styles.sectionsContainer}>
      {content.map((item, index) => (
        <Section
          key={index}
          title={item.title}
          content={item.content}
          imgUrl={imagesURLs[index]}
          isReversed={index % 2 === 0}
          titleClassName="mt-4 lg:mt-16 text-center md:text-start text-2xl md:text-3xl"
        />
      ))}
    </div>
  );
};

export default HowTravolicWorks;
