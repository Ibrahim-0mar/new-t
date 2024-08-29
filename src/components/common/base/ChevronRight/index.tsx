import { cn } from '@/utils/helper/tailwind_cn';
import { ChevronRight as ChevronRightIcon, LucideProps } from 'lucide-react';

export default function ChevronRight({ className, ...props }: LucideProps) {
  return <ChevronRightIcon className={cn('rtl:rotate-180', className)} {...props} />;
}
