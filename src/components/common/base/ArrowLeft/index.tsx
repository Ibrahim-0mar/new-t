import { cn } from '@/utils/helper/tailwind_cn';
import { ArrowLeft as ArrowLeftIcon, LucideProps } from 'lucide-react';

export default function ArrowLeft({ className, ...props }: LucideProps) {
  return <ArrowLeftIcon className={cn('rtl:rotate-180', className)} {...props} />;
}
