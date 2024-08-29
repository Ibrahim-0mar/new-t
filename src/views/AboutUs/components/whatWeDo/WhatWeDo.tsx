import Container from '@/components/common/base/Container';
import Section from '@/components/common/custom/detailsSection';
import { useTranslations } from 'next-intl';

const WhatWeDo = () => {
  const t = useTranslations();

  const imagesURLs = ['what-we-do.svg', 'Our-vision.svg'];
  const whatWeDo = [
    {
      title: "",
      content: t.rich('J14DgdhoWKBa3I1i4kwr2', {
        br: () => <br />,
      }),
    },
    {
      title: t('CIE6JQQu-wfYeYQycDc6E'),
      content: t.rich('ex_r1cC1y7DrjsLvZbfZv', {
        br: () => <br />,
      }),
    },
  ];
  return (
    <Container>
      <h1 className='header text-center'>{t('iOHulH36Lqb9DaeTwUHU7')}</h1>
      {whatWeDo.map((section, index) => (
        <Section
          key={index}
          title={section.title}
          imgUrl={imagesURLs[index]}
          content={section.content}
          isReversed={index % 2 !== 0}
          className="px-6"
          titleClassName="text-center text-2xl md:text-3xl md:text-left rtl:md:text-right"
        />
      ))}
    </Container>
  );
};

export default WhatWeDo;
