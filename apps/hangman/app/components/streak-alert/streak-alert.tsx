'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@nx-next-shadcn-ui-starter/ui-kit/ui';
import { useHangmanContext } from '../../hooks/useHangmanContext';

function StreakAlert() {
  const { triggerAlert, handleTriggerAlert, isStreak, handleContinueAlert } =
    useHangmanContext();

  return (
    <AlertDialog
      open={triggerAlert.state}
      onOpenChange={handleTriggerAlert}
    >
      <AlertDialogTrigger></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            🔥 Continuing will delete your streak.
          </AlertDialogTitle>
          <AlertDialogDescription>
            Your current streak is{' '}
            <span className="font-bold">{isStreak} 🔥</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinueAlert}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default StreakAlert;
