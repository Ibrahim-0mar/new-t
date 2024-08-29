import { cn } from '@/utils/helper/tailwind_cn';
import { LucideProps, PlaneTakeoff as PlaneTakeoffIcon } from 'lucide-react';

export default function PlaneTakeoff({ className, ...props }: LucideProps) {
  return <PlaneTakeoffIcon className={cn('rtl:-scale-x-100', className)} {...props} />;
}
