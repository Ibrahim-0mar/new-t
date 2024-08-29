import { cn } from '@/utils/helper/tailwind_cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  animate?: boolean;
}

function Skeleton({ className, animate, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-md bg-gray-200',
        animate && 'animate-pulse',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
