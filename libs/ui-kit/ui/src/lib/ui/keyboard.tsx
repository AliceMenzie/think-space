'use client';

import * as React from 'react';
import { cn } from '@nx-next-shadcn-ui-starter/ui-kit/util';

const Keyboard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col gap-5 place-content-center md:max-w-[800px] self-center',
      className
    )}
    {...props}
  />
));
Keyboard.displayName = 'Keyboard';

const KeyboardRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-row sm:gap-3 self-center gap-[2px]', className)}
    {...props}
  />
));

KeyboardRow.displayName = 'KeyboardRow';

const Key = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));
Key.displayName = 'Key';

export { Keyboard, KeyboardRow, Key };
