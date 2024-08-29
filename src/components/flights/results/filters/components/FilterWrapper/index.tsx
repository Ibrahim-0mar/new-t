'use client';
import style from './index.module.css';
import Button from '@/components/common/base/Button';
import { cn } from '@/utils/helper/tailwind_cn';
import { ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface FilterWrapperProps {
  children: React.ReactNode;
  title: string;
}

const FilterWrapper = ({ children, title }: FilterWrapperProps) => {
  const t = useTranslations();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <div className={style.container}>
      <Button
        onClick={() => setCollapsed((prevState) => !prevState)}
        aria-label={t('Der2S_0kk3FxTpadVSuT9', { title })}
        variant="default"
      >
        <p>{title}</p>
        <ChevronUp
          className={cn('transition-all duration-200 ease-in-out', collapsed && 'rotate-180')}
        />
      </Button>
      <div className={cn(collapsed && style.childrenIsCollapsed)}>{children}</div>
    </div>
  );
};

export default FilterWrapper;
