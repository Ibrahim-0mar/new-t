import { cn } from '@/utils/helper/tailwind_cn';
import { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'checkbox', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'border-primary   cursor-pointer  text-red-400 shadow peer-red-300 h-4 w-4 shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sixth disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
