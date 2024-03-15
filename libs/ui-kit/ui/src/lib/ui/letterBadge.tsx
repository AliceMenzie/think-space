'use client';

import { cn } from '@nx-next-shadcn-ui-starter/ui-kit/util';

interface letterBadgeProps {
  letter: string;
  className?: string;
}

const LetterBadge = ({ letter, className }: letterBadgeProps) => {
  return (
    <p
      className={cn(
        'h-14 w-12 flex place-content-center border-2 rounded-md p-4 mt-4 mb-4',
        className
      )}
    >
      {letter}
    </p>
  );
};
export default LetterBadge;
