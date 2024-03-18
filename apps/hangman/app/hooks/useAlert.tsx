// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@nx-next-shadcn-ui-starter/ui-kit/ui';
// import { useState } from 'react';

// interface useAlertProps {

//   isStreak: number | null;
// }

// export function useAlert({ isStreak }: useAlertProps) {
//   const [isAlert, setAlert] = useState(false);

//   const handleAlert = () => {
//     setAlert(true);
//   };

//   const handleContinueAlert = () => {
//     handleSelectedCategory(triggerAlert.selection, false);
//   };

//   const renderAlert = () => {
//     return (
//       <AlertDialog
//         open={triggerAlert.state}
//         onOpenChange={() =>
//           setTriggerAlert({ state: !triggerAlert.state, selection: '' })
//         }
//       >
//         <AlertDialogTrigger></AlertDialogTrigger>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>
//               🔥 Continuing will delete your streak.
//             </AlertDialogTitle>
//             <AlertDialogDescription>
//               Your current streak is{' '}
//               <span className="font-bold">{isStreak} 🔥</span>
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleContinueAlert}>
//               Continue
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     );
//   };

//   return [isAlert, handleAlert, renderAlert] as const; // infers [boolean, typeof load] instead of (boolean | typeof load)[]
// }
