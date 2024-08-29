'use client';
import { cn } from '@/utils/helper/tailwind_cn';
import styles from './index.module.css';
import { useState } from 'react';
import Button from '@/components/common/base/Button';
import { useTranslations } from 'next-intl';

const SitemapSectionWrappr = ({
  children,
  isCitiesdata,
}: {
  children: [React.ReactNode, React.ReactNode, React.ReactNode, React.ReactNode];
  isCitiesdata: boolean;
}) => {
  const t = useTranslations();

  const types = [
    { id: 'routesTo', name: t('9c1MGsIv2u7FJAP51Rhgt') },
    { id: 'routesFrom', name: t('86coLwWU0n7kTLUQkk4PZ') },
  ];
  if (isCitiesdata) {
    types.unshift(
      { id: 'flightsTo', name: t('1-bFY5q_h5p94rbVzt5kW') },
      { id: 'flightsFrom', name: t('Sw1uYm2-t1OcVJMRChpni') },
    );
  }

  const [currentType, setCurrentType] = useState(types[0].id);

  const renderChildren = () => {
    switch (currentType) {
      case 'flightsTo':
        return children[0];
      case 'flightsFrom':
        return children[1];
      case 'routesTo':
        return children[2];
      case 'routesFrom':
        return children[3];
      default:
        return children[0];
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {types.map((type, index) => (
          <Button
            className={styles.btn}
            key={index}
            onClick={() => {
              setCurrentType(type.id);
            }}
            variant="default"
          >
            <span className={cn(styles.link, currentType === type.id && styles.activeLink)}>
              {type.name}
            </span>
          </Button>
        ))}
      </div>
      <div>{renderChildren()}</div>
    </div>
  );
};

export default SitemapSectionWrappr;
