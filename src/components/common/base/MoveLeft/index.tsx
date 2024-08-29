import { cn } from '@/utils/helper/tailwind_cn';
import { LucideProps, MoveLeft as MoveLeftIcon } from 'lucide-react';

export default function MoveLeft({ className, ...props }: LucideProps) {
  return <MoveLeftIcon className={cn('rtl:rotate-180', className)} {...props} />;
}
