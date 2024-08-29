'use client';
import { useState } from 'react';
import Button from '../Button';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/utils/helper/tailwind_cn';
import { useTranslations } from 'next-intl';

interface AccordionProps {
  title?: string;
  customTitle?: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  disabled?: boolean;
}
const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  isOpen = true,
  disabled = false,
  customTitle,
  icon,
}) => {
  const t = useTranslations();

  const [expanded, setExpanded] = useState<boolean>(!isOpen);

  return (
    <div className={cn('w-full')}>
      <Button
        onClick={() => setExpanded((prevState) => !disabled && !prevState)}
        aria-label={`${t('6xVLpe8arX1fWBKXV2DRK')} ${title}`}
        variant="default"
        className={cn('flex w-full items-center justify-between')}
      >
        {customTitle ? (
          <>{customTitle}</>
        ) : (
          <span className={cn('tex-lg font-medium text-secondary')}>{title}</span>
        )}

        <span className={cn('transition-all duration-200 ease-in-out', expanded && 'rotate-180')}>
          {icon ? <>{icon}</> : <ChevronUp />}
        </span>
      </Button>
      <div
        className={cn('pl-4 pr-4', expanded && 'hidden transition-all duration-200 ease-in-out')}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
