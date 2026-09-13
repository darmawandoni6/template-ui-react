import * as React from 'react';

import { ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';

export const Breadcrumb = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'nav'>>(({ ...props }, ref) => (
  <nav ref={ref} aria-label="breadcrumb" {...props} />
));
Breadcrumb.displayName = 'Breadcrumb';

export const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<'ol'>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        'text-muted-foreground m-0 flex list-none flex-wrap items-center gap-1.5 p-0 text-sm wrap-break-word sm:gap-2.5',
        className,
      )}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = 'BreadcrumbList';

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
  ),
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  render?: React.ReactElement;
  asChild?: boolean;
}

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, render, asChild, children, ...props }, ref) => {
    const classes = cn('transition-colors hover:text-foreground cursor-pointer', className);

    if (render && React.isValidElement(render)) {
      return React.cloneElement(render, {
        ref,
        className: cn(classes, (render.props as { className?: string }).className),
        children: children ?? (render.props as { children?: React.ReactNode }).children,
        ...props,
      } as React.HTMLAttributes<HTMLElement>);
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref,
        className: cn(classes, (children.props as { className?: string }).className),
        ...props,
      } as React.HTMLAttributes<HTMLElement>);
    }

    return (
      <a ref={ref} className={classes} {...props}>
        {children}
      </a>
    );
  },
);
BreadcrumbLink.displayName = 'BreadcrumbLink';

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('text-foreground font-normal', className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

export const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<'li'>) => (
  <li role="presentation" aria-hidden="true" className={cn('[&>svg]:h-3.5 [&>svg]:w-3.5', className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';
