'use client';

import { Typography } from '@nx-next-shadcn-ui-starter/ui-kit/ui';
import { useHangmanContext } from '../../hooks/useHangmanContext';

const StartBanner = () => {
  const { hiddenWord } = useHangmanContext();
  return (
    <div className="flex self-center">
      {hiddenWord.length == 0 && (
        <Typography as="h3" variant={'subHeading'}>
          Select a category to begin!
        </Typography>
      )}
    </div>
  );
};
export default StartBanner;
