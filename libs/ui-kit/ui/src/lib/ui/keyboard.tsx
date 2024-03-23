'use client';

import * as React from 'react';
import { cn } from '@nx-next-shadcn-ui-starter/ui-kit/util';

const Keyboard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className=" flex justify-center self-center flex-col  min-w-full gap-3"
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
    className="flex gap-1"
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
