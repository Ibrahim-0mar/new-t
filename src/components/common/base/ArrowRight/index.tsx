import { cn } from '@/utils/helper/tailwind_cn';
import { ArrowRight as ArrowRightIcon, LucideProps } from 'lucide-react';

export default function ArrowRight({ className, ...props }: LucideProps) {
  return <ArrowRightIcon className={cn('rtl:rotate-180', className)} {...props} />;
}
