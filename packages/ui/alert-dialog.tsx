import * as React from 'react';

import { Dialog as BaseDialog } from '@base-ui/react/dialog';

import { cn } from '@/lib/utils';

import { buttonVariants } from './button';
import { DialogBackdrop, DialogDescription, DialogFooter, DialogHeader, DialogPortal, DialogTitle } from './dialog';

export const AlertDialog = BaseDialog.Root;
export const AlertDialogTrigger = BaseDialog.Trigger;
export const AlertDialogPortal = DialogPortal;
export const AlertDialogBackdrop = DialogBackdrop;
export const AlertDialogHeader = DialogHeader;
export const AlertDialogFooter = DialogFooter;
export const AlertDialogTitle = DialogTitle;
export const AlertDialogDescription = DialogDescription;

export const AlertDialogPopup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Popup>
>(({ className, children, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogBackdrop />
    <BaseDialog.Popup
      ref={ref}
      role="alertdialog"
      className={cn(
        'bg-background data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed top-1/2 left-1/2 z-50 grid w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border p-6 shadow-2xl duration-200',
        className,
      )}
      {...props}
    >
      {children}
    </BaseDialog.Popup>
  </AlertDialogPortal>
));
AlertDialogPopup.displayName = 'AlertDialogPopup';

export const AlertDialogAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Close> & { variant?: 'default' | 'destructive' }
>(({ className, variant = 'default', ...props }, ref) => (
  <BaseDialog.Close ref={ref} className={cn(buttonVariants({ variant }), className)} {...props} />
));
AlertDialogAction.displayName = 'AlertDialogAction';

export const AlertDialogCancel = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Close>
>(({ className, ...props }, ref) => (
  <BaseDialog.Close ref={ref} className={cn(buttonVariants({ variant: 'outline' }), className)} {...props} />
));
AlertDialogCancel.displayName = 'AlertDialogCancel';
