import Container from '@/components/common/base/Container';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import Image from 'next/image';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

const trvolicTeamImgs = ['stay-informed.svg', 'personal-development.svg', 'international-team.svg'];

const Career = () => {
  const t = useTranslations();

  const travolicTeamSection = [
    {
      title: t('gvcGgdCDZHyazG3dGH1aA'),
      description: t('ZtyBe2s5tCHz3wI0ntqC4'),
    },
    {
      title: t('eH_lnXHzoaXnWx0iE5UL_'),
      description: t('akzlENgMuzUmVAoQWsUou'),
    },
    {
      title: t('xTZS40i8PNfJ8YxlnxSLX'),
      description: t('hOm3Md8Nqt_ruUwuTLIUi'),
    },
  ];

  const Item = ({ title, content, imgUrl }: { title: string; content: string; imgUrl: string }) => {
    return (
      <div className={styles.itemContainer}>
        <Image src={imgUrl} alt={title} width={100} height={0} loading="lazy" layout="intrinsic" />
        <div className={styles.contentContainer}>
          <h3 className={styles.itemTitle}>{title}</h3>
          <p>{content}</p>
        </div>
      </div>
    );
  };
  return (
    <Container>
      {/* Header ===================================================== */}
      <div className={styles.header}>
        <h1>{t('K4KWwkZ5LFI3_1O8pkg2f')}</h1>
        <Image
          src={commonImgUrl('travolic-job-opportunities.svg')}
          alt={t('K4KWwkZ5LFI3_1O8pkg2f')}
          width={554}
          height={0}
        />
        <p>{t('aHOUENcOlUJfUVO6STBNh')}</p>
      </div>

      {/* Working at Travolic ======================================== */}
      <div>
        <h2 className={styles.workingAtTravolic}>{t('oTxUHjdC7TTVmCRi3DIp-')}</h2>
        <p className={styles.workingAtTravolic}>
          <Image
            src={commonImgUrl('working-at-travolic.svg')}
            alt={t('oTxUHjdC7TTVmCRi3DIp-')}
            width={250}
            height={0}
            loading="lazy"
            className={styles.workingAtTravolic}
          />
          {t.rich('auxUOC5bBtFVLQKFeY7Jv', {
            br: () => <br />,
          })}
        </p>
      </div>

      {/* Meet Travolic ============================================== */}
      <div className={styles.frameSection}>
        <h2 className={styles.heading}>{t('-dd4IC4_F6A0_zIekCAi-')}</h2>
        <div className={styles.videoContainer}>
          <iframe
            className={styles.iframe}
            title={t('0JFzRa3ml8cAcoQSw5MJ3')}
            src="https://www.youtube.com/embed/quZjABBVZ5o"
            width="100%"
            height={600}
            loading="lazy"
          />
        </div>
      </div>

      {/* Why Travolic =============================================== */}
      <div className={styles.travolicTeamContainer}>
        <h2>{t('djBJanVCaqp78JAYtAn0Z')}</h2>
        {travolicTeamSection.map((item, index) => (
          <Item
            key={index}
            title={item.title}
            content={item.description}
            imgUrl={commonImgUrl(trvolicTeamImgs[index])}
          />
        ))}
      </div>

      {/* Join our team =============================================== */}
      <div className={styles.joinOurTeamContainer}>
        <p>{t('jw39oNN5iCVr0sofw8f0V')}</p>
        <a href="mailto:hr@travolic.com?subject=Travolic%20Jobs">{t('nJBLSbpvRKzrBpYF79JJb')}</a>
      </div>
    </Container>
  );
};

export default Career;
