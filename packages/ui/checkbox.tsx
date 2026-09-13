import * as React from 'react';

import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root> {
  label?: React.ReactNode;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const inputId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex items-start space-x-2">
        <BaseCheckbox.Root
          ref={ref}
          id={inputId}
          className={cn(
            'border-input bg-background focus-visible:ring-ring data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...props}
        >
          <BaseCheckbox.Indicator className="flex items-center justify-center text-current">
            <Check className="h-3.5 w-3.5 stroke-3" />
          </BaseCheckbox.Indicator>
        </BaseCheckbox.Root>
        {(label || description) && (
          <div className="grid gap-1.5 leading-none">
            {label && (
              <label
                htmlFor={inputId}
                className="text-foreground cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            )}
            {description && <p className="text-muted-foreground text-xs">{description}</p>}
          </div>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
