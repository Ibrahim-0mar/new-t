import Container from '@/components/common/base/Container';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import Image from 'next/image';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

const OurVision = () => {
  const t = useTranslations();

  const ourVision = {
    heading: t('CIE6JQQu-wfYeYQycDc6E'),
    content: [
      {
        title: t('l0xM4WhhI0wXldPb5_UAj'),
        content: t('ucB7XRPOxFHH2i84Dsg_L'),
      },
      {
        title: t('ldTmi6MzCO6zI3npXj-Bx'),
        content: t('nHHtNvjGfitdRmLXXM4PA'),
      },
      {
        title: t('JKeeNsLosuNkO2REGZ7Ik'),
        content: t('TYOdVUPzavZdRr-7V3fuU'),
      },
    ],
  };

  const imagesURLs = ['Get-best-deals.svg', 'Customer-support.svg', 'Trusted.svg'];

  const Item = ({ title, content, imgUrl }: { title: string; content: string; imgUrl: string }) => {
    return (
      <div className={styles.itemContainer}>
        <Image
          src={commonImgUrl(imgUrl)}
          alt={title}
          width={100}
          height={0}
          loading="lazy"
          layout="intrinsic"
        />
        <div className={styles.contentContainer}>
          <h3 className={styles.itemTitle}>{title}</h3>
          <p>{content}</p>
        </div>
      </div>
    );
  };

  return (
    <Container>
      <div className={styles.sectionContainer}>
        <h2 className={styles.heading}>{ourVision.heading}</h2>
        {ourVision.content.map((item, index) => (
          <Item key={index} title={item.title} imgUrl={imagesURLs[index]} content={item.content} />
        ))}
      </div>
    </Container>
  );
};

export default OurVision;
