import { cn } from '@/utils/helper/tailwind_cn';
import { LucideProps, PlaneLanding as PlaneLandingIcon } from 'lucide-react';

export default function PlaneLanding({ className, ...props }: LucideProps) {
  return <PlaneLandingIcon className={cn('rtl:-scale-x-100', className)} {...props} />;
}
