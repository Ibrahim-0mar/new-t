import { cn } from "@/utils/helper/tailwind_cn";

export default function Tooltip({
  tooltipBody,
  children,
  className,
  parentClassName,
}: {
  tooltipBody: React.ReactNode | string;
  children: React.ReactNode;
  className?: string;
  parentClassName?: string;
}) {
  return (
    <div className={cn(parentClassName, 'group relative flex h-fit')}>
      {children}
      <span
        className={cn(
          'absolute  top-6 z-[99] scale-0 rounded  bg-secondary shadow-xl border-[1px] border-eleventh  p-3 text-xs text-primary transition-all group-hover:scale-100',
          className,
        )}
      >
        {tooltipBody}
      </span>
    </div>
  );
}
