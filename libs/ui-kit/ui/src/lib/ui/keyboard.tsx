'use client';

import * as React from 'react';
import { cn } from '@nx-next-shadcn-ui-starter/ui-kit/util';

const Keyboard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="flex flex-col gap-5 place-content-center max-w-[800px] self-center"
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
    className="flex flex-row gap-1  sm:gap-3 self-center px-12 mx-8"
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
