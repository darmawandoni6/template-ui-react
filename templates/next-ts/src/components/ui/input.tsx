import * as React from 'react';

import { EyeClosed, EyeIcon } from 'lucide-react';

import { cn } from '@lib/utils';

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { error?: boolean; isPassword?: boolean }
>(({ className, type, isPassword = false, error = false, ...props }, ref) => {
  const [view, setView] = React.useState(false);
  const [t_input, setT_input] = React.useState<React.ComponentProps<'input'>['type']>(type);

  React.useLayoutEffect(() => {
    if (isPassword) {
      setT_input(view ? 'text' : 'password');
    }
  }, [isPassword, view]);

  return (
    <div className="relative">
      <input
        type={t_input}
        className={cn(
          'border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          error && 'border-red-500 focus-visible:ring-red-500',
          isPassword && 'pe-10',
          className,
        )}
        ref={ref}
        {...props}
      />
      {isPassword && (
        <a
          className="absolute top-0 right-0 flex aspect-square h-full cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={() => setView(prev => !prev)}
        >
          {view ? <EyeIcon size={22} className="m-auto" /> : <EyeClosed size={22} className="m-auto" />}
        </a>
      )}
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
