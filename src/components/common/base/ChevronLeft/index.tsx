import { cn } from '@/utils/helper/tailwind_cn';
import { ChevronLeft as ChevronLeftIcon, LucideProps } from 'lucide-react';

export default function ChevronLeft({ className, ...props }: LucideProps) {
  return <ChevronLeftIcon className={cn('rtl:rotate-180', className)} {...props} />;
}
