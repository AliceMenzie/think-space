'use client';

import { cn } from '@nx-next-shadcn-ui-starter/ui-kit/util';

interface letterBadgeProps {
  letter: string;
  className?: string;
}

export function LetterBadge({ letter, className }: letterBadgeProps) {
  return (
    <p
      data-testid="letter-badge"
      className={cn(
        'h-10 w-[35px] rounded-md text-md md:h-14 md:w-12 md:text-lg md:text-bold flex place-content-center place-items-center self-center border-2 my-2',
        className
      )}
    >
      {letter}
    </p>
  );
}
