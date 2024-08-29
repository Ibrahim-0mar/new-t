import Container from '@/components/common/base/Container';
import AccordionComponent from '@/components/common/custom/AccordionSSR/AccordionComponent';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import Image from 'next/image';
import styles from './index.module.css';
import { getTranslations } from 'next-intl/server';

const TermsAndConditions = async () => {
  const t = await getTranslations();

  const content = [
    [
      {
        title: t('HTlGAytigdgilkBe9yk58'),
        content: t.rich('j7iTgDD57afHMv2W4ZMfO', { br: () => <br /> }),
      },
      {
        title: t('JWZWak_vYSkEWKqxZ3-ma'),
        content: t.rich('aOtzx0QOY536uVbnYzVHn', { br: () => <br /> }),
      },
      {
        title: t('Y0o1Yt35EmcbH0klMXb2Y'),
        content: t('KAQNcE_L4g0EbiuDiiJOk'),
      },
      {
        title: t('HGI-8HrVIB_2aCTLc53tJ'),
        content: t('C5teJRZSgGuNg4ogw2A2N'),
      },
      {
        title: t('PwdNzZW1CZc9e5CaItG20'),
        content: t('gVV1oFLsf4J43AYaYvM9V'),
      },
      {
        title: t('IEYOvPYAMEzBTjolexoNo'),
        content: t('AJtYQBHOIqsMx2cAWuXPb'),
      },
    ],
    [
      {
        title: t('4DcNoSMY96HqBbUxKQFU_'),
        content: t.rich('rEVSNbROhonrIk6jjSnMS', { br: () => <br /> }),
      },
      {
        title: t('KUA3kC1t4huk0WHapVkXb'),
        content: t.rich('tWwMwlpuZ_nU9Hi7rg6wH', { br: () => <br /> }),
      },
      {
        title: t('puZr79H_ZAm2RskF9mCu4'),
        content: t('pS2TqBGV9D-78aYYqeCAc'),
      },
      {
        title: t('VjFu73Uy63b0h4GPmnieH'),
        content: t.rich('sl9TeelkpbQxEz_pELjgx', { br: () => <br /> }),
      },
      {
        title: t('2esV3dNbiXVBzhgLwmGH2'),
        content: t('qY2cfzMcT1mZhZ5_gADYa'),
      },
      {
        title: t('OuQMyI8JdFCTZ9Ft49WHV'),
        content: t('IldzEuDtQ4FCSSzuHKGWP'),
      },
    ],
    [
      {
        title: t('8btImyVRUQbAohz7V6hse'),
        content: t('vP14fyWSgQ2uFXnDjuKGA'),
      },
      {
        title: t('kcdC5pPz_KeMgryClhY0j'),
        content: t('kjYkaDEPhgmEjMzyeo_H_'),
      },
      {
        title: t('_4FUhxULu0guDzv35ln_V'),
        content: t('6F6B9VVHhcr8ScSe5Encb'),
      },
      {
        title: t('UFgxP5sgQeiYjQssRkjq4'),
        content: t('AXjBgOkVuLZfAyMC4syWh'),
      },
      {
        title: t('xlU-v4IWO9OLaDntt5aJD'),
        content: t('6KAeOAFqWjLQGLtAhw-OX'),
      },
      {
        title: t('l9mtFiow4HZneaeBATQFI'),
        content: t('KI6Z28DDCyXU4w5UagTrI'),
      },
    ],
  ];

  return (
    <Container>
      <div className={styles.header}>
        <div className={styles.textContainer}>
          <h1>{t('zlTqgcMFQXSJ4s45UBI1P')}</h1>
          <p>{t('6KqGsJTc7nj7ARg0BAjOU')}</p>
        </div>
        <Image
          src={commonImgUrl('terms.svg')}
          alt={t('Jc2wLB0jlzEtWf2hbvwt8')}
          width={450}
          height={0}
          priority
          layout="intrinsic"
        />
      </div>
      <div className={styles.accordionsContainer}>
        {content.map((part, index) => (
          <AccordionComponent key={index} accordionArray={part} />
        ))}
      </div>
    </Container>
  );
};

export default TermsAndConditions;
