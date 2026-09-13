import React, { memo } from 'react';

import { cn } from '@/lib/utils';

export interface ErrorFormProps extends React.HTMLAttributes<HTMLParagraphElement> {
  error?: string | null;
}

const ErrorForm: React.FC<ErrorFormProps> = ({ error, className, ...props }) => {
  if (!error) return null;

  return (
    <p className={cn('text-destructive mt-1 text-xs font-medium', className)} {...props}>
      {error}
    </p>
  );
};

export { ErrorForm };
export default memo(ErrorForm);
