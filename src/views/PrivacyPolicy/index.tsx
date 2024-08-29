import Container from '@/components/common/base/Container';
import AccordionComponent from '@/components/common/custom/AccordionSSR/AccordionComponent';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './index.module.css';

const PrivacyPolicy = () => {
  const t = useTranslations();

  const topics = [
    {
      contentArray: [
        {
          title: t('aHOmB80msrFI4wIys_gLL'),
          content: t.rich('3alE5UEx7_N4ZW7cSR5An', { br: () => <br /> }),
        },
        {
          title: t('IG7M9HUoOZCFYh7-Vy7n_'),
          content: t('nI8757YYE31vwJhgUTRH9'),
        },
        {
          title: t('Y8JkdyXNrQQhtASN6AnoZ'),
          content: t('VcOdXgNfmTGfqCzTfUNuw'),
        },
        {
          title: t('XzEUZlxCUu4dxCTjsxIx2'),
          content: t('V4dJ6d9Inxc2IxMi4uLZf'),
        },
        {
          title: t('0fwQxDZDoKHgOcdJdGfQu'),
          content: t.rich('elk9fYZPPvK2a63lI5_Ih', { br: () => <br /> }),
        },
        {
          title: t('rjPu4NSGRg2t0UkdRc6TU'),
          content: t.rich('57O4MfKpW3r0PsQY82rJz', { br: () => <br /> }),
        },
        {
          title: t('2K1OZxIe1BYALpE95vdWI'),
          content: t.rich('ezRvBa7glnQ0zN0myU7pl', { br: () => <br /> }),
        },
        {
          title: t('FmfFKKD3umHgZ1SMs5jvq'),
          content: t('1v-eZLg_xrB0_vkoreke9'),
        },

        {
          title: t('Qci72ajO6ppexYtoMEMUr'),
          content: t('imacFyDfCcmgoW0uFOJn1'),
        },

        {
          title: t('V8lQWWD1Sx8vIAqNLQUeG'),
          content: t('TnZ5slpxh-BfONL40KaTp'),
        },
        {
          title: t('0aXAUNQXUFA171_wbFLPP'),
          content: t('ZpyCavNc6dVkyaWaXaagf'),
        },
        {
          title: t('zmMA2JGT50kU-5pgoYlZm'),
          content: t('59X0g4xnct69tZ1eAb3x-'),
        },
        {
          title: t('VQIs1NjuOO2d5asGFpQDn'),
          content: t.rich('boDbDHT0hjkqMQnsLWA9i', { br: () => <br /> }),
        },
        {
          title: t('VRKUkqUe-VVGtiVXLipYF'),
          content: t.rich('jAC_IdM0Tw4Thf9wddHQd', { br: () => <br /> }),
        },
        {
          title: t('oHGqpliujASnBA82IFFFa'),
          content: t.rich('-95CnpulH5VDLjvErEcAk', { br: () => <br /> }),
        },
      ],
    },
    {
      name: t('ZJNQo0jhVK0cb0imURSmj'),
      contentArray: [
        {
          title: t('JFIatj6DeTVsSBGCVvHRf'),
          content: t('J8uLV6pvlBk536iHalxhD'),
        },
        {
          title: t('17QQ85TcNXJrP1fia9U0m'),
          content: t('fdd25iykbER8z2N-DL6sd'),
        },
        {
          title: t('WA9-_odmxHcd1z2c2QasG'),
          content: t('LCQA3F5v-GZNn2580TnT7'),
        },
        {
          title: t('3mDIFpAZXy7yvXj8NjvoH'),
          content: t('nMbXSpReNunD9jKOKbQRn'),
        },
      ],
    },
    {
      name: t('mMOzi-zLk2Elqa-W2XE1z'),
      contentArray: [
        {
          title: t('UUP8MJ8bOMZp-Lnyo_R5o'),
          content: t('Zm_6nRzbvPf_6hRCJSob1'),
        },
        {
          title: t('jdaDDRCYscVt2DBHKr2OG'),
          content: t('YovCBAZm20gtHBUftTca8'),
        },
        {
          title: t('cPo0gIdXYc4iFUs8m-LGL'),
          content: t('W2ZdBA9StUy7fywPRG1a5'),
        },
      ],
    },
    {
      name: t('8ZLWPCjKrCc2-tqVrk3A5'),
      contentArray: [
        {
          title: t('hki5ZHb9yJb5wIwQlYLWK'),
          content: t('kCThUQtKwhY_NaEfulWvu'),
        },
        {
          title: t('j5SE9i61rl-JHR8x2ZeP9'),
          content: t('6w9F40Mxcug9S-zAfduTd'),
        },
        {
          title: t('2ST4p2YkTuK3AmmVe4Odh'),
          content: t('yTv1X8dcwrj6wguaCeLtJ'),
        },
        {
          title: t('aGzdbBmGQpfgh3-MSn3QQ'),
          content: t('Z3uhF9tz7XqItBnkArGUv'),
        },
        {
          title: t('Te_cDqd20kSdfD_YGr-G6'),
          content: t('CfbFq_VuX-vJ-cW6KPJsi'),
        },
        {
          title: t('8WftyCtt4OMIASfBDSyhY'),
          content: t('VvQ76PAEnF1Usz1RyDiGb'),
        },
        {
          title: t('GPUK4jrWX0rFwEeCjFC_e'),
          content: t('vXEN1lEiYlILiOd9PiWZj'),
        },
        {
          title: t('gbLC-MC6dwgfZzIQV7Jub'),
          content: t('swJk4dnmxnu0jGCokokWd'),
        },
        {
          title: t('Bkq37NpirDD6LEL1EO-6G'),
          content: t('sH-F_3PkA3btkLflZWyXc'),
        },
        {
          title: t('AsuqN7PcoZ0Dcu_GAuqWK'),
          content: t('jYTL3kf3e6j1W71L7WA8d'),
        },
      ],
    },
    {
      name: t('DEkyr-NPYXKixBgSGh6zC'),
      contentArray: [
        {
          title: t('_0jpZDQ_iIahI1Z5WAZN2'),
          content: t('q6eai1x14G1lPqZ66gQlB'),
        },
        {
          title: t('KLE1Cd7j6TZkQvWdcfN5B'),
          content: t('qF7dXGnSyvswTH3FTlQAZ'),
        },
        {
          title: t('_oXCui4EQm2EXhnUWB_CB'),
          content: t('9d8do2HY6l4CMuB7hAv77'),
        },
        {
          title: t('E5wXKwAceqr_XDjtQzxPH'),
          content: t('rBWH3lg-0PKLnSuQLe8-J'),
        },
        {
          title: t('uCNcvc1xXPgaGmFk5hOVV'),
          content: t('Jpi4gPJSfI6HsSDhUaflW'),
        },
        {
          title: t('HZE0vDm13cvglOi-nUI3Z'),
          content: t('dqHH9jeUYqv65aOLCrvZ-'),
        },
        {
          title: t('kz_ieLgptV0No_LVQh__E'),
          content: t('HZE0vDm13cvglOi-nUI3Z'),
        },
        {
          title: t('mpyntuYdXHRFlJ2m6MZHP'),
          content: t('ZNjX9xdSVAoPrN9bKYOJx'),
        },
      ],
    },
    {
      name: t('kvZPIVuWgYBxzdHcAwSow'),
      contentArray: [
        {
          title: t('nfmtucKDfaE0tY8DvNS9m'),
          content: t('kweuelzuYfTQfxM1ezNCf'),
        },
        {
          title: t('kSR0YJK0Qyg_dsslRFxLc'),
          content: t('E-jKQatgdCFocDLD4lXGO'),
        },

        {
          title: t('ZmIMbA_hhKt2ADcZHrF-s'),
          content: t('sCn1PHmI6ufm8ltdViV8S'),
        },
        {
          title: t('ZJRGH-0EaLDd_HqqkXHvg'),
          content: t('xuEkN3C_kHsSjBdMaW05U'),
        },
        {
          title: t('NpQZfQgEF95VqRjNEABgm'),
          content: t('9wyMu3VoaqogI8Sh6UIsu'),
        },
        {
          title: t('tZCialLbz08XoYVEZaBZ0'),
          content: t('hlw0JRPA2oPX8wu-cLlFL'),
        },
      ],
    },
  ];

  return (
    <Container>
      <div className={styles.header}>
        <div>
          <h1>{t('kOMPYBonYo3Y3VLeK7Jts')}</h1>
          <p>{t('pbAol5ZXYLrWW-FkVSNpR')}</p>
        </div>
        <Image
          src={commonImgUrl('privacy.svg')}
          alt={t('R8XrJJe5khl2NFLzvHVRV')}
          width={468}
          height={0}
          layout="intrinsic"
        />
      </div>
      <div className={styles.container}>
        {topics.map((topic, index) => (
          <div key={index}>
            <h2 className={styles.heading}>{topic.name}</h2>
            <AccordionComponent accordionArray={topic.contentArray} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default PrivacyPolicy;
