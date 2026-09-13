import React, { memo } from 'react';

import { cn } from '@/lib/utils';

export interface ErrorFormProps extends React.HTMLAttributes<HTMLParagraphElement> {
  error?: string | null;
}

const ErrorForm: React.FC<ErrorFormProps> = ({ error, className, ...props }) => {
  if (!error) return null;

  return (
    <p className={cn('text-xs font-medium text-destructive mt-1', className)} {...props}>
      {error}
    </p>
  );
};

export default memo(ErrorForm);
