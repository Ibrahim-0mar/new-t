import Container from '@/components/common/base/Container';
import AccordionComponent from '@/components/common/custom/AccordionSSR/AccordionComponent';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import Image from 'next/image';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

const FAQ = () => {
  const t = useTranslations();
  const totalContent = [
    {
      name: t('Y3eDITMsbF2gErMTo9sDC'),
      contentArray: [
        {
          title: t('lLWdmqzAJBzxaeKK2SRas'),
          content: t.rich('U7xyIrw0h0nv9Hfi95u7E', {
            br: () => <br />,
          }),
        },
        {
          title: t('rqsDhcbvZGly27PifljG7'),
          content: t.rich('-syRp_yAYWExIOckyKpUZ', {
            br: () => <br />,
          }),
        },
        {
          title: t('qga7gIQS1fF1xese2FcyB'),
          content: t.rich('yYIy37KxPtx0kZKVtCM-f', {
            br: () => <br />,
          }),
        },
        {
          title: t('9VWKj00BLOKD9YZzcEvNH'),
          content: t.rich('LXOtDHMoZXKncRgWleT_p', {
            br: () => <br />,
          }),
        },
        {
          title: t('TJVrP-AByqMVsoXKvF7si'),
          content: t.rich('ATuozDBBjU35SJR2sVRGh', {
            br: () => <br />,
          }),
        },
        {
          title: t('uoUl_l521WWA5u3y0qkv9'),
          content: t.rich('BRdfkvSmbnbspA6W7dzQ7', {
            br: () => <br />,
          }),
        },
      ],
    },
    {
      name: t('f4Y_o_qrRxXHsasCcDCXX'),
      contentArray: [
        {
          title: t('ioFH-fMjMooOw0MU27LYS'),
          content: t.rich('p7JnTjTKyWRTTw2l2KTqM', {
            br: () => <br />,
          }),
        },
        {
          title: t.rich('KsGC2m_0x2_LeGP0T8Kyd', {
            br: () => <br />,
          }),
          content: t.rich('NyCB4FDlBFTtCIytHPfNQ', {
            br: () => <br />,
          }),
        },
        {
          title: t('-oqu0E3EbVtbH-CHKRcwF'),
          content: t.rich('Gvhicx-UyNikWu4ZaLr0y', {
            br: () => <br />,
          }),
        },
        {
          title: t('f_JyoN6Ozfeya3KrDfbnP'),
          content: t.rich('jbktWwx10zDgW-O9eUQOh', {
            br: () => <br />,
          }),
        },
        {
          title: t('7S0uFiSC9hvg8YazwId2L'),
          content: t.rich('yG0w5HlS07n9bZLD-erlw', {
            br: () => <br />,
          }),
        },
        {
          title: t('P3qjEX9_p-ceeBq5kdHqH'),
          content: t.rich('Pd9N9di2NcnGFVlqLL79l', {
            br: () => <br />,
          }),
        },
        {
          title: t('VQgfSfZclJ-4_OZ39aJ_V'),
          content: t.rich('YVW9TNse3CXKiCj8T2jxw', {
            br: () => <br />,
          }),
        },
        {
          title: t('5vAY8npJcVpdQ_m77E3Ql'),
          content: t.rich('W6dRfylczOz47BrB6rG_D', {
            br: () => <br />,
          }),
        },
        {
          title: t('rxO938aukZowYVpv8B1Ve'),
          content: t.rich('upuaAM0HABBN5OUO6GQwB', {
            br: () => <br />,
          }),
        },
        {
          title: t.rich('jTz-qBeQTtrSahYPzQcq3', {
            br: () => <br />,
          }),
          content: t.rich('PGS75nDevdidap0wi6z-N', {
            br: () => <br />,
          }),
        },
        {
          title: t('UzO-k2ilxCi8meuEnZ1l9'),
          content: t.rich('_wIzT7lsDJ9p0zIebA_ui', {
            br: () => <br />,
          }),
        },
        {
          title: t('BFmuUYtrddVQfn8xpn6wQ'),
          content: t.rich('R8kPk7ppwM0mDblP2De_q', {
            br: () => <br />,
          }),
        },
        {
          title: t('o7qBFEfTQvavW_jARFrbd'),
          content: t.rich('OQJZDQdsUczCb9FQ6zFfx', {
            br: () => <br />,
          }),
        },
        {
          title: t('p3vXIiEhNjTdoNepFwv4n'),
          content: t.rich('qf3ivEsGaJqClyU_IXIXO', {
            br: () => <br />,
          }),
        },
      ],
    },
    {
      name: t('W_BBkYOynT-37pGwheTyb'),
      contentArray: [
        {
          title: t('I7y3JtjcHoPt1zJAUXZrS'),
          content: t.rich('dgTO3uMAOZYGBbVJ6-Uy8', {
            br: () => <br />,
          }),
        },
        {
          title: t.rich('96INRy-qiMKK7Pfutc1Ye', {
            br: () => <br />,
          }),
          content: t.rich('dZpnAt8fn7v5VoMhnBK2j', {
            br: () => <br />,
          }),
        },
        {
          title: t('XGshiMoXjLZe7l1cMx-QD'),
          content: t.rich('4RBovscQW8MFeQs031K9z', {
            br: () => <br />,
          }),
        },
        {
          title: t('M8bIt5sIbTl9zGS6Foelk'),
          content: t.rich('cINcgO-qAt2kNDLWKrzM9', {
            br: () => <br />,
          }),
        },
        {
          title: t('DLpmDbfwZPGxYtjbBVnki'),
          content: t.rich('G7_UR5wZ_h7M3_tYZz6__', {
            br: () => <br />,
          }),
        },
        {
          title: t('T2laqGzzTK5o12a79_wME'),
          content: t.rich('CiCRzZfgENm_jkHdsBSs7', {
            br: () => <br />,
          }),
        },
        {
          title: t('BYB2SpRr2c-_pEec0SU7z'),
          content: t.rich('LHy1n9GGC9dXYuo_NXhCB', {
            br: () => <br />,
          }),
        },
      ],
    },
  ];

  return (
    <Container>
      <div className={styles.container}>
        <Image
          src={commonImgUrl('faq.svg')}
          alt={t('F43cFmMCwLGJEVHZloNk6')}
          width={700}
          height={0}
          priority
          layout="intrinsic"
        />
        <h1 className='header mt-4 text-center'>{t('mjjqDmu8V7O2yHNkmmoXQ')}</h1>
        <div className={styles.faqsTopics}>
          {totalContent.map((topic: any) => (
            <div key={topic.name} className={styles.topicContainer}>
              {topic.name === 'FAQ' ? null : <h2 className={styles.heading}>{topic.name}</h2>}
              <AccordionComponent accordionArray={topic.contentArray} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FAQ;
