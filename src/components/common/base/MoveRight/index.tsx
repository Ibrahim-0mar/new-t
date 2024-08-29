import { cn } from '@/utils/helper/tailwind_cn';
import { LucideProps, MoveRight as MoveRightIcon } from 'lucide-react';

export default function MoveRight({ className, ...props }: LucideProps) {
  return <MoveRightIcon className={cn('rtl:rotate-180', className)} {...props} />;
}
