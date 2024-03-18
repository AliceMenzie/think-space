import { Button, Typography } from '@nx-next-shadcn-ui-starter/ui-kit/ui';
import { useHangmanContext } from '../../hooks/useHangmanContext';

function CurrentGameBanner() {
  const {
    isStreak,
    isGuessed,
    hiddenWord,
    livesCount,
    selectedCategory,
    handleSelectedCategory,
    handleTriggerAlert,
  } = useHangmanContext();
  const lives = Array.from({ length: livesCount }, (_, index) => index + 1);

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-3">
        <Typography as="h1" variant={'heading'}>
          Hangman
        </Typography>

        <div className="min-w-[180px] flex  gap-3">
          {!isGuessed &&
            lives.map((count: number) => (
              <Typography as="p" variant={'body'} key={count}>
                ❤️
              </Typography>
            ))}
          {livesCount === 0 && (
            <Typography as="p" variant={'body'}>
              💀 💀 💀 💀 💀
            </Typography>
          )}
          {isGuessed && hiddenWord.length !== 0 && (
            <Typography as="p" variant={'body'}>
              🎉 🎉 🎉 🎉 🎉
            </Typography>
          )}
        </div>
        {isStreak && (
          <Typography as="p" variant={'body'}>
            {isStreak} 🔥
          </Typography>
        )}
      </div>
      <div className="flex flex-col flex-1 gap-3 place-items-end">
        {!isGuessed && selectedCategory && (
          <Button
            onClick={
              isStreak && livesCount !== 0
                ? handleTriggerAlert
                : () => handleSelectedCategory(selectedCategory, false)
            }
          >
            Restart
          </Button>
        )}
        {isGuessed && (
          <Button
            variant={'outline'}
            disabled={!isGuessed}
            onClick={() => handleSelectedCategory(null, true)}
          >
            New Game
          </Button>
        )}
      </div>
    </div>
  );
}
export default CurrentGameBanner;
