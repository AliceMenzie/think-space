'use client';

import { cn } from '@nx-next-shadcn-ui-starter/ui-kit/util';

interface letterBadgeProps {
  letter: string;
  className?: string;
}

export function LetterBadge({ letter, className }: letterBadgeProps) {
  return (
    <p
      className={cn(
        'sm:h-14 sm:w-12 h-8 w-8 text-xs sm:text-base md:text-lg md:text-bold font flex place-content-center place-items-center self-center border-2 rounded-md sm:p-4 mt-4 mb-4',
        className
      )}
    >
      {letter}
    </p>
  );
}
